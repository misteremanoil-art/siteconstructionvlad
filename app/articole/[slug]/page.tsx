import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { MDXRemote } from "next-mdx-remote/rsc"
import { ArrowLeft } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ReadingProgress } from "@/components/reading-progress"
import { ShareRow } from "@/components/share-row"
import { AuthorCard } from "@/components/author-card"
import { ArticleCard } from "@/components/article-card"
import { BackToTop } from "@/components/back-to-top"
import { mdxComponents } from "@/components/mdx-components"
import { getArticle, getArticleSlugs, getAllArticles } from "@/lib/articles"

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return { title: "Articol negăsit — Aeon" }

  return {
    title: `${article.title} — Aeon`,
    description: article.standfirst,
    openGraph: {
      title: article.title,
      description: article.standfirst,
      images: article.image ? [{ url: article.image }] : undefined,
      type: "article",
    },
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  const related = getAllArticles()
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3)

  return (
    <>
      <ReadingProgress />
      <SiteHeader />
      <main>
        <article className="mx-auto max-w-3xl px-5 py-12 md:py-20">
          <Link
            href="/articole"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Toate articolele
          </Link>

          <header className="mb-10">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-brand">
              {article.category}
            </p>
            <h1 className="text-balance font-serif text-4xl leading-[1.1] md:text-5xl">
              {article.title}
            </h1>
            <p className="mt-5 text-pretty font-serif text-xl italic leading-relaxed text-muted-foreground">
              {article.standfirst}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{article.author}</span>
              <span aria-hidden>•</span>
              <span>{article.displayDate}</span>
              <span aria-hidden>•</span>
              <span>{article.readingTime}</span>
            </div>
          </header>

          {article.image ? (
            <figure className="mb-12 overflow-hidden rounded-2xl">
              <Image
                src={article.image || "/placeholder.svg"}
                alt={article.imageAlt}
                width={1200}
                height={750}
                priority
                className="aspect-[16/10] w-full object-cover"
              />
            </figure>
          ) : null}

          <div className="prose-essay">
            <MDXRemote source={article.content} components={mdxComponents} />
          </div>

          <div className="mt-12 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          <ShareRow title={article.title} />
          <AuthorCard />
        </article>

        {related.length > 0 ? (
          <section className="border-t border-border bg-accent/40">
            <div className="mx-auto max-w-5xl px-5 py-16">
              <h2 className="mb-8 font-serif text-3xl">Continuă lectura</h2>
              <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <SiteFooter />
      <BackToTop />
    </>
  )
}
