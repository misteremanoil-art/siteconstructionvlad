'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createBrowserSupabaseClient } from '@/lib/supabase-browser'

export function UserLoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = useMemo(() => createBrowserSupabaseClient(), [])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const accountCreated = searchParams.get('created') === '1'

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
      setError('Emailul sau parola nu sunt corecte.')
      return
    }

    router.push('/cont/setari')
    router.refresh()
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-10 px-5 py-12 md:grid-cols-[1.05fr_0.95fr] md:px-6 md:py-20">
        <section className="hidden md:block">
          <div className="max-w-xl">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-brand">
              Cont
            </p>
            <h1 className="mt-5 max-w-lg text-balance font-serif text-5xl leading-[1.05] text-foreground">
              Bun venit în spațiul tău de lectură.
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
              Intră în cont ca să îți păstrezi recenziile, setările și accesul la zona
              de administrare.
            </p>
          </div>
          <div className="mt-10 flex items-center gap-4 border-l border-brand/40 pl-5">
            <div className="relative h-16 w-16 overflow-hidden rounded-full border border-border bg-muted">
              <Image
                src="/images/author.jpg"
                alt="Albert-Beniamin Cucu"
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-serif text-xl text-foreground">Albert-Beniamin Cucu</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Eseuri, reflecții și dialog interior.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-sm sm:p-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">
            Autentificare
          </p>
          <h2 className="mt-3 font-serif text-4xl leading-tight text-foreground">
            Intră în cont
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Continuă cu emailul și parola contului tău.
          </p>
          {accountCreated ? (
            <p className="mt-5 rounded-lg border border-brand/30 bg-brand/10 px-4 py-3 text-sm text-foreground">
              Contul a fost creat. Intră în cont cu emailul și parola alese.
            </p>
          ) : null}

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <TextInput label="Email" type="email" value={email} onChange={setEmail} />
            <TextInput label="Parolă" type="password" value={password} onChange={setPassword} />
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
              {loading ? 'Se verifică...' : 'Intră în cont'}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Nu ai cont?{' '}
            <Link href="/cont/inregistrare" className="font-medium text-brand hover:underline">
              Creează unul
            </Link>
          </p>
        </section>
      </div>
    </main>
  )
}

function TextInput({
  label,
  type,
  value,
  onChange,
}: {
  label: string
  type: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <input
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-brand"
      />
    </label>
  )
}
