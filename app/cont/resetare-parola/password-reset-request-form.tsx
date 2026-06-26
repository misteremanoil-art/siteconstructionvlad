'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { createBrowserSupabaseClient } from '@/lib/supabase-browser'

export function PasswordResetRequestForm() {
  const supabase = useMemo(() => createBrowserSupabaseClient(), [])
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')

    const cleanEmail = email.trim().toLowerCase()
    const redirectTo = `${window.location.origin}/cont/parola-noua`

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
      redirectTo,
    })

    setLoading(false)

    if (resetError) {
      setError('Nu am putut trimite emailul de resetare. Verifică adresa introdusă.')
      return
    }

    setMessage('Am trimis emailul de resetare. Verifică inboxul și folderul Spam.')
  }

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">
        Cont
      </p>
      <h1 className="mt-3 font-serif text-4xl">Resetare parolă</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Scrie emailul contului tău. Vei primi un link prin care poți seta o parolă nouă.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-foreground">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand"
          />
        </label>

        {message ? (
          <p className="rounded-lg border border-brand/30 bg-brand/10 px-4 py-3 text-sm text-foreground">
            {message}
          </p>
        ) : null}
        {error ? (
          <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-brand px-5 py-3 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Se trimite...' : 'Trimite link de resetare'}
        </button>
      </form>

      <Link href="/cont/login" className="mt-6 text-center text-sm font-medium text-brand hover:underline">
        Înapoi la autentificare
      </Link>
    </main>
  )
}
