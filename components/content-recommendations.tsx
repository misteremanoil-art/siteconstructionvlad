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
    })),
    ...videos.map((video) => ({
      kind: 'video' as const,
      title: video.title,
      description: video.description,
      href: `/video/${video.slug}`,
      meta: video.context || video.platform,
      slug: video.slug,
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
      className="surface-card group flex h-full flex-col p-5 transition-all hover:-translate-y-1 hover:border-brand/40 hover:bg-brand/5 hover:shadow-md"
    >
      <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
        <Icon className="h-4 w-4 text-brand" />
        <span>{kindLabels[item.kind]}</span>
        <span aria-hidden>•</span>
        <span>{item.meta}</span>
      </div>
      <h3 className="mt-4 font-serif text-2xl font-semibold leading-snug text-foreground transition-colors group-hover:text-brand">
        {item.title}
      </h3>
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
        {item.description}
      </p>
      <span className="mt-5 text-sm font-medium text-brand">
        Deschide materialul
      </span>
    </Link>
  )
}
