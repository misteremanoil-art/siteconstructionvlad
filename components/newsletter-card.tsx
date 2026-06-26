'use client'

import { useState } from 'react'

type NewsletterTexts = {
  kicker: string
  title: string
  description: string
  placeholder: string
  button: string
  loading: string
  success: string
  error: string
}

const defaultTexts: NewsletterTexts = {
  kicker: 'Newsletter',
  title: 'Primești texte noi, în ritmul potrivit pentru tine.',
  description:
    'Dacă îți place să citești cu atenție și să te oprești asupra lucrurilor care contează, îți voi trimite doar texte simple, sincere și rare.',
  placeholder: 'Adresă de email',
  button: 'Mă înscriu',
  loading: 'Se trimite...',
  success: 'Mulțumesc! Te-ai înscris cu succes.',
  error: 'Nu am putut salva abonarea.',
}

export function NewsletterCard({ texts = defaultTexts }: { texts?: NewsletterTexts }) {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setError('')

    const response = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    const data = (await response.json().catch(() => null)) as {
      error?: string
    } | null

    setLoading(false)

    if (!response.ok) {
      setError(data?.error ?? texts.error)
      return
    }

    setDone(true)
    setEmail('')
  }

  return (
    <section
      aria-label="Newsletter"
      className="surface-card p-8 sm:p-12"
    >
      <p className="section-kicker">
        {texts.kicker}
      </p>
      <h2 className="mt-3 max-w-2xl font-serif text-2xl font-semibold leading-tight text-foreground text-balance sm:text-3xl">
        {texts.title}
      </h2>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
        {texts.description}
      </p>

      {done ? (
        <p className="mt-6 font-serif text-lg text-brand">
          {texts.success}
        </p>
      ) : (
        <form
          onSubmit={onSubmit}
          className="mt-6 flex w-full max-w-md flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={texts.placeholder}
            aria-label={texts.placeholder}
            className="flex-1 rounded-full border border-border bg-background px-5 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-brand"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-brand px-6 py-3 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90"
          >
            {loading ? texts.loading : texts.button}
          </button>
        </form>
      )}
      {error ? <p className="mt-3 text-sm text-destructive">{error}</p> : null}
    </section>
  )
}
