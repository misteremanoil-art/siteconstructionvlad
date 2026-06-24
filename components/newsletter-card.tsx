'use client'

import { useState } from 'react'

export function NewsletterCard() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setDone(true)
    setEmail('')
  }

  return (
    <section
      aria-label="Newsletter"
      className="rounded-3xl border border-border bg-card p-8 sm:p-12"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
        Newsletter
      </p>
      <h2 className="mt-3 max-w-2xl font-serif text-2xl font-semibold leading-tight text-foreground text-balance sm:text-3xl">
        Primești texte noi, în ritmul potrivit pentru tine.
      </h2>
      <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
        Dacă îți place să citești cu atenție și să te oprești asupra lucrurilor
        care contează, îți voi trimite doar texte simple, sincere și rare.
      </p>

      {done ? (
        <p className="mt-6 font-serif text-lg text-brand">
          Mulțumesc! Te-ai înscris cu succes.
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
            placeholder="Adresă de email"
            aria-label="Adresă de email"
            className="flex-1 rounded-full border border-border bg-background px-5 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-brand"
          />
          <button
            type="submit"
            className="rounded-full bg-brand px-6 py-3 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90"
          >
            Mă înscriu
          </button>
        </form>
      )}
    </section>
  )
}
