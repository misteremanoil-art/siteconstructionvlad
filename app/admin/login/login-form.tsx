'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserSupabaseClient } from '@/lib/supabase-browser'

export function LoginForm() {
  const router = useRouter()
  const supabase = createBrowserSupabaseClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (signInError) {
      setError('Autentificarea a eșuat. Verifică emailul și parola.')
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">
        Admin
      </p>
      <h1 className="mt-3 font-serif text-4xl">Autentificare</h1>
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
        <label className="block">
          <span className="text-sm font-medium text-foreground">Parolă</span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand"
          />
        </label>
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-brand px-5 py-3 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90"
        >
          {loading ? 'Se verifică...' : 'Intră în admin'}
        </button>
      </form>
    </main>
  )
}
