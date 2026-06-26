'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
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

const categorySuggestions = [
  'Teologie',
  'Studii biblice',
  'Apocalipsa',
  'Viață spirituală',
  'Slujire pastorală',
  'Recenzii',
  'Eseuri',
]

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function parseArticleContent(rawContent: string) {
  const notesMatch = rawContent.match(/\n*<div className="notes">\s*([\s\S]*?)\s*<\/div>\s*$/)
  const contentWithoutNotes = notesMatch
    ? rawContent.replace(/\n*<div className="notes">\s*([\s\S]*?)\s*<\/div>\s*$/, '').trim()
    : rawContent

  const footnotes = notesMatch
    ? notesMatch[1]
        .split(/\n+/)
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => line.replace(/^\d+\.\s*/, ''))
    : []

  return {
    content: contentWithoutNotes.replace(/<sup>(\d+)<\/sup>/g, '[^$1]'),
    footnotes,
  }
}

function buildArticleContent(content: string, footnotes: string[]) {
  const body = content.trim().replace(/\[\^(\d+)\]/g, '<sup>$1</sup>')
  const cleanFootnotes = footnotes.map((note) => note.trim())

  if (!cleanFootnotes.some(Boolean)) return body

  const notes = cleanFootnotes
    .map((note, index) => `${index + 1}. ${note}`)
    .join('\n\n')

  return `${body}\n\n<div className="notes">\n\n${notes}\n\n</div>`
}

