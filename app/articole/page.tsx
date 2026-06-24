import type { Metadata } from "next"
import { ArticleCard } from "@/components/article-card"
import { getAllArticles } from "@/lib/articles"

export const metadata: Metadata = {
  title: "Toate articolele — Aeon",
  description: "Eseuri și reflecții despre rugăciune, credință și viața interioară.",
}

export const dynamic = 'force-dynamic'

export default async function ArticolePage() {
  const articles = await getAllArticles()

  return (
    <main className="mx-auto max-w-5xl px-5 py-16 md:py-24">
      {/* Secțiunea de titlu a paginii */}
      <header className="mb-14 max-w-2xl">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">
          Arhivă
        </p>
        <h1 className="text-balance font-serif text-4xl leading-tight md:text-5xl">
          Toate articolele
        </h1>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
          O colecție de eseuri și reflecții despre rugăciune, credință și redescoperirea
          comuniunii personale cu Dumnezeu.
        </p>
      </header>

      {/* Grila cu articole */}
      <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </main>
  )
}
