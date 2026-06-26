import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Play, ExternalLink, CalendarDays, Clock3 } from 'lucide-react'
import { getAllVideos, getFeaturedVideo, type VideoItem } from '@/lib/videos'
import { getSiteTexts } from '@/lib/site-texts'

export const metadata: Metadata = {
  title: 'Video — Albert-Beniamin Cucu',
  description:
    'Emisiuni, interviuri și apariții video cu Albert-Beniamin Cucu despre teologie, slujire pastorală și viață spirituală.',
}

export const dynamic = 'force-dynamic'

const videoHoverStyles = [
  {
    card: 'hover:border-brand/60 hover:bg-brand/10',
    play: 'group-hover:bg-brand group-hover:text-brand-foreground',
    title: 'group-hover:text-brand',
  },
  {
    card: 'hover:border-foreground/30 hover:bg-foreground/[0.04]',
    play: 'group-hover:bg-foreground group-hover:text-background',
    title: 'group-hover:text-foreground',
  },
  {
    card: 'hover:border-muted-foreground/35 hover:bg-muted/70',
    play: 'group-hover:bg-muted-foreground group-hover:text-background',
    title: 'group-hover:text-muted-foreground',
  },
]

function stableIndex(value: string, length: number) {
  return [...value].reduce((sum, char) => sum + char.charCodeAt(0), 0) % length
}

export default async function VideoPage() {
  const allVideos = await getAllVideos()
  const featuredVideo = (await getFeaturedVideo()) ?? allVideos[0]
  const secondaryVideos = allVideos.filter((video) => video.slug !== featuredVideo?.slug)
  const texts = await getSiteTexts([
    'video.kicker',
    'video.title',
    'video.description',
    'video.archive_title',
    'video.archive_kicker',
    'video.featured_button',
    'video.card_button',
  ])

  return (
    <main className="bg-background">
      <section className="border-b border-border">
        <div className="page-shell grid gap-10 md:grid-cols-[0.95fr_1.05fr]">
          <div className="flex flex-col justify-center">
            <p className="page-kicker">
              {texts['video.kicker']}
            </p>
            <h1 className="page-title mt-5 max-w-xl">
              {texts['video.title']}
            </h1>
            <p className="page-intro mt-6 max-w-lg">
              {texts['video.description']}
            </p>
          </div>

          {featuredVideo ? (
            <FeaturedVideo video={featuredVideo} buttonLabel={texts['video.featured_button']} />
          ) : null}
        </div>
      </section>

      <section className="page-shell">
        <div className="section-header">
          <div>
            <p className="section-kicker">
              {texts['video.archive_kicker']}
            </p>
            <h2 className="section-title">
              {texts['video.archive_title']}
            </h2>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {secondaryVideos.map((video) => (
            <VideoCard key={video.slug} video={video} buttonLabel={texts['video.card_button']} />
          ))}
        </div>
      </section>
    </main>
  )
}

function FeaturedVideo({ video, buttonLabel }: { video: VideoItem; buttonLabel: string }) {
  return (
    <article className="surface-card overflow-hidden transition-all hover:border-brand/50 hover:bg-brand/5">
      <VideoFrame video={video} priority />
      <div className="p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">
          <span className="text-brand">{video.context}</span>
          <span>{video.platform}</span>
          <span>{video.date}</span>
        </div>
        <h2 className="mt-4 font-serif text-3xl leading-tight text-foreground">
          {video.title}
        </h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          {video.description}
        </p>
        <Link
          href={`/video/${video.slug}`}
          className="primary-action mt-6"
        >
          {buttonLabel}
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>
    </article>
  )
}

function VideoCard({ video, buttonLabel }: { video: VideoItem; buttonLabel: string }) {
  const hoverStyle = videoHoverStyles[stableIndex(video.slug, videoHoverStyles.length)]

  return (
    <article className={`surface-card group overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg ${hoverStyle.card}`}>
      <VideoFrame video={video} playClassName={hoverStyle.play} />
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />
            {video.date}
          </span>
          {video.duration ? (
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-3.5 w-3.5" />
              {video.duration}
            </span>
          ) : null}
        </div>
        <h3 className={`mt-4 font-serif text-2xl leading-tight text-foreground transition-colors ${hoverStyle.title}`}>
          {video.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {video.description}
        </p>
        <Link
          href={`/video/${video.slug}`}
          className="text-action mt-5"
        >
          {buttonLabel}
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>
    </article>
  )
}

function VideoFrame({
  video,
  playClassName,
  priority = false,
}: {
  video: VideoItem
  playClassName?: string
  priority?: boolean
}) {
  if (video.embedUrl) {
    return <VideoLinkFrame video={video} playClassName={playClassName} priority={priority} />
  }

  return <VideoLinkFrame video={video} playClassName={playClassName} priority={priority} />
}

function VideoLinkFrame({
  video,
  playClassName,
  priority = false,
}: {
  video: VideoItem
  playClassName?: string
  priority?: boolean
}) {
  return (
    <Link
      href={`/video/${video.slug}`}
      className="group relative flex aspect-video w-full items-center justify-center overflow-hidden bg-[linear-gradient(135deg,var(--foreground),var(--brand))]"
    >
      {video.thumbnailUrl ? (
        <Image
          src={video.thumbnailUrl}
          alt=""
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : null}
      <div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/15" />
      <div className={`relative flex h-16 w-16 items-center justify-center rounded-full bg-background/95 text-brand shadow-lg transition-all group-hover:scale-105 ${playClassName ?? 'group-hover:bg-brand group-hover:text-brand-foreground'}`}>
        <Play className="ml-1 h-7 w-7 fill-current" />
      </div>
    </Link>
  )
}