export function ArticleEditor({ articleId }: { articleId?: string }) {
  const router = useRouter()
  const supabase = useMemo(() => createBrowserSupabaseClient(), [])
  const contentTextareaRef = useRef<HTMLTextAreaElement | null>(null)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [footnotes, setFootnotes] = useState<string[]>([])
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
      const parsedContent = parseArticleContent(article.content)
      setFootnotes(parsedContent.footnotes)
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
        content: parsedContent.content,
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

  function addFootnote() {
    const noteNumber = footnotes.length + 1
    const marker = `[^${noteNumber}]`
    const textarea = contentTextareaRef.current

    setFootnotes((current) => [...current, ''])

    if (!textarea) {
      updateField('content', `${form.content}${form.content ? ' ' : ''}${marker}`)
      return
    }

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const nextContent = `${form.content.slice(0, start)}${marker}${form.content.slice(end)}`
    updateField('content', nextContent)

    window.requestAnimationFrame(() => {
      textarea.focus()
      textarea.setSelectionRange(start + marker.length, start + marker.length)
    })
  }

  function addQuote() {
    const textarea = contentTextareaRef.current
    const fallbackQuote = 'Scrie citatul aici.'

    if (!textarea) {
      updateField('content', `${form.content}${form.content ? '\n\n' : ''}> ${fallbackQuote}`)
      return
    }

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = form.content.slice(start, end).trim()
    const quoteText = selectedText || fallbackQuote
    const quoteBlock = quoteText
      .split('\n')
      .map((line) => `> ${line.trim()}`)
      .join('\n')
    const before = form.content.slice(0, start)
    const after = form.content.slice(end)
    const prefix = before && !before.endsWith('\n\n') ? '\n\n' : ''
    const suffix = after && !after.startsWith('\n\n') ? '\n\n' : ''
    const nextContent = `${before}${prefix}${quoteBlock}${suffix}${after}`

    updateField('content', nextContent)

    window.requestAnimationFrame(() => {
      textarea.focus()
      const quoteStart = start + prefix.length
      const quoteEnd = quoteStart + quoteBlock.length
      textarea.setSelectionRange(quoteStart, quoteEnd)
    })
  }

  function updateFootnote(index: number, value: string) {
    setFootnotes((current) => current.map((note, noteIndex) => (
      noteIndex === index ? value : note
    )))
  }

  function removeLastFootnote() {
    if (!footnotes.length) return
    const noteNumber = footnotes.length
    setFootnotes((current) => current.slice(0, -1))
    updateField('content', form.content.replace(new RegExp(`\\s?\\[\\^${noteNumber}\\]`, 'g'), ''))
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

    const category = form.category.trim()
    if (!category) {
      setError('Categoria este obligatorie. Alege una existentă sau scrie o categorie nouă.')
      setSaving(false)
      return
    }

    const emptyFootnoteIndex = footnotes.findIndex((note) => !note.trim())
    if (emptyFootnoteIndex !== -1) {
      setError(`Completează Nota ${emptyFootnoteIndex + 1} sau șterge ultima notă înainte de salvare.`)
      setSaving(false)
      return
    }

    const noteMarkers = Array.from(form.content.matchAll(/\[\^(\d+)\]/g)).map((match) => Number(match[1]))
    const missingNoteNumber = noteMarkers.find((noteNumber) => noteNumber > footnotes.length)
    if (missingNoteNumber) {
      setError(`Ai în text nota ${missingNoteNumber}, dar nu există câmp pentru ea. Apasă „Adaugă notă” sau șterge marcajul din text.`)
      setSaving(false)
      return
    }

    const payload = {
      title,
      slug,
      standfirst: form.standfirst.trim(),
      category,
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
      content: buildArticleContent(form.content, footnotes),
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
        <FormSection
          title="Informații principale"
          description="Acestea apar pe pagina articolului și în cardurile de pe site."
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              label="Titlul articolului"
              value={form.title}
              onChange={(value) => updateField('title', value)}
              helper="Scrie titlul exact cum vrei să apară pe site."
            />
            <TextField
              label="Adresa articolului"
              value={form.slug}
              onChange={(value) => updateField('slug', slugify(value))}
              helper="Se completează singură din titlu. Schimbă doar dacă vrei alt link."
            />
            <label className="block text-sm">
              <span className="font-medium">Categorie</span>
              <select
                value={categorySuggestions.includes(form.category) ? form.category : 'custom'}
                onChange={(e) => {
                  const value = e.target.value
                  updateField('category', value === 'custom' ? '' : value)
                }}
                className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2"
              >
                {categorySuggestions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
                <option value="custom">Categorie nouă</option>
              </select>
              <input
                required
                value={form.category}
                onChange={(e) => updateField('category', e.target.value)}
                placeholder="Scrie categoria articolului"
                className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm"
              />
              <span className="mt-2 block text-xs leading-relaxed text-muted-foreground">
                Pentru o categorie nouă, alege „Categorie nouă”, scrie numele și salvează articolul.
              </span>
            </label>
            <TextField
              label="Autor"
              value={form.author}
              onChange={(value) => updateField('author', value)}
            />
            <TextField
              label="Data publicării"
              type="date"
              value={form.published_at}
              onChange={(value) => updateField('published_at', value)}
            />
            <TextField
              label="Data afișată pe site"
              value={form.display_date}
              onChange={(value) => updateField('display_date', value)}
              helper="Opțional. Poți scrie, de exemplu, 25 iunie 2026."
            />
            <TextField
              label="Timp de citire"
              value={form.reading_time}
              onChange={(value) => updateField('reading_time', value)}
              helper="Exemplu: 6 min"
            />
            <TextField
              label="Cuvinte cheie"
              value={form.tags}
              onChange={(value) => updateField('tags', value)}
              helper="Separă-le prin virgulă: rugăciune, credință, teologie"
            />
          </div>

          <TextArea
            label="Descriere scurtă"
            rows={3}
            value={form.standfirst}
            onChange={(value) => updateField('standfirst', value)}
            helper="Apare sub titlu și în previzualizarea articolului."
          />
        </FormSection>

        <FormSection
          title="Imagine"
          description="Imaginea principală apare sus în articol și în cardurile de pe site."
        >
          <TextField
            label="Link imagine"
            value={form.image_url}
            onChange={(value) => updateField('image_url', value)}
            helper="Poți lipi un link direct către imagine sau poți încărca una mai jos."
          />
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
          <TextField
            label="Descriere imagine"
            value={form.image_alt}
            onChange={(value) => updateField('image_alt', value)}
            helper="Opțional. Ajută la accesibilitate și poate descrie pe scurt imaginea."
          />
        </FormSection>

        <FormSection
          title="Audio"
          description="Poți lăsa gol pentru citirea automată gratuită din browser."
        >
          <TextField
            label="Link audio"
            value={form.audio_url}
            onChange={(value) => updateField('audio_url', value)}
            helper="Dacă pui un link sau încarci un fișier, articolul va folosi acel audio."
          />
          {form.audio_url ? (
            <button
              type="button"
              onClick={() => updateField('audio_url', '')}
              className="text-left text-sm font-medium text-destructive hover:underline"
            >
              Șterge audio și folosește citirea automată
            </button>
          ) : null}
          <label className="block text-sm">
            <span className="font-medium">Încarcă fișier audio</span>
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
        </FormSection>

        <FormSection
          title="Publicare"
          description="Alege dacă articolul rămâne salvat ca draft sau apare public pe site."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex items-center gap-3 rounded-lg border border-border p-4 text-sm">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => updateField('featured', e.target.checked)}
              />
              <span>
                <span className="block font-medium">Articol principal</span>
                <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                  Îl evidențiază pe pagina de acasă.
                </span>
              </span>
            </label>
            <label className="block text-sm">
              <span className="font-medium">Vizibilitate</span>
              <select
                value={form.status}
                onChange={(e) => updateField('status', e.target.value as FormState['status'])}
                className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2"
              >
                <option value="draft">Draft - nu apare public</option>
                <option value="published">Publicat - apare pe site</option>
              </select>
            </label>
          </div>
        </FormSection>

        <FormSection
          title="Textul articolului"
          description="Scrie articolul aici. Poți adăuga note de subsol și citate formatate automat."
        >
          <div className="flex flex-wrap items-center gap-3 rounded-lg border border-border bg-background/45 p-4">
            <button
              type="button"
              onClick={addFootnote}
              className="rounded-full bg-brand px-4 py-2 text-sm font-medium text-brand-foreground"
            >
              Adaugă notă
            </button>
            <button
              type="button"
              onClick={addQuote}
              className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-brand hover:text-brand"
            >
              Adaugă citat
            </button>
            {footnotes.length > 0 ? (
              <button
                type="button"
                onClick={removeLastFootnote}
                className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground"
              >
                Șterge ultima notă
              </button>
            ) : null}
            <p className="text-sm leading-relaxed text-muted-foreground">
              Selectează textul și apasă „Adaugă citat” sau pune cursorul unde vrei să apară citatul.
            </p>
          </div>
          <TextArea
            label="Conținut"
            rows={18}
            value={form.content}
            onChange={(value) => updateField('content', value)}
            helper="Pentru titluri poți folosi ## înaintea textului. Citatele se salvează cu > înaintea rândului."
            monospace
            textareaRef={contentTextareaRef}
          />
          {footnotes.length > 0 ? (
            <div className="grid gap-3 rounded-lg border border-border bg-background/45 p-4">
              <div>
                <h3 className="font-medium">Note de subsol</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Completează explicațiile aici. La salvare, site-ul le pune automat la finalul articolului.
                </p>
              </div>
              {footnotes.map((note, index) => (
                <label key={index} className="block text-sm">
                  <span className="font-medium">Nota {index + 1}</span>
                  <textarea
                    rows={3}
                    value={note}
                    onChange={(e) => updateFootnote(index, e.target.value)}
                    placeholder="Scrie explicația sau sursa notei"
                    className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand"
                  />
                </label>
              ))}
            </div>
          ) : null}
        </FormSection>

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

function FormSection({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-xl border border-border bg-card/40 p-5">
      <div className="mb-5">
        <h2 className="font-serif text-2xl font-semibold text-foreground">{title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
      <div className="grid gap-5">{children}</div>
    </section>
  )
}

function TextField({
  label,
  value,
  onChange,
  type = 'text',
  helper,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  helper?: string
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
      {helper ? (
        <span className="mt-2 block text-xs leading-relaxed text-muted-foreground">
          {helper}
        </span>
      ) : null}
    </label>
  )
}

function TextArea({
  label,
  value,
  onChange,
  rows,
  helper,
  monospace = false,
  textareaRef,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  rows: number
  helper?: string
  monospace?: boolean
  textareaRef?: React.Ref<HTMLTextAreaElement>
}) {
  return (
    <label className="block text-sm">
      <span className="font-medium">{label}</span>
      <textarea
        ref={textareaRef}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand ${monospace ? 'font-mono' : ''}`}
      />
      {helper ? (
        <span className="mt-2 block text-xs leading-relaxed text-muted-foreground">
          {helper}
        </span>
      ) : null}
    </label>
  )
}
