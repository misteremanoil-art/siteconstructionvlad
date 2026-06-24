'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserSupabaseClient } from '@/lib/supabase-browser'
import type { DatabaseArticle } from '@/lib/supabase'

type FormState = {
  title: string
  slug: string
  standfirst: string
  category: string
  author: string
  published_at: string
  display_date: string
  reading_time: string
  image_url: string
  image_alt: string
  audio_url: string
  tags: string
  featured: boolean
  status: 'draft' | 'published'
  content: string
}

const emptyForm: FormState = {
  title: '',
  slug: '',
  standfirst: '',
  category: 'Teologie',
  author: 'Albert-Beniamin Cucu',
  published_at: new Date().toISOString().slice(0, 10),
  display_date: '',
  reading_time: '',
  image_url: '',
  image_alt: '',
  audio_url: '',
  tags: '',
  featured: false,
  status: 'draft',
  content: '',
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function ArticleEditor({ articleId }: { articleId?: string }) {
  const router = useRouter()
  const supabase = useMemo(() => createBrowserSupabaseClient(), [])
  const [form, setForm] = useState<FormState>(emptyForm)
  const [loading, setLoading] = useState(Boolean(articleId))
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadingAudio, setUploadingAudio] = useState(false)
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

    async function loadArticle() {
      if (!articleId) return

      const { data, error: loadError } = await supabase
        .from('articles')
        .select('*')
        .eq('id', articleId)
        .single()

      if (loadError || !data) {
        setError('Nu am putut încărca articolul.')
        setLoading(false)
        return
      }

      const article = data as DatabaseArticle
      setForm({
        title: article.title,
        slug: article.slug,
        standfirst: article.standfirst,
        category: article.category,
        author: article.author,
        published_at: article.published_at,
        display_date: article.display_date,
        reading_time: article.reading_time,
        image_url: article.image_url,
        image_alt: article.image_alt,
        audio_url: article.audio_url ?? '',
        tags: article.tags.join(', '),
        featured: article.featured,
        status: article.status,
        content: article.content,
      })
      setLoading(false)
    }

    checkAdmin()
    loadArticle()
  }, [articleId, supabase])

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({
      ...current,
      [key]: value,
      slug: key === 'title' && !articleId ? slugify(value as string) : current.slug,
    }))
  }

  async function saveArticle(e: React.FormEvent) {
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
      setError(`Contul ${userData.user.email ?? ''} este autentificat, dar nu este admin în Supabase. Adaugă emailul în admin_users și încearcă din nou.`)
      setSaving(false)
      return
    }

    const title = form.title.trim()
    const slug = slugify(form.slug.trim() || title)

    if (!title) {
      setError('Titlul este obligatoriu.')
      setSaving(false)
      return
    }

    if (!slug) {
      setError('Slug-ul este obligatoriu. Scrie un titlu cu litere sau cifre.')
      setSaving(false)
      return
    }

    const payload = {
      title,
      slug,
      standfirst: form.standfirst.trim(),
      category: form.category.trim() || 'Teologie',
      author: form.author.trim() || 'Albert-Beniamin Cucu',
      published_at: form.published_at,
      display_date: form.display_date.trim(),
      reading_time: form.reading_time.trim(),
      image_url: form.image_url.trim(),
      image_alt: form.image_alt.trim(),
      audio_url: form.audio_url.trim(),
      tags: form.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      featured: form.featured,
      status: form.status,
      content: form.content,
      created_by: userData.user.id,
    }

    const query = articleId
      ? supabase.from('articles').update(payload).eq('id', articleId)
      : supabase.from('articles').insert(payload)

    const { error: saveError } = await query
    setSaving(false)

    if (saveError) {
      setError(saveError.message || 'Nu am putut salva articolul. Verifică dacă ești admin.')
      return
    }

    router.push(payload.status === 'published' ? `/articole/${slug}` : '/admin')
    router.refresh()
  }

  async function uploadImage(file: File | null) {
    if (!file) return
    setUploading(true)
    setError('')

    const extension = file.name.split('.').pop() || 'jpg'
    const baseSlug = form.slug || slugify(form.title) || crypto.randomUUID()
    const filePath = `${baseSlug}/${Date.now()}.${extension}`

    const { error: uploadError } = await supabase.storage
      .from('article-images')
      .upload(filePath, file, {
        cacheControl: '31536000',
        upsert: false,
      })

    if (uploadError) {
      setError('Nu am putut încărca imaginea. Verifică Storage/RLS.')
      setUploading(false)
      return
    }

    const { data } = supabase.storage
      .from('article-images')
      .getPublicUrl(filePath)

    updateField('image_url', data.publicUrl)
    setUploading(false)
  }

  async function uploadAudio(file: File | null) {
    if (!file) return
    setUploadingAudio(true)
    setError('')

    const extension = file.name.split('.').pop() || 'mp3'
    const baseSlug = form.slug || slugify(form.title) || crypto.randomUUID()
    const filePath = `${baseSlug}/${Date.now()}.${extension}`

    const { error: uploadError } = await supabase.storage
      .from('article-audio')
      .upload(filePath, file, {
        cacheControl: '31536000',
        upsert: false,
      })

    if (uploadError) {
      setError('Nu am putut încărca audio-ul. Verifică Storage/RLS pentru article-audio.')
      setUploadingAudio(false)
      return
    }

    const { data } = supabase.storage
      .from('article-audio')
      .getPublicUrl(filePath)

    updateField('audio_url', data.publicUrl)
    setUploadingAudio(false)
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
        {articleId ? 'Editează articol' : 'Articol nou'}
      </h1>
      {adminChecked && !isAdmin ? (
        <div className="mt-6 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm leading-relaxed text-destructive">
          Contul este autentificat, dar nu are drepturi de admin în Supabase. Salvarea
          articolelor va fi blocată până când emailul este adăugat în `admin_users`.
        </div>
      ) : null}

      <form onSubmit={saveArticle} className="mt-8 grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField label="Titlu" value={form.title} onChange={(value) => updateField('title', value)} />
          <TextField label="Slug" value={form.slug} onChange={(value) => updateField('slug', slugify(value))} />
          <TextField label="Categorie" value={form.category} onChange={(value) => updateField('category', value)} />
          <TextField label="Autor" value={form.author} onChange={(value) => updateField('author', value)} />
          <TextField label="Data publicării" type="date" value={form.published_at} onChange={(value) => updateField('published_at', value)} />
          <TextField label="Data afișată" value={form.display_date} onChange={(value) => updateField('display_date', value)} />
          <TextField label="Timp de lectură" value={form.reading_time} onChange={(value) => updateField('reading_time', value)} />
          <TextField label="Taguri, separate prin virgulă" value={form.tags} onChange={(value) => updateField('tags', value)} />
        </div>

        <TextArea label="Subtitlu" rows={3} value={form.standfirst} onChange={(value) => updateField('standfirst', value)} />
        <TextField label="URL imagine" value={form.image_url} onChange={(value) => updateField('image_url', value)} />
        <label className="block text-sm">
          <span className="font-medium">Încarcă imagine principală</span>
          <input
            type="file"
            accept="image/*"
            disabled={uploading}
            onChange={(e) => uploadImage(e.target.files?.[0] ?? null)}
            className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm"
          />
          {uploading ? (
            <span className="mt-2 block text-sm text-muted-foreground">
              Se încarcă imaginea...
            </span>
          ) : null}
        </label>
        <TextField label="Alt imagine" value={form.image_alt} onChange={(value) => updateField('image_alt', value)} />

        <div className="rounded-lg border border-border p-4">
          <TextField label="URL audio articol" value={form.audio_url} onChange={(value) => updateField('audio_url', value)} />
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Lasă gol pentru citirea automată gratuită din browser. Dacă pui URL sau încarci
            un fișier audio, articolul va folosi acel audio în locul vocii automate.
          </p>
          {form.audio_url ? (
            <button
              type="button"
              onClick={() => updateField('audio_url', '')}
              className="mt-3 text-sm font-medium text-destructive hover:underline"
            >
              Șterge audio și folosește citirea automată
            </button>
          ) : null}
        </div>
        <label className="block text-sm">
          <span className="font-medium">Încarcă audio pentru articol</span>
          <input
            type="file"
            accept="audio/*"
            disabled={uploadingAudio}
            onChange={(e) => uploadAudio(e.target.files?.[0] ?? null)}
            className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm"
          />
          {uploadingAudio ? (
            <span className="mt-2 block text-sm text-muted-foreground">
              Se încarcă audio-ul...
            </span>
          ) : null}
          {form.audio_url ? (
            <audio controls src={form.audio_url} className="mt-3 w-full" />
          ) : null}
        </label>

        <div className="grid gap-4 rounded-lg border border-border p-4 sm:grid-cols-2">
          <label className="flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => updateField('featured', e.target.checked)}
            />
            Articol principal
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

        <TextArea label="Conținut MDX" rows={18} value={form.content} onChange={(value) => updateField('content', value)} />

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
            onClick={() => router.push('/admin')}
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
        className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 font-mono text-sm outline-none focus:border-brand"
      />
    </label>
  )
}
