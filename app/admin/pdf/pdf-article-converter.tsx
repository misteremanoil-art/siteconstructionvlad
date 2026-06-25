'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FileText, Upload } from 'lucide-react'
import { createBrowserSupabaseClient } from '@/lib/supabase-browser'

type PdfDraft = {
  title: string
  slug: string
  standfirst: string
  category: string
  readingTime: string
  content: string
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

function cleanFileName(value: string) {
  return value
    .replace(/\.pdf$/i, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function titleCase(value: string) {
  return value
    .split(' ')
    .map((word) => word.charAt(0).toLocaleUpperCase('ro-RO') + word.slice(1))
    .join(' ')
}

function normalizeExtractedText(value: string) {
  return value
    .replace(/\r/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim()
}

function estimateReadingTime(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.ceil(words / 220))
  return `${minutes} min`
}

function firstSentence(text: string) {
  const compact = text.replace(/\s+/g, ' ').trim()
  const match = compact.match(/^(.{80,220}?[.!?])\s/)
  return match?.[1] ?? compact.slice(0, 180)
}

export function PdfArticleConverter() {
  const router = useRouter()
  const supabase = useMemo(() => createBrowserSupabaseClient(), [])
  const [draft, setDraft] = useState<PdfDraft>({
    title: '',
    slug: '',
    standfirst: '',
    category: 'Teologie',
    readingTime: '',
    content: '',
  })
  const [extracting, setExtracting] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  function updateDraft<K extends keyof PdfDraft>(key: K, value: PdfDraft[K]) {
    setDraft((current) => ({
      ...current,
      [key]: value,
      slug: key === 'title' ? slugify(value) : current.slug,
    }))
  }

  async function extractPdf(file: File | null) {
    if (!file) return
    setError('')
    setNotice('')
    setExtracting(true)

    try {
      const pdfjs = await import('pdfjs-dist')
      pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.mjs',
        import.meta.url,
      ).toString()

      const buffer = await file.arrayBuffer()
      const pdf = await pdfjs.getDocument({ data: buffer }).promise
      const pages: string[] = []

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
        const page = await pdf.getPage(pageNumber)
        const textContent = await page.getTextContent()
        const pageText = textContent.items
          .map((item) => ('str' in item ? item.str : ''))
          .join(' ')
          .replace(/\s+/g, ' ')
          .trim()

        if (pageText) pages.push(pageText)
      }

      const content = normalizeExtractedText(pages.join('\n\n'))
      if (!content) {
        setError('Nu am găsit text în acest PDF. Dacă este scanat ca imagine, va avea nevoie de OCR.')
        return
      }

      const title = titleCase(cleanFileName(file.name)) || 'Articol din PDF'
      setDraft({
        title,
        slug: slugify(title),
        standfirst: firstSentence(content),
        category: 'Teologie',
        readingTime: estimateReadingTime(content),
        content,
      })
      setNotice(`Am extras text din ${pdf.numPages} ${pdf.numPages === 1 ? 'pagină' : 'pagini'}.`)
    } catch {
      setError('Nu am putut citi PDF-ul. Încearcă alt fișier sau verifică dacă PDF-ul conține text selectabil.')
    } finally {
      setExtracting(false)
    }
  }

  async function saveDraft(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSaving(true)

    const title = draft.title.trim()
    const content = draft.content.trim()
    const slug = slugify(draft.slug.trim() || title)
    const category = draft.category.trim()

    if (!title || !slug || !category || !content) {
      setError('Titlul, categoria și textul articolului sunt obligatorii.')
      setSaving(false)
      return
    }

    const { data: userData } = await supabase.auth.getUser()
    if (!userData.user) {
      setError('Trebuie să fii autentificat ca admin.')
      setSaving(false)
      return
    }

    const { data: adminStatus } = await supabase.rpc('is_admin')
    if (!adminStatus) {
      setError('Contul este autentificat, dar nu are drepturi de admin.')
      setSaving(false)
      return
    }

    const { data, error: saveError } = await supabase
      .from('articles')
      .insert({
        title,
        slug,
        standfirst: draft.standfirst.trim(),
        category,
        author: 'Albert-Beniamin Cucu',
        published_at: new Date().toISOString().slice(0, 10),
        display_date: '',
        reading_time: draft.readingTime.trim() || estimateReadingTime(content),
        image_url: '',
        image_alt: title,
        audio_url: '',
        tags: [],
        featured: false,
        status: 'draft',
        content,
        created_by: userData.user.id,
      })
      .select('id')
      .single()

    setSaving(false)

    if (saveError || !data) {
      setError(saveError?.message || 'Nu am putut salva articolul.')
      return
    }

    router.push(`/admin/articole/${data.id}`)
    router.refresh()
  }

  return (
    <main className="mx-auto max-w-5xl px-5 py-16">
      <div className="border-b border-border pb-8">
        <Link href="/admin" className="text-sm font-medium text-brand hover:underline">
          Înapoi la admin
        </Link>
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-brand">
          Admin
        </p>
        <h1 className="mt-3 font-serif text-4xl">PDF în articol</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Încarcă un PDF cu text selectabil, verifică rezultatul și salvează-l ca draft. După
          salvare îl poți edita normal înainte de publicare.
        </p>
      </div>

      <section className="mt-8 rounded-xl border border-border bg-card/40 p-5">
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-border px-5 py-10 text-center transition-colors hover:border-brand/50 hover:bg-brand/5">
          <Upload className="h-8 w-8 text-brand" />
          <span className="mt-3 font-medium">
            {extracting ? 'Citesc PDF-ul...' : 'Alege PDF-ul'}
          </span>
          <span className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            Funcționează cu PDF-uri care au text selectabil. Pentru scanări ca imagine va fi
            nevoie de OCR într-o etapă separată.
          </span>
          <input
            type="file"
            accept="application/pdf"
            disabled={extracting}
            onChange={(e) => extractPdf(e.target.files?.[0] ?? null)}
            className="sr-only"
          />
        </label>
        {notice ? <p className="mt-4 text-sm text-brand">{notice}</p> : null}
        {error ? <p className="mt-4 text-sm text-destructive">{error}</p> : null}
      </section>

      <form onSubmit={saveDraft} className="mt-8 grid gap-5">
        <section className="rounded-xl border border-border bg-card/40 p-5">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand">
              <FileText className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-serif text-2xl font-semibold">Draft articol</h2>
              <p className="text-sm text-muted-foreground">
                Ajustează titlul și descrierea înainte să îl salvezi.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <TextField label="Titlul articolului" value={draft.title} onChange={(value) => updateDraft('title', value)} />
            <TextField label="Adresa articolului" value={draft.slug} onChange={(value) => updateDraft('slug', slugify(value))} />
            <label className="block text-sm">
              <span className="font-medium">Categorie</span>
              <select
                value={categorySuggestions.includes(draft.category) ? draft.category : 'custom'}
                onChange={(e) => updateDraft('category', e.target.value === 'custom' ? '' : e.target.value)}
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
                value={draft.category}
                onChange={(e) => updateDraft('category', e.target.value)}
                className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm"
              />
            </label>
            <TextField label="Timp de citire" value={draft.readingTime} onChange={(value) => updateDraft('readingTime', value)} />
          </div>

          <label className="mt-5 block text-sm">
            <span className="font-medium">Descriere scurtă</span>
            <textarea
              rows={3}
              value={draft.standfirst}
              onChange={(e) => updateDraft('standfirst', e.target.value)}
              className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand"
            />
          </label>

          <label className="mt-5 block text-sm">
            <span className="font-medium">Text extras din PDF</span>
            <textarea
              rows={18}
              value={draft.content}
              onChange={(e) => updateDraft('content', e.target.value)}
              className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm leading-relaxed outline-none focus:border-brand"
            />
          </label>
        </section>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={saving || extracting || !draft.content.trim()}
            className="rounded-full bg-brand px-6 py-3 text-sm font-medium text-brand-foreground disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? 'Se salvează...' : 'Salvează ca draft'}
          </button>
          <Link
            href="/admin/articole/new"
            className="rounded-full border border-border px-6 py-3 text-sm font-medium"
          >
            Scrie articol manual
          </Link>
        </div>
      </form>
    </main>
  )
}

function TextField({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label className="block text-sm">
      <span className="font-medium">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 outline-none focus:border-brand"
      />
    </label>
  )
}
