'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { ArrowDown, ArrowUp, Save } from 'lucide-react'
import { createBrowserSupabaseClient } from '@/lib/supabase-browser'

type ContentType = 'articles' | 'videos'

type OrganizerItem = {
  id: string
  title: string
  slug: string
  status: 'draft' | 'published'
  date: string
  display_order: number | null
}

const sections: {
  type: ContentType
  title: string
  description: string
  publicPath: string
}[] = [
  {
    type: 'articles',
    title: 'Articole',
    description: 'Ordinea aceasta controlează articolele de pe acasă, arhivă și zonele recente.',
    publicPath: '/articole',
  },
  {
    type: 'videos',
    title: 'Video',
    description: 'Ordinea aceasta controlează lista video și videoclipurile recente.',
    publicPath: '/video',
  },
]

function moveItem(items: OrganizerItem[], index: number, direction: -1 | 1) {
  const nextIndex = index + direction
  if (nextIndex < 0 || nextIndex >= items.length) return items

  const next = [...items]
  const current = next[index]
  next[index] = next[nextIndex]
  next[nextIndex] = current
  return next
}

function sortItems(items: OrganizerItem[]) {
  return [...items].sort((a, b) => {
    const aOrder = a.display_order ?? Number.MAX_SAFE_INTEGER
    const bOrder = b.display_order ?? Number.MAX_SAFE_INTEGER
    if (aOrder !== bOrder) return aOrder - bOrder
    return a.date < b.date ? 1 : -1
  })
}

export function ContentOrganizer() {
  const supabase = useMemo(() => createBrowserSupabaseClient(), [])
  const [articles, setArticles] = useState<OrganizerItem[]>([])
  const [videos, setVideos] = useState<OrganizerItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<ContentType | null>(null)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadContent() {
      const { data: userData } = await supabase.auth.getUser()

      if (!userData.user) {
        setError('Trebuie să fii autentificat.')
        setLoading(false)
        return
      }

      const { data: adminStatus } = await supabase.rpc('is_admin')
      if (!adminStatus) {
        setError('Contul nu are drepturi de admin.')
        setLoading(false)
        return
      }

      const [articlesResult, videosResult] = await Promise.all([
        supabase
          .from('articles')
          .select('id, title, slug, status, published_at, display_order')
          .order('display_order', { ascending: true, nullsFirst: false })
          .order('published_at', { ascending: false }),
        supabase
          .from('videos')
          .select('id, title, slug, status, published_at, display_order')
          .order('display_order', { ascending: true, nullsFirst: false })
          .order('published_at', { ascending: false }),
      ])

      if (articlesResult.error || videosResult.error) {
        setError(
          'Nu pot încărca organizatorul. Rulează SQL-ul pentru display_order în Supabase și reîncarcă pagina.',
        )
        setLoading(false)
        return
      }

      setArticles(sortItems((articlesResult.data ?? []).map((item) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        status: item.status,
        date: item.published_at,
        display_order: item.display_order,
      }))))
      setVideos(sortItems((videosResult.data ?? []).map((item) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        status: item.status,
        date: item.published_at,
        display_order: item.display_order,
      }))))
      setLoading(false)
    }

    loadContent()
  }, [supabase])

  function getItems(type: ContentType) {
    return type === 'articles' ? articles : videos
  }

  function setItems(type: ContentType, items: OrganizerItem[]) {
    if (type === 'articles') {
      setArticles(items)
      return
    }

    setVideos(items)
  }

  function reorder(type: ContentType, index: number, direction: -1 | 1) {
    setMessage('')
    setError('')
    setItems(type, moveItem(getItems(type), index, direction))
  }

  async function saveOrder(type: ContentType) {
    setSaving(type)
    setMessage('')
    setError('')

    const items = getItems(type)
    const updates = items.map((item, index) => (
      supabase
        .from(type)
        .update({ display_order: index + 1 })
        .eq('id', item.id)
    ))

    const results = await Promise.all(updates)
    const failed = results.find((result) => result.error)

    if (failed?.error) {
      setError('Nu am putut salva ordinea. Verifică dacă ești admin și dacă ai rulat SQL-ul.')
      setSaving(null)
      return
    }

    setItems(type, items.map((item, index) => ({ ...item, display_order: index + 1 })))
    setMessage(`Ordinea pentru ${type === 'articles' ? 'articole' : 'video'} a fost salvată.`)
    setSaving(null)
  }

  if (loading) {
    return <main className="page-shell max-w-5xl">Se încarcă...</main>
  }

  return (
    <main className="page-shell max-w-5xl">
      <div className="flex flex-col gap-4 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="page-kicker">Admin</p>
          <h1 className="page-title mt-3 text-4xl">Organizator</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Schimbă ordinea în care apar materialele pe site. După ce muți elementele, apasă
            Salvare ordine pentru fiecare secțiune.
          </p>
        </div>
        <Link href="/admin" className="secondary-action">
          Înapoi la admin
        </Link>
      </div>

      {error ? <p className="mt-6 text-sm text-destructive">{error}</p> : null}
      {message ? <p className="mt-6 text-sm text-brand">{message}</p> : null}

      <div className="mt-8 grid gap-8">
        {sections.map((section) => (
          <OrganizerSection
            key={section.type}
            title={section.title}
            description={section.description}
            publicPath={section.publicPath}
            items={getItems(section.type)}
            saving={saving === section.type}
            onMove={(index, direction) => reorder(section.type, index, direction)}
            onSave={() => saveOrder(section.type)}
          />
        ))}
      </div>
    </main>
  )
}

function OrganizerSection({
  title,
  description,
  publicPath,
  items,
  saving,
  onMove,
  onSave,
}: {
  title: string
  description: string
  publicPath: string
  items: OrganizerItem[]
  saving: boolean
  onMove: (index: number, direction: -1 | 1) => void
  onSave: () => void
}) {
  return (
    <section className="surface-card p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="font-serif text-3xl font-semibold">{title}</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
        <button
          type="button"
          onClick={onSave}
          disabled={saving || items.length === 0}
          className="primary-action disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {saving ? 'Se salvează...' : 'Salvează ordine'}
        </button>
      </div>

      <div className="mt-6 divide-y divide-border">
        {items.length === 0 ? (
          <p className="py-6 text-sm text-muted-foreground">Nu există încă elemente aici.</p>
        ) : null}
        {items.map((item, index) => (
          <div
            key={item.id}
            className="grid gap-4 py-4 sm:grid-cols-[auto_1fr_auto] sm:items-center"
          >
            <div className="font-mono text-xs text-muted-foreground">
              {String(index + 1).padStart(2, '0')}
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {item.status} • {item.date}
              </p>
              <h3 className="mt-1 font-serif text-xl leading-tight">{item.title}</h3>
              <Link
                href={`${publicPath}/${item.slug}`}
                className="mt-1 inline-block font-mono text-xs text-muted-foreground hover:text-brand"
              >
                {publicPath}/{item.slug || 'fara-slug'}
              </Link>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onMove(index, -1)}
                disabled={index === 0}
                aria-label="Mută mai sus"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-brand hover:text-brand disabled:opacity-35"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onMove(index, 1)}
                disabled={index === items.length - 1}
                aria-label="Mută mai jos"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-brand hover:text-brand disabled:opacity-35"
              >
                <ArrowDown className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
