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
    return <main className="page-shell max-w-5xl">Se încarcă...</main>
  }

  if (!user) {
    return (
      <main className="page-shell max-w-2xl">
        <h1 className="page-title">Admin</h1>
        <p className="mt-4 text-muted-foreground">Trebuie să te autentifici.</p>
        <Link className="text-action mt-6" href="/admin/login">
          Intră în admin
        </Link>
      </main>
    )
  }

  return (
    <main className="page-shell max-w-5xl">
      <div className="flex flex-col gap-4 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="page-kicker">
            Admin
          </p>
          <h1 className="page-title mt-3 text-4xl">Articole</h1>
          <p className="mt-2 text-sm text-muted-foreground">{user.email}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/organizator"
            className="secondary-action"
          >
            Organizator
          </Link>
          <Link
            href="/admin/video"
            className="secondary-action"
          >
            Video
          </Link>
          <Link
            href="/admin/pdf"
            className="secondary-action"
          >
            PDF în articol
          </Link>
          <Link
            href="/admin/texte"
            className="secondary-action"
          >
            Texte site
          </Link>
          <Link
            href="/admin/articole/new"
            className="primary-action"
          >
            Articol nou
          </Link>
          <button
            type="button"
            onClick={signOut}
            className="secondary-action"
          >
            Ieși
          </button>
        </div>
      </div>

      {error ? <p className="mt-6 text-sm text-destructive">{error}</p> : null}

      <div className="mt-8 grid gap-3">
        {articles.map((article) => (
          <div
            key={article.id}
            className="surface-card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {article.status} • {article.display_date || article.published_at}
              </p>
              <h2 className="mt-1 font-serif text-2xl">{article.title}</h2>
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                /articole/{article.slug || 'fara-slug'}
              </p>
            </div>
            <div className="flex gap-3">
              {article.status === 'published' && article.slug ? (
                <Link
                  href={`/articole/${article.slug}`}
                  className="text-sm font-medium text-foreground hover:text-brand hover:underline"
                >
                  Vezi articolul
                </Link>
              ) : null}
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
