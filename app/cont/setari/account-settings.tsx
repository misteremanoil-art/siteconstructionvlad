'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'
import { createBrowserSupabaseClient } from '@/lib/supabase-browser'

type UserReview = {
  id: string
  article_slug: string
  rating: number
  body: string
  created_at: string
  articles?: {
    title?: string
  } | null
}

export function AccountSettings() {
  const router = useRouter()
  const supabase = useMemo(() => createBrowserSupabaseClient(), [])
  const [user, setUser] = useState<User | null>(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [reviews, setReviews] = useState<UserReview[]>([])
  const [editingId, setEditingId] = useState('')
  const [editingBody, setEditingBody] = useState('')
  const [editingRating, setEditingRating] = useState(5)
  const [isAdmin, setIsAdmin] = useState(false)
  const [adminEmail, setAdminEmail] = useState('')
  const [promotingAdmin, setPromotingAdmin] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadAccount() {
      const { data: userData } = await supabase.auth.getUser()
      setUser(userData.user)

      if (!userData.user) {
        setLoading(false)
        return
      }

      await ensureProfile(userData.user.id)
      await Promise.all([
        loadProfile(userData.user.id),
        loadReviews(userData.user.id),
        loadAdminStatus(),
      ])
      setLoading(false)
    }

    loadAccount()
  }, [supabase])

  async function ensureProfile(userId: string) {
    await supabase.rpc('ensure_my_profile')
  }

  async function loadProfile(userId: string) {
    const { data } = await supabase
      .from('profiles')
      .select('username')
      .eq('id', userId)
      .maybeSingle()

    setUsername((data?.username as string | null) ?? '')
  }

  async function loadAdminStatus() {
    const { data: rpcAdmin } = await supabase.rpc('is_admin')
    setIsAdmin(Boolean(rpcAdmin))
  }

  async function loadReviews(userId: string) {
    const { data } = await supabase
      .from('article_reviews')
      .select('id, article_slug, rating, body, created_at, articles(title)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    setReviews((data ?? []) as UserReview[])
  }

  async function saveUsername(e: React.FormEvent) {
    e.preventDefault()
    if (!user) return
    setMessage('')
    setError('')

    const { data, error: updateError } = await supabase
      .rpc('set_my_username', { new_username: username.trim() || null })

    if (updateError) {
      setError('Nu am putut salva username-ul. Folosește 3-32 caractere: litere, cifre sau _.')
      return
    }

    setUsername(((data as { username?: string | null } | null)?.username ?? '').trim())
    setMessage('Username salvat.')
    router.refresh()
  }

  async function changePassword(e: React.FormEvent) {
    e.preventDefault()
    setMessage('')
    setError('')

    if (password.length < 6) {
      setError('Parola trebuie să aibă cel puțin 6 caractere.')
      return
    }

    const { error: updateError } = await supabase.auth.updateUser({ password })

    if (updateError) {
      setError('Nu am putut schimba parola.')
      return
    }

    setPassword('')
    setMessage('Parola a fost schimbată.')
  }

  function startEdit(review: UserReview) {
    setEditingId(review.id)
    setEditingBody(review.body)
    setEditingRating(review.rating)
  }

  async function saveReview(reviewId: string) {
    setMessage('')
    setError('')

    const { error: updateError } = await supabase
      .from('article_reviews')
      .update({ rating: editingRating, body: editingBody.trim() })
      .eq('id', reviewId)

    if (updateError) {
      setError('Nu am putut salva recenzia.')
      return
    }

    setEditingId('')
    if (user) await loadReviews(user.id)
  }

  async function deleteReview(reviewId: string) {
    if (!confirm('Ștergi această recenzie?')) return

    const { error: deleteError } = await supabase
      .from('article_reviews')
      .delete()
      .eq('id', reviewId)

    if (deleteError) {
      setError('Nu am putut șterge recenzia.')
      return
    }

    setReviews((current) => current.filter((review) => review.id !== reviewId))
  }

  async function promoteUserToAdmin(e: React.FormEvent) {
    e.preventDefault()
    setMessage('')
    setError('')

    const email = adminEmail.trim().toLowerCase()

    if (!email) {
      setError('Scrie emailul utilizatorului pe care vrei să îl faci admin.')
      return
    }

    setPromotingAdmin(true)
    const { error: promoteError } = await supabase.rpc('promote_user_to_admin', {
      target_email: email,
    })
    setPromotingAdmin(false)

    if (promoteError) {
      const details = `${promoteError.message ?? ''} ${promoteError.details ?? ''}`.toLowerCase()

      if (details.includes('not authorized')) {
        setError('Doar un cont admin poate promova alt utilizator.')
      } else if (details.includes('user not found')) {
        setError('Nu am găsit niciun cont cu acest email. Utilizatorul trebuie să își creeze contul mai întâi.')
      } else {
        setError(promoteError.message || 'Nu am putut face utilizatorul admin.')
      }
      return
    }

    setAdminEmail('')
    setMessage(`${email} are acum acces de admin.`)
  }

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  if (loading) {
    return <main className="mx-auto max-w-4xl px-5 py-16">Se încarcă...</main>
  }

  if (!user) {
    return (
      <main className="mx-auto max-w-2xl px-5 py-16">
        <h1 className="font-serif text-4xl">Setări cont</h1>
        <p className="mt-4 text-muted-foreground">Trebuie să intri în cont.</p>
        <Link href="/cont/login" className="mt-6 inline-flex text-brand hover:underline">
          Autentificare
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-4xl px-5 py-16">
      <div className="flex flex-col gap-4 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">
            Contul meu
          </p>
          <h1 className="mt-3 font-serif text-4xl">Setări</h1>
          <p className="mt-2 text-sm text-muted-foreground">{user.email}</p>
        </div>
        <button
          type="button"
          onClick={signOut}
          className="w-fit rounded-full border border-border px-5 py-2.5 text-sm font-medium"
        >
          Ieși din cont
        </button>
      </div>

      {message ? <p className="mt-6 text-sm text-brand">{message}</p> : null}
      {error ? <p className="mt-6 text-sm text-destructive">{error}</p> : null}

      <section className="mt-10 grid gap-8 md:grid-cols-2">
        <form onSubmit={saveUsername} className="rounded-lg border border-border p-5">
          <h2 className="font-serif text-2xl">Username</h2>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            className="mt-4 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand"
          />
          <button className="mt-4 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground">
            Salvează username
          </button>
        </form>

        <form onSubmit={changePassword} className="rounded-lg border border-border p-5">
          <h2 className="font-serif text-2xl">Parolă</h2>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Parolă nouă"
            className="mt-4 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand"
          />
          <button className="mt-4 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground">
            Schimbă parola
          </button>
        </form>
      </section>

      {isAdmin ? (
        <section className="mt-10 rounded-lg border border-brand/30 bg-accent/40 p-5">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">
            Admin
          </p>
          <h2 className="mt-2 font-serif text-2xl">Panou admin</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Contul tău are acces de admin. Poți edita articolele, crea articole noi și administra
            conținutul publicat.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/admin"
              className="rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground"
            >
              Editează articole
            </Link>
            <Link
              href="/admin/articole/new"
              className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground"
            >
              Articol nou
            </Link>
            <Link
              href="/admin/video"
              className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground"
            >
              Gestionează video
            </Link>
            <Link
              href="/admin/texte"
              className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground"
            >
              Texte site
            </Link>
          </div>

          <form
            onSubmit={promoteUserToAdmin}
            className="mt-6 border-t border-border/70 pt-6"
          >
            <label htmlFor="admin-email" className="text-sm font-medium text-foreground">
              Fă alt utilizator admin
            </label>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <input
                id="admin-email"
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="email@exemplu.ro"
                className="min-w-0 flex-1 rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand"
              />
              <button
                type="submit"
                disabled={promotingAdmin}
                className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background disabled:cursor-not-allowed disabled:opacity-60"
              >
                {promotingAdmin ? 'Se salvează...' : 'Fă admin'}
              </button>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Utilizatorul trebuie să aibă deja cont creat pe site.
            </p>
          </form>
        </section>
      ) : null}

      <section className="mt-12">
        <h2 className="font-serif text-3xl">Recenziile mele</h2>
        <div className="mt-5 divide-y divide-border">
          {reviews.length === 0 ? (
            <p className="py-6 text-muted-foreground">Nu ai lăsat încă recenzii.</p>
          ) : null}
          {reviews.map((review) => (
            <article key={review.id} className="py-6">
              <Link
                href={`/articole/${review.article_slug}`}
                className="font-serif text-xl hover:text-brand"
              >
                {review.articles?.title ?? review.article_slug}
              </Link>
              {editingId === review.id ? (
                <div className="mt-4 space-y-3">
                  <RatingSelect value={editingRating} onChange={setEditingRating} />
                  <textarea
                    value={editingBody}
                    onChange={(e) => setEditingBody(e.target.value)}
                    rows={4}
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand"
                  />
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => saveReview(review.id)}
                      className="rounded-full bg-brand px-4 py-2 text-sm font-medium text-brand-foreground"
                    >
                      Salvează
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId('')}
                      className="rounded-full border border-border px-4 py-2 text-sm font-medium"
                    >
                      Anulează
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="mt-2 text-sm text-brand">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{review.body}</p>
                  <div className="mt-4 flex gap-4 text-sm">
                    <button type="button" onClick={() => startEdit(review)} className="text-brand hover:underline">
                      Editează
                    </button>
                    <button type="button" onClick={() => deleteReview(review.id)} className="text-destructive hover:underline">
                      Șterge
                    </button>
                  </div>
                </>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

function RatingSelect({
  value,
  onChange,
}: {
  value: number
  onChange: (value: number) => void
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="rounded-lg border border-border bg-background px-3 py-2 text-sm"
    >
      {[5, 4, 3, 2, 1].map((rating) => (
        <option key={rating} value={rating}>
          {rating} stele
        </option>
      ))}
    </select>
  )
}
