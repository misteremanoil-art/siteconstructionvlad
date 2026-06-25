'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserSupabaseClient } from '@/lib/supabase-browser'

const usernamePattern = /^[a-zA-Z0-9_]{3,32}$/

export function UserSignupForm() {
  const router = useRouter()
  const supabase = useMemo(() => createBrowserSupabaseClient(), [])
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const cleanUsername = username.trim()
    const cleanEmail = email.trim().toLowerCase()

    if (!usernamePattern.test(cleanUsername)) {
      setLoading(false)
      setError('Username-ul trebuie să aibă 3-32 caractere: litere, cifre sau _.')
      return
    }

    if (password.length < 6) {
      setLoading(false)
      setError('Parola trebuie să aibă cel puțin 6 caractere.')
      return
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: cleanEmail,
      password,
    })

    if (signUpError) {
      setLoading(false)
      if (signUpError.message.toLowerCase().includes('already')) {
        setError('Există deja un cont cu acest email.')
      } else {
        setError(signUpError.message || 'Nu am putut crea contul. Verifică datele introduse.')
      }
      return
    }

    if (data.session) {
      const { error: usernameError } = await supabase.rpc('set_my_username', {
        new_username: cleanUsername,
      })

      setLoading(false)

      if (usernameError) {
        router.push('/cont/setari?username=needed')
        router.refresh()
        return
      }

      router.push('/cont/setari')
      router.refresh()
      return
    }

    setLoading(false)
    router.push('/cont/login?created=1')
    router.refresh()
  }

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-5 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">
        Cont
      </p>
      <h1 className="mt-3 font-serif text-4xl">Creează cont</h1>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <TextInput label="Username" value={username} onChange={setUsername} />
        <TextInput label="Email" type="email" value={email} onChange={setEmail} />
        <TextInput label="Parolă" type="password" value={password} onChange={setPassword} />
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-brand px-5 py-3 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90"
        >
          {loading ? 'Se creează...' : 'Creează cont'}
        </button>
      </form>
      <p className="mt-6 text-sm text-muted-foreground">
        Ai deja cont?{' '}
        <Link href="/cont/login" className="text-brand hover:underline">
          Intră în cont
        </Link>
      </p>
    </main>
  )
}

function TextInput({
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
    <label className="block">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <input
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand"
      />
    </label>
  )
}
