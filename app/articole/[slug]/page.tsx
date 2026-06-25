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
          <header className="bg-background px-5 pb-10 pt-28 text-center sm:px-6 md:pb-14 md:pt-32">
            <div className="mx-auto max-w-5xl">
              <p className="mx-auto w-fit border-b border-foreground pb-1 font-serif text-sm text-foreground">
                {article.category}
              </p>
              <h1 className="mx-auto mt-10 max-w-4xl text-balance font-serif text-4xl font-normal uppercase leading-[0.95] tracking-wide text-[#b91c1c] sm:text-5xl md:text-6xl lg:text-7xl">
                {article.title}
              </h1>
              <p className="mx-auto mt-5 max-w-3xl text-pretty font-serif text-2xl italic leading-tight text-[#c21f2f] sm:text-3xl md:text-4xl">
                {article.standfirst}
              </p>
              {article.image ? (
                <div className="relative mx-auto mt-8 aspect-[4/5] max-h-[880px] max-w-3xl overflow-hidden bg-muted">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 768px"
                    priority
                    className="object-cover"
                  />
                </div>
              ) : null}
              <div className="mx-auto mt-7 flex max-w-3xl flex-wrap justify-center gap-x-2 gap-y-1 text-xs uppercase tracking-wide text-muted-foreground sm:gap-x-3 sm:text-sm">
                <span className="font-medium text-foreground">{article.author}</span>
                <span aria-hidden>•</span>
                <span>{article.displayDate}</span>
                <span aria-hidden>•</span>
                <span>{article.readingTime}</span>
              </div>
              <div className="mx-auto mt-8 max-w-3xl text-left">
                <ArticleAudioPlayer
                  title={article.title}
                  text={`${article.standfirst}\n\n${article.content}`}
                  audioUrl={article.audioUrl}
                />
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-5xl px-5 py-12 md:py-16">
            {article.imageAlt ? (
              <p className="mx-auto mb-10 max-w-3xl text-center text-sm italic text-muted-foreground">
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
