import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ArticleCard } from "@/components/article-card"
import { BackToTop } from "@/components/back-to-top"
import { getAllArticles } from "@/lib/articles"

export const metadata: Metadata = {
  title: "Toate articolele — Aeon",
  description: "Eseuri și reflecții despre rugăciune, credință și viața interioară.",
}

export default function ArticolePage() {
  const articles = getAllArticles()

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-5 py-16 md:py-24">
        <header className="mb-14 max-w-2xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">Arhivă</p>
          <h1 className="text-balance font-serif text-4xl leading-tight md:text-5xl">
            Toate articolele
          </h1>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            O colecție de eseuri și reflecții despre rugăciune, credință și redescoperirea
            comuniunii personale cu Dumnezeu.
          </p>
        </header>

        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </main>
      <SiteFooter />
      <BackToTop />
    </>
  )
}
