'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { User } from '@supabase/supabase-js'
import { createBrowserSupabaseClient } from '@/lib/supabase-browser'
import type { DatabaseArticle } from '@/lib/supabase'

export function AdminDashboard() {
  const router = useRouter()
  const supabase = createBrowserSupabaseClient()
  const [user, setUser] = useState<User | null>(null)
  const [articles, setArticles] = useState<DatabaseArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser()
      setUser(userData.user)

      if (!userData.user) {
        setLoading(false)
        return
      }

      const { data, error: articlesError } = await supabase
        .from('articles')
        .select('*')
        .order('published_at', { ascending: false })

      if (articlesError) {
        setError('Nu pot încărca articolele. Verifică RLS/admin_users.')
      } else {
        setArticles((data ?? []) as DatabaseArticle[])
      }

      setLoading(false)
    }

    load()
  }, [supabase])

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  async function deleteArticle(id: string) {
    if (!confirm('Ștergi acest articol?')) return

    const { error: deleteError } = await supabase.from('articles').delete().eq('id', id)
    if (deleteError) {
      setError('Nu am putut șterge articolul.')
      return
    }

    setArticles((current) => current.filter((article) => article.id !== id))
  }

  if (loading) {
    return <main className="mx-auto max-w-5xl px-5 py-16">Se încarcă...</main>
  }

  if (!user) {
    return (
      <main className="mx-auto max-w-2xl px-5 py-16">
        <h1 className="font-serif text-4xl">Admin</h1>
        <p className="mt-4 text-muted-foreground">Trebuie să te autentifici.</p>
        <Link className="mt-6 inline-flex text-brand hover:underline" href="/admin/login">
          Intră în admin
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-5xl px-5 py-16">
      <div className="flex flex-col gap-4 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">
            Admin
          </p>
          <h1 className="mt-3 font-serif text-4xl">Articole</h1>
          <p className="mt-2 text-sm text-muted-foreground">{user.email}</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/articole/new"
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground"
          >
            Articol nou
          </Link>
          <button
            type="button"
            onClick={signOut}
            className="rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground"
          >
            Ieși
          </button>
        </div>
      </div>

      {error ? <p className="mt-6 text-sm text-destructive">{error}</p> : null}

      <div className="mt-8 divide-y divide-border">
        {articles.map((article) => (
          <div
            key={article.id}
            className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {article.status} • {article.display_date || article.published_at}
              </p>
              <h2 className="mt-1 font-serif text-2xl">{article.title}</h2>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/admin/articole/${article.id}`}
                className="text-sm font-medium text-brand hover:underline"
              >
                Editează
              </Link>
              <button
                type="button"
                onClick={() => deleteArticle(article.id)}
                className="text-sm font-medium text-destructive hover:underline"
              >
                Șterge
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
