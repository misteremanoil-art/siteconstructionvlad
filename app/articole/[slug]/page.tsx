import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import { MDXRemote } from "next-mdx-remote/rsc"
import { ReadingProgress } from "@/components/reading-progress"
import { ShareRow } from "@/components/share-row"
import { ArticleReviews } from "@/components/article-reviews"
import { AuthorCard } from "@/components/author-card"
import { ArticleCard } from "@/components/article-card"
import { ArticleAudioPlayer } from "@/components/article-audio-player"
import { mdxComponents } from "@/components/mdx-components"
import { getArticle, getArticleSlugs, getAllArticles } from "@/lib/articles"

export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  return (await getArticleSlugs()).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)
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
  const article = await getArticle(slug)
  if (!article) notFound()

  const related = (await getAllArticles())
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3)

  return (
    <>
      <ReadingProgress />
      <main>
        <article>
          <header className="relative isolate flex min-h-screen items-end overflow-hidden bg-primary text-primary-foreground">
            {article.image ? (
              <Image
                src={article.image || "/placeholder.svg"}
                alt={article.imageAlt}
                fill
                sizes="100vw"
                priority
                className="absolute inset-0 -z-20 object-cover"
              />
            ) : null}
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/45 to-black/20" />
            <div className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-black/80 to-transparent" />

            <div className="mx-auto flex w-full max-w-6xl flex-col px-5 pb-10 pt-24 sm:px-6 md:pb-16 lg:pb-20">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-white/80">
                {article.category}
              </p>
              <h1 className="max-w-4xl text-balance font-serif text-3xl font-semibold leading-[1.05] text-white drop-shadow-sm sm:text-4xl md:text-6xl lg:text-7xl">
                {article.title}
              </h1>
              <p className="mt-5 max-w-3xl text-pretty font-serif text-lg italic leading-relaxed text-white/85 sm:text-xl md:text-2xl">
                {article.standfirst}
              </p>
              <ArticleAudioPlayer
                title={article.title}
                text={`${article.standfirst}\n\n${article.content}`}
                audioUrl={article.audioUrl}
              />
              <div className="mt-7 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-white/75 sm:gap-x-3 sm:text-sm">
                <span className="font-medium text-white">{article.author}</span>
                <span aria-hidden>•</span>
                <span>{article.displayDate}</span>
                <span aria-hidden>•</span>
                <span>{article.readingTime}</span>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-5xl px-5 py-12 md:py-16">
            {article.imageAlt ? (
              <p className="-mt-6 mb-10 text-sm italic text-muted-foreground md:-mt-10">
                {article.imageAlt}
              </p>
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

            <AuthorCard />
            <ShareRow title={article.title} />
            <ArticleReviews articleSlug={article.slug} />
          </div>
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
    </>
  )
}
