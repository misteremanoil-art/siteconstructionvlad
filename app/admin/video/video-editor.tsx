'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserSupabaseClient } from '@/lib/supabase-browser'
import type { DatabaseVideo } from '@/lib/supabase'

type FormState = {
  title: string
  slug: string
  description: string
  platform: 'YouTube' | 'Facebook' | 'TV'
  href: string
  embed_url: string
  thumbnail_url: string
  published_at: string
  duration: string
  context: string
  featured: boolean
  status: 'draft' | 'published'
}

const emptyForm: FormState = {
  title: '',
  slug: '',
  description: '',
  platform: 'YouTube',
  href: '',
  embed_url: '',
  thumbnail_url: '',
  published_at: new Date().toISOString().slice(0, 10),
  duration: '',
  context: 'Emisiune',
  featured: false,
  status: 'draft',
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function youtubeIdFromUrl(value: string) {
  try {
    const url = new URL(value)
    if (url.hostname.includes('youtu.be')) return url.pathname.replace('/', '')
    if (url.hostname.includes('youtube.com')) return url.searchParams.get('v') ?? ''
  } catch {
    return ''
  }

  return ''
}

function youtubeEmbedFromUrl(value: string) {
  const id = youtubeIdFromUrl(value)
  return id ? `https://www.youtube.com/embed/${id}` : ''
}

function youtubeThumbnailFromUrl(value: string) {
  const id = youtubeIdFromUrl(value)
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : ''
}

export function VideoEditor({ videoId }: { videoId?: string }) {
  const router = useRouter()
  const supabase = useMemo(() => createBrowserSupabaseClient(), [])
  const [form, setForm] = useState<FormState>(emptyForm)
  const [loading, setLoading] = useState(Boolean(videoId))
  const [saving, setSaving] = useState(false)
  const [adminChecked, setAdminChecked] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function checkAdmin() {
      const { data: userData } = await supabase.auth.getUser()

      if (!userData.user) {
        setAdminChecked(true)
        return
      }

      const { data } = await supabase.rpc('is_admin')
      setIsAdmin(Boolean(data))
      setAdminChecked(true)
    }

    async function loadVideo() {
      if (!videoId) return

      const { data, error: loadError } = await supabase
        .from('videos')
        .select('*')
        .eq('id', videoId)
        .single()

      if (loadError || !data) {
        setError('Nu am putut încărca videoclipul.')
        setLoading(false)
        return
      }

      const video = data as DatabaseVideo
      setForm({
        title: video.title,
        slug: video.slug,
        description: video.description,
        platform: video.platform,
        href: video.href,
        embed_url: video.embed_url,
        thumbnail_url: video.thumbnail_url,
        published_at: video.published_at,
        duration: video.duration,
        context: video.context,
        featured: video.featured,
        status: video.status,
      })
      setLoading(false)
    }

    checkAdmin()
    loadVideo()
  }, [videoId, supabase])

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({
      ...current,
      [key]: value,
      slug: key === 'title' && !videoId ? slugify(value as string) : current.slug,
    }))
  }

  function fillYoutubeFields() {
    const embedUrl = youtubeEmbedFromUrl(form.href)
    const thumbnailUrl = youtubeThumbnailFromUrl(form.href)

    if (!embedUrl) {
      setError('Nu am găsit ID-ul YouTube din link.')
      return
    }

    setForm((current) => ({
      ...current,
      embed_url: current.embed_url || embedUrl,
      thumbnail_url: current.thumbnail_url || thumbnailUrl,
    }))
    setError('')
  }

  async function saveVideo(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) {
      setError('Trebuie să fii autentificat.')
      setSaving(false)
      return
    }

    const { data: adminStatus } = await supabase.rpc('is_admin')
    if (!adminStatus) {
      setError('Contul este autentificat, dar nu are drepturi de admin în Supabase.')
      setSaving(false)
      return
    }

    const title = form.title.trim()
    const slug = slugify(form.slug.trim() || title)

    if (!title || !slug) {
      setError('Titlul și slug-ul sunt obligatorii.')
      setSaving(false)
      return
    }

    const payload = {
      title,
      slug,
      description: form.description.trim(),
      platform: form.platform,
      href: form.href.trim(),
      embed_url: form.embed_url.trim(),
      thumbnail_url: form.thumbnail_url.trim(),
      published_at: form.published_at,
      duration: form.duration.trim(),
      context: form.context.trim(),
      featured: form.featured,
      status: form.status,
    }

    const query = videoId
      ? supabase.from('videos').update(payload).eq('id', videoId)
      : supabase.from('videos').insert(payload)

    const { error: saveError } = await query
    setSaving(false)

    if (saveError) {
      setError(saveError.message || 'Nu am putut salva videoclipul.')
      return
    }

    router.push('/admin/video')
    router.refresh()
  }

  if (loading) {
    return <main className="mx-auto max-w-4xl px-5 py-16">Se încarcă...</main>
  }

  return (
    <main className="mx-auto max-w-4xl px-5 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">
        Admin
      </p>
      <h1 className="mt-3 font-serif text-4xl">
        {videoId ? 'Editează video' : 'Video nou'}
      </h1>
      {adminChecked && !isAdmin ? (
        <div className="mt-6 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm leading-relaxed text-destructive">
          Contul este autentificat, dar nu are drepturi de admin în Supabase.
        </div>
      ) : null}

      <form onSubmit={saveVideo} className="mt-8 grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField label="Titlu" value={form.title} onChange={(value) => updateField('title', value)} />
          <TextField label="Slug" value={form.slug} onChange={(value) => updateField('slug', slugify(value))} />
          <TextField label="Context" value={form.context} onChange={(value) => updateField('context', value)} />
          <TextField label="Data" type="date" value={form.published_at} onChange={(value) => updateField('published_at', value)} />
          <TextField label="Durată / emisiune" value={form.duration} onChange={(value) => updateField('duration', value)} />
          <label className="block text-sm">
            <span className="font-medium">Platformă</span>
            <select
              value={form.platform}
              onChange={(e) => updateField('platform', e.target.value as FormState['platform'])}
              className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-3"
            >
              <option value="YouTube">YouTube</option>
              <option value="TV">TV</option>
              <option value="Facebook">Facebook</option>
            </select>
          </label>
        </div>

        <TextArea label="Descriere" rows={4} value={form.description} onChange={(value) => updateField('description', value)} />
        <TextField label="Link sursă" value={form.href} onChange={(value) => updateField('href', value)} />
        <div className="rounded-lg border border-border p-4">
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField label="Embed URL" value={form.embed_url} onChange={(value) => updateField('embed_url', value)} />
            <TextField label="Thumbnail URL" value={form.thumbnail_url} onChange={(value) => updateField('thumbnail_url', value)} />
          </div>
          <button
            type="button"
            onClick={fillYoutubeFields}
            className="mt-4 rounded-full border border-border px-4 py-2 text-sm font-medium hover:border-brand hover:text-brand"
          >
            Completează automat din YouTube
          </button>
        </div>

        <div className="grid gap-4 rounded-lg border border-border p-4 sm:grid-cols-2">
          <label className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => updateField('featured', e.target.checked)}
            />
            Video principal
          </label>
          <label className="block text-sm">
            <span className="font-medium">Status</span>
            <select
              value={form.status}
              onChange={(e) => updateField('status', e.target.value as FormState['status'])}
              className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2"
            >
              <option value="draft">Draft</option>
              <option value="published">Publicat</option>
            </select>
          </label>
        </div>

        {error ? <p className="text-sm text-destructive">{error}</p> : null}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-brand px-6 py-3 text-sm font-medium text-brand-foreground"
          >
            {saving ? 'Se salvează...' : 'Salvează'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/video')}
            className="rounded-full border border-border px-6 py-3 text-sm font-medium"
          >
            Renunță
          </button>
        </div>
      </form>
    </main>
  )
}

function TextField({
  label,
  value,
  onChange,
  type = 'text',
}: {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
}) {
  return (
    <label className="block text-sm">
      <span className="font-medium">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 outline-none focus:border-brand"
      />
    </label>
  )
}

function TextArea({
  label,
  value,
  onChange,
  rows,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  rows: number
}) {
  return (
    <label className="block text-sm">
      <span className="font-medium">{label}</span>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand"
      />
    </label>
  )
}
