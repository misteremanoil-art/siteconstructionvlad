import Image from 'next/image'
import Link from 'next/link'
import { BookOpen, Headphones, PlayCircle } from 'lucide-react'
import { getAllArticles } from '@/lib/articles'
import { conversations } from '@/lib/conversations'
import { getAllVideos } from '@/lib/videos'

type RecommendationKind = 'article' | 'video' | 'audio'

type ContentRecommendation = {
  kind: RecommendationKind
  title: string
  description: string
  href: string
  meta: string
  slug: string
  image?: string
  imageAlt?: string
}

const kindLabels: Record<RecommendationKind, string> = {
  article: 'Articol',
  video: 'Video',
  audio: 'Audio',
}

const kindIcons = {
  article: BookOpen,
  video: PlayCircle,
  audio: Headphones,
}

export async function ContentRecommendations({
  currentType,
  currentSlug,
}: {
  currentType?: RecommendationKind
  currentSlug?: string
}) {
  const [articles, videos] = await Promise.all([getAllArticles(), getAllVideos()])

  const recommendations: ContentRecommendation[] = [
    ...articles.map((article) => ({
      kind: 'article' as const,
      title: article.title,
      description: article.standfirst,
      href: `/articole/${article.slug}`,
      meta: article.displayDate || article.category,
      slug: article.slug,
      image: article.image,
      imageAlt: article.imageAlt || article.title,
    })),
    ...videos.map((video) => ({
      kind: 'video' as const,
      title: video.title,
      description: video.description,
      href: `/video/${video.slug}`,
      meta: video.context || video.platform,
      slug: video.slug,
      image: video.thumbnailUrl,
      imageAlt: video.title,
    })),
    ...conversations.map((conversation) => ({
      kind: 'audio' as const,
      title: conversation.title,
      description: conversation.description,
      href: `/conversatii#${conversation.slug}`,
      meta: conversation.show,
      slug: conversation.slug,
    })),
  ]
    .filter((item) => item.kind !== currentType || item.slug !== currentSlug)
    .slice(0, 6)

  if (!recommendations.length) return null

  return (
    <section className="border-t border-border bg-accent/40">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6">
        <div className="section-header">
          <div>
            <p className="section-kicker">Recomandate</p>
            <h2 className="section-title">Continuă cu alte materiale</h2>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((item) => (
            <RecommendationCard key={`${item.kind}-${item.slug}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

function RecommendationCard({ item }: { item: ContentRecommendation }) {
  const Icon = kindIcons[item.kind]

  return (
    <Link
      href={item.href}
      className="surface-card group flex h-full flex-col overflow-hidden transition-all hover:-translate-y-1 hover:border-brand/40 hover:bg-brand/5 hover:shadow-md"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[linear-gradient(135deg,var(--foreground),var(--brand))]">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.imageAlt ?? ''}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background/90 text-brand shadow-lg">
              <Icon className="h-8 w-8" />
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/10" />
        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground shadow-sm">
          <Icon className="h-3.5 w-3.5 text-brand" />
          {kindLabels[item.kind]}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {item.meta}
        </p>
        <h3 className="mt-3 font-serif text-2xl font-semibold leading-snug text-foreground transition-colors group-hover:text-brand">
          {item.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>
        <span className="mt-auto pt-5 text-sm font-medium text-brand">
          Deschide materialul
        </span>
      </div>
    </Link>
  )
}
