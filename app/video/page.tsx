import type { Metadata } from 'next'
import Link from 'next/link'
import { Play, ExternalLink, CalendarDays, Clock3 } from 'lucide-react'
import { videos } from '@/lib/videos'

export const metadata: Metadata = {
  title: 'Video — Albert-Beniamin Cucu',
  description:
    'Emisiuni, interviuri și apariții video cu Albert-Beniamin Cucu despre teologie, slujire pastorală și viață spirituală.',
}

const featuredVideo = videos.find((video) => video.featured) ?? videos[0]
const secondaryVideos = videos.filter((video) => video !== featuredVideo)

export default function VideoPage() {
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

          <FeaturedVideo />
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
            <VideoCard key={video.title} video={video} />
          ))}
        </div>
      </section>
    </main>
  )
}

function FeaturedVideo() {
  return (
    <article className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <VideoFrame video={featuredVideo} priority />
      <div className="p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">
          <span className="text-brand">{featuredVideo.context}</span>
          <span>{featuredVideo.platform}</span>
          <span>{featuredVideo.date}</span>
        </div>
        <h2 className="mt-4 font-serif text-3xl leading-tight text-foreground">
          {featuredVideo.title}
        </h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          {featuredVideo.description}
        </p>
        <Link
          href={featuredVideo.href}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90"
        >
          Urmărește clipul
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>
    </article>
  )
}

function VideoCard({ video }: { video: (typeof videos)[number] }) {
  return (
    <article className="overflow-hidden rounded-lg border border-border bg-card">
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
          href={video.href}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline"
        >
          Deschide video
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
  video: (typeof videos)[number]
  priority?: boolean
}) {
  if (video.embedUrl) {
    return (
      <iframe
        src={video.embedUrl}
        title={video.title}
        loading={priority ? 'eager' : 'lazy'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="aspect-video w-full bg-muted"
      />
    )
  }

  return (
    <Link
      href={video.href}
      target="_blank"
      rel="noreferrer"
      className="group relative flex aspect-video w-full items-center justify-center overflow-hidden bg-[linear-gradient(135deg,var(--foreground),var(--brand))]"
    >
      <div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/15" />
      <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-background/95 text-brand shadow-lg transition-transform group-hover:scale-105">
        <Play className="ml-1 h-7 w-7 fill-current" />
      </div>
    </Link>
  )
}
