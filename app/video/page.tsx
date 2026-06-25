import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Play, ExternalLink, CalendarDays, Clock3 } from 'lucide-react'
import { getAllVideos, getFeaturedVideo, type VideoItem } from '@/lib/videos'

export const metadata: Metadata = {
  title: 'Video — Albert-Beniamin Cucu',
  description:
    'Emisiuni, interviuri și apariții video cu Albert-Beniamin Cucu despre teologie, slujire pastorală și viață spirituală.',
}

export const dynamic = 'force-dynamic'

export default async function VideoPage() {
  const allVideos = await getAllVideos()
  const featuredVideo = (await getFeaturedVideo()) ?? allVideos[0]
  const secondaryVideos = allVideos.filter((video) => video.slug !== featuredVideo?.slug)

  return (
    <main className="bg-background">
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[0.95fr_1.05fr] md:px-6 md:py-20">
          <div className="flex flex-col justify-center">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-brand">
              Video
            </p>
            <h1 className="mt-5 max-w-xl font-serif text-5xl leading-[1.05] text-foreground md:text-6xl">
              Emisiuni, interviuri și conversații.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Un spațiu dedicat aparițiilor video, dialogurilor publice și emisiunilor în care
              reflecția teologică se întâlnește cu întrebările comunității.
            </p>
          </div>

          {featuredVideo ? <FeaturedVideo video={featuredVideo} /> : null}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 md:px-6 md:py-20">
        <div className="flex flex-col gap-3 border-l-2 border-brand pl-5">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-brand">
            Arhivă video
          </p>
          <h2 className="font-serif text-3xl text-foreground md:text-4xl">
            Apariții recente
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {secondaryVideos.map((video) => (
            <VideoCard key={video.slug} video={video} />
          ))}
        </div>
      </section>
    </main>
  )
}

function FeaturedVideo({ video }: { video: VideoItem }) {
  return (
    <article className="overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all hover:border-brand/50 hover:bg-brand/5">
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
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground transition-colors hover:bg-foreground hover:text-background"
        >
          Vezi pagina episodului
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>
    </article>
  )
}

function VideoCard({ video }: { video: VideoItem }) {
  return (
    <article className="group overflow-hidden rounded-lg border border-border bg-card transition-all hover:-translate-y-1 hover:border-foreground/30 hover:bg-accent/30 hover:shadow-lg">
      <VideoFrame video={video} />
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
        <h3 className="mt-4 font-serif text-2xl leading-tight text-foreground">
          {video.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {video.description}
        </p>
        <Link
          href={`/video/${video.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand transition-colors hover:text-foreground hover:underline"
        >
          Vezi pagina episodului
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>
    </article>
  )
}

function VideoFrame({
  video,
  priority = false,
}: {
  video: VideoItem
  priority?: boolean
}) {
  if (video.embedUrl) {
    return <VideoLinkFrame video={video} priority={priority} />
  }

  return <VideoLinkFrame video={video} priority={priority} />
}

function VideoLinkFrame({
  video,
  priority = false,
}: {
  video: VideoItem
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
      <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-background/95 text-brand shadow-lg transition-all group-hover:scale-105 group-hover:bg-brand group-hover:text-brand-foreground">
        <Play className="ml-1 h-7 w-7 fill-current" />
      </div>
    </Link>
  )
}
