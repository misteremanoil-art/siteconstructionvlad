'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import type { User } from '@supabase/supabase-js'
import { createBrowserSupabaseClient } from '@/lib/supabase-browser'

type Review = {
  id: string
  article_slug: string
  user_id: string
  rating: number
  body: string
  created_at: string
  updated_at: string
  profiles?: {
    username?: string | null
  } | null
}

export function ArticleReviews({ articleSlug }: { articleSlug: string }) {
  const supabase = useMemo(() => createBrowserSupabaseClient(), [])
  const [user, setUser] = useState<User | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [rating, setRating] = useState(5)
  const [body, setBody] = useState('')
  const [editingId, setEditingId] = useState('')
  const [editingBody, setEditingBody] = useState('')
  const [editingRating, setEditingRating] = useState(5)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser()
      setUser(userData.user)
      await loadReviews()
      setLoading(false)
    }

    load()
  }, [supabase])

  async function loadReviews() {
    const { data } = await supabase
      .from('article_reviews')
      .select('id, article_slug, user_id, rating, body, created_at, updated_at, profiles(username)')
      .eq('article_slug', articleSlug)
      .order('created_at', { ascending: false })

    setReviews((data ?? []) as Review[])
  }

  async function ensureProfile(userId: string) {
    await supabase.rpc('ensure_my_profile')
  }

  async function submitReview(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!user) return
    if (body.trim().length < 3) {
      setError('Scrie cel puțin câteva cuvinte.')
      return
    }

    await ensureProfile(user.id)

    const { error: insertError } = await supabase.from('article_reviews').upsert(
      {
        article_slug: articleSlug,
        user_id: user.id,
        rating,
        body: body.trim(),
      },
      { onConflict: 'article_slug,user_id' },
    )

    if (insertError) {
      setError('Nu am putut salva recenzia.')
      return
    }

    setBody('')
    setRating(5)
    await loadReviews()
  }

  function startEdit(review: Review) {
    setEditingId(review.id)
    setEditingBody(review.body)
    setEditingRating(review.rating)
  }

  async function saveEdit(reviewId: string) {
    setError('')

    const { error: updateError } = await supabase
      .from('article_reviews')
      .update({ rating: editingRating, body: editingBody.trim() })
      .eq('id', reviewId)

    if (updateError) {
      setError('Nu am putut edita recenzia.')
      return
    }

    setEditingId('')
    await loadReviews()
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

  if (loading) {
    return null
  }

  return (
    <section className="my-14 border-y border-border py-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">
            Recenzii
          </p>
          <h2 className="mt-2 font-serif text-3xl">Ce spun cititorii</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          {reviews.length} {reviews.length === 1 ? 'recenzie' : 'recenzii'}
        </p>
      </div>

      {user ? (
        <form onSubmit={submitReview} className="mt-6 rounded-lg border border-border p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <RatingSelect value={rating} onChange={setRating} />
            <p className="text-sm text-muted-foreground">
              Recenzia ta poate fi editată din setările contului.
            </p>
          </div>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={4}
            placeholder="Scrie o recenzie..."
            className="mt-4 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand"
          />
          {error ? <p className="mt-3 text-sm text-destructive">{error}</p> : null}
          <button
            type="submit"
            className="mt-4 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground"
          >
            Publică recenzia
          </button>
        </form>
      ) : (
        <p className="mt-6 rounded-lg border border-border p-4 text-sm text-muted-foreground">
          Pentru a lăsa o recenzie,{' '}
          <Link href="/cont/login" className="text-brand hover:underline">
            intră în cont
          </Link>{' '}
          sau{' '}
          <Link href="/cont/inregistrare" className="text-brand hover:underline">
            creează un cont
          </Link>
          .
        </p>
      )}

      <div className="mt-6 divide-y divide-border">
        {reviews.map((review) => {
          const isOwner = user?.id === review.user_id

          return (
            <article key={review.id} className="py-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-foreground">
                    {review.profiles?.username || 'Cititor'}
                  </p>
                  <p className="mt-1 text-sm text-brand">
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </p>
                </div>
                {isOwner ? (
                  <div className="flex gap-3 text-sm">
                    <button
                      type="button"
                      onClick={() => startEdit(review)}
                      className="text-brand hover:underline"
                    >
                      Editează
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteReview(review.id)}
                      className="text-destructive hover:underline"
                    >
                      Șterge
                    </button>
                  </div>
                ) : null}
              </div>

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
                      onClick={() => saveEdit(review.id)}
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
                <p className="mt-3 leading-relaxed text-muted-foreground">{review.body}</p>
              )}
            </article>
          )
        })}
      </div>
    </section>
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
