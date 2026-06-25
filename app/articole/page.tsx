import type { Metadata } from "next"
import Link from "next/link"
import { ArticleCard } from "@/components/article-card"
import { getAllArticles } from "@/lib/articles"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Toate articolele — Aeon",
  description: "Eseuri și reflecții despre rugăciune, credință și viața interioară.",
}

export const dynamic = 'force-dynamic'

type ArticolePageProps = {
  searchParams: Promise<{
    categorie?: string
  }>
}

function slugifyCategory(value: string) {
  return value
    .toLocaleLowerCase('ro-RO')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export default async function ArticolePage({ searchParams }: ArticolePageProps) {
  const params = await searchParams
  const articles = await getAllArticles()
  const categories = Array.from(new Set(articles.map((article) => article.category).filter(Boolean)))
  const activeCategory = params.categorie ?? ''
  const filteredArticles = activeCategory
    ? articles.filter((article) => slugifyCategory(article.category) === activeCategory)
    : articles
  const activeCategoryLabel =
    categories.find((category) => slugifyCategory(category) === activeCategory) ?? 'Toate'

  return (
    <main className="page-shell max-w-5xl">
      {/* Secțiunea de titlu a paginii */}
      <header className="mb-14 max-w-2xl">
        <p className="page-kicker mb-3">
          Arhivă
        </p>
        <h1 className="page-title">
          Toate articolele
        </h1>
        <p className="page-intro mt-4">
          O colecție de eseuri și reflecții despre rugăciune, credință și redescoperirea
          comuniunii personale cu Dumnezeu.
        </p>
      </header>

      <section className="mb-10" aria-label="Categorii articole">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="section-kicker">
              Categorii
            </p>
            <h2 className="section-title mt-2 text-2xl">
              {activeCategory ? activeCategoryLabel : 'Toate categoriile'}
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            {filteredArticles.length} {filteredArticles.length === 1 ? 'articol' : 'articole'}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href="/articole"
            className={cn(
              'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
              !activeCategory
                ? 'border-brand bg-brand text-brand-foreground'
                : 'border-border text-muted-foreground hover:border-brand/50 hover:text-brand',
            )}
          >
            Toate
          </Link>
          {categories.map((category) => {
            const categorySlug = slugifyCategory(category)
            const isActive = activeCategory === categorySlug

            return (
              <Link
                key={category}
                href={`/articole?categorie=${categorySlug}`}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'border-brand bg-brand text-brand-foreground'
                    : 'border-border text-muted-foreground hover:border-brand/50 hover:text-brand',
                )}
              >
                {category}
              </Link>
            )
          })}
        </div>
      </section>

      {/* Grila cu articole */}
      <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </main>
  )
}
