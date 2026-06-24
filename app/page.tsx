import Link from 'next/link'
import Image from 'next/image'
import { getAllArticles, getFeaturedArticle } from '@/lib/articles'
import { ArticleCard } from '@/components/article-card'
import { NewsletterCard } from '@/components/newsletter-card'

export default function HomePage() {
  const featured = getFeaturedArticle()
  const articles = getAllArticles().filter((a) => a.slug !== featured?.slug)

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      {/* Featured article */}
      {featured && (
        <Link
          href={`/articole/${featured.slug}`}
          className="group grid overflow-hidden rounded-3xl border border-border bg-card md:grid-cols-2"
        >
          <div className="relative aspect-[16/11] md:aspect-auto">
            <Image
              src={featured.image || '/placeholder.svg'}
              alt={featured.imageAlt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center gap-4 p-8 sm:p-12">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                Articol principal
              </span>
              <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                {featured.category}
              </span>
            </div>
            <h1 className="font-serif text-3xl font-semibold leading-tight text-foreground text-balance sm:text-4xl group-hover:text-brand">
              {featured.title}
            </h1>
            <p className="leading-relaxed text-muted-foreground">
              {featured.standfirst}
            </p>
            <p className="mt-2 flex flex-wrap gap-x-3 text-xs uppercase tracking-wide text-muted-foreground">
              <span>{featured.author}</span>
              <span>{featured.displayDate}</span>
              <span>{featured.readingTime}</span>
            </p>
          </div>
        </Link>
      )}

      {/* Recent articles grid */}
      <section className="mt-16" aria-label="Articole recente">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-serif text-2xl font-semibold text-foreground">
            Articole recente
          </h2>
          <Link
            href="/articole"
            className="text-sm font-medium text-brand hover:underline"
          >
            Toate articolele →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <div className="mt-16">
        <NewsletterCard />
      </div>
    </main>
  )
}
