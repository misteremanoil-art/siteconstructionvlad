'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { createBrowserSupabaseClient } from '@/lib/supabase-browser'

export function NewPasswordForm() {
  const router = useRouter()
  const supabase = useMemo(() => createBrowserSupabaseClient(), [])
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [ready, setReady] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession()
      setReady(Boolean(data.session))
    }

    checkSession()

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY' || session) {
        setReady(true)
      }
    })

    return () => data.subscription.unsubscribe()
  }, [supabase])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage('')
    setError('')

    if (password.length < 6) {
      setError('Parola trebuie să aibă cel puțin 6 caractere.')
      return
    }

    if (password !== confirmPassword) {
      setError('Parolele nu coincid.')
      return
    }

    setSaving(true)
    const { error: updateError } = await supabase.auth.updateUser({ password })
    setSaving(false)

    if (updateError) {
      setError('Nu am putut salva parola nouă. Deschide din nou linkul primit pe email.')
      return
    }

    setPassword('')
    setConfirmPassword('')
    setMessage('Parola a fost schimbată. Te poți autentifica acum.')

    window.setTimeout(() => {
      router.push('/cont/login?passwordChanged=1')
      router.refresh()
    }, 1200)
  }

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">
        Cont
      </p>
      <h1 className="mt-3 font-serif text-4xl">Parolă nouă</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Setează o parolă nouă pentru contul tău.
      </p>

      {!ready ? (
        <div className="mt-8 rounded-lg border border-border bg-card p-5 text-sm leading-relaxed text-muted-foreground">
          Dacă ai ajuns aici fără linkul primit pe email, cere mai întâi un link de resetare.
          <Link href="/cont/resetare-parola" className="mt-4 block font-medium text-brand hover:underline">
            Cere link de resetare
          </Link>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <PasswordInput label="Parolă nouă" value={password} onChange={setPassword} />
          <PasswordInput label="Confirmă parola" value={confirmPassword} onChange={setConfirmPassword} />

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
            disabled={saving}
            className="w-full rounded-full bg-brand px-5 py-3 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? 'Se salvează...' : 'Salvează parola nouă'}
          </button>
        </form>
      )}
    </main>
  )
}

function PasswordInput({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <input
        type="password"
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand"
      />
    </label>
  )
}
