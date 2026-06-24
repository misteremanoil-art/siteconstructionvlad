import type { Metadata } from 'next'
import { Search } from 'lucide-react'
import { ArticleCard } from '@/components/article-card'
import { searchArticles } from '@/lib/articles'

export const metadata: Metadata = {
  title: 'Căutare',
  description: 'Caută în articolele publicate pe blog.',
}

export const dynamic = 'force-dynamic'

type SearchPageProps = {
  searchParams: Promise<{
    q?: string | string[]
  }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const rawQuery = Array.isArray(params.q) ? params.q[0] : params.q
  const query = rawQuery?.trim() ?? ''
  const results = query ? await searchArticles(query) : []

  return (
    <main className="mx-auto max-w-5xl px-5 py-16 md:py-24">
      <header className="mb-12 max-w-2xl">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-brand">
          Căutare
        </p>
        <h1 className="text-balance font-serif text-4xl leading-tight md:text-5xl">
          {query ? `Rezultate pentru „${query}”` : 'Caută în articole'}
        </h1>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
          {query
            ? `${results.length} ${
                results.length === 1 ? 'articol găsit' : 'articole găsite'
              }.`
            : 'Scrie un cuvânt sau o expresie pentru a căuta în arhiva de articole.'}
        </p>
      </header>

      <form
        action="/cautare"
        className="mb-12 flex max-w-2xl items-center gap-3 rounded-full border border-border bg-card px-4 py-3"
      >
        <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
        <input
          type="search"
          name="q"
          defaultValue={query}
          placeholder="Caută după titlu, temă, tag..."
          aria-label="Caută articole"
          className="min-w-0 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Caută
        </button>
      </form>

      {query && results.length > 0 ? (
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : null}

      {query && results.length === 0 ? (
        <section className="max-w-2xl rounded-lg border border-border bg-card p-6">
          <h2 className="font-serif text-2xl">Niciun rezultat găsit</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Încearcă un termen mai scurt sau caută după o temă precum rugăciune,
            credință, teologie ori comuniune.
          </p>
        </section>
      ) : null}
    </main>
  )
}
