import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, Play } from 'lucide-react'
import { getAllArticles, getFeaturedArticle } from '@/lib/articles'
import { ArticleCard } from '@/components/article-card'
import { NewsletterCard } from '@/components/newsletter-card'
import { getAllVideos } from '@/lib/videos'

export const dynamic = 'force-dynamic'

const videoHoverStyles = [
  {
    card: 'hover:border-brand/60 hover:bg-brand/10',
    badge: 'group-hover:bg-brand group-hover:text-brand-foreground',
    play: 'group-hover:bg-brand group-hover:text-brand-foreground',
    title: 'group-hover:text-brand',
  },
  {
    card: 'hover:border-foreground/30 hover:bg-foreground/[0.04]',
    badge: 'group-hover:bg-foreground group-hover:text-background',
    play: 'group-hover:bg-foreground group-hover:text-background',
    title: 'group-hover:text-foreground',
  },
  {
    card: 'hover:border-muted-foreground/35 hover:bg-muted/70',
    badge: 'group-hover:bg-muted-foreground group-hover:text-background',
    play: 'group-hover:bg-muted-foreground group-hover:text-background',
    title: 'group-hover:text-muted-foreground',
  },
]

function stableIndex(value: string, length: number) {
  return [...value].reduce((sum, char) => sum + char.charCodeAt(0), 0) % length
}

export default async function HomePage() {
  const featured = await getFeaturedArticle()
  const articles = (await getAllArticles()).filter((a) => a.slug !== featured?.slug)
  const recentVideos = (await getAllVideos()).slice(0, 3)

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      {/* Featured article */}
      {featured && (
        <Link
          href={`/articole/${featured.slug}`}
          className="group grid overflow-hidden rounded-3xl border border-border bg-card transition-all hover:border-brand/50 hover:bg-accent/35 hover:shadow-lg md:grid-cols-2"
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
              <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground transition-colors group-hover:border-brand/40 group-hover:text-foreground">
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
        <div className="mb-6">
          <h2 className="font-serif text-2xl font-semibold text-foreground">
            Articole recente
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      {/* Recent videos grid */}
      <section className="mt-16" aria-label="Videoclipuri recente">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-foreground">
              Videoclipuri recente
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Emisiuni, interviuri și conversații publice despre credință, teologie și slujire.
            </p>
          </div>
          <Link
            href="/video"
            className="inline-flex w-fit items-center gap-2 text-sm font-medium text-brand hover:underline"
          >
            Vezi toate
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recentVideos.map((video) => {
            const hoverStyle = videoHoverStyles[stableIndex(video.slug, videoHoverStyles.length)]

            return (
              <Link
                key={video.slug}
                href={`/video/${video.slug}`}
                className={`group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg ${hoverStyle.card}`}
              >
              <div className="relative aspect-[16/10] overflow-hidden bg-[linear-gradient(135deg,var(--foreground),var(--brand))]">
                {video.thumbnailUrl ? (
                  <Image
                    src={video.thumbnailUrl}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : null}
                <div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/15" />
                <span className={`absolute left-3 top-3 rounded-full bg-background/85 px-3 py-1 text-xs font-medium text-foreground backdrop-blur transition-colors ${hoverStyle.badge}`}>
                  {video.context}
                </span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`flex h-14 w-14 items-center justify-center rounded-full bg-background/95 text-brand shadow-lg transition-all group-hover:scale-105 ${hoverStyle.play}`}>
                    <Play className="ml-1 h-6 w-6 fill-current" />
                  </span>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {video.platform} • {video.date} {video.duration ? `• ${video.duration}` : ''}
                </p>
                <h3 className={`font-serif text-xl font-semibold leading-snug text-foreground text-balance transition-colors ${hoverStyle.title}`}>
                  {video.title}
                </h3>
                <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {video.description}
                </p>
              </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Newsletter */}
      <div className="mt-16">
        <NewsletterCard />
      </div>
    </main>
  )
}
