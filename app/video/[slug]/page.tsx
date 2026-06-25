import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, CalendarDays, Clock3, ExternalLink } from 'lucide-react'
import { VideoReviews } from '@/components/video-reviews'
import { getVideoBySlug, videos } from '@/lib/videos'

type VideoDetailPageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return videos.map((video) => ({
    slug: video.slug,
  }))
}

export async function generateMetadata({
  params,
}: VideoDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const video = getVideoBySlug(slug)

  if (!video) {
    return {
      title: 'Video',
    }
  }

  return {
    title: `${video.title} — Video`,
    description: video.description,
  }
}

export default async function VideoDetailPage({ params }: VideoDetailPageProps) {
  const { slug } = await params
  const video = getVideoBySlug(slug)

  if (!video) notFound()

  return (
    <main className="bg-background">
      <article>
        <section className="border-b border-border">
          <div className="mx-auto max-w-5xl px-5 py-10 md:px-6 md:py-14">
            <Link
              href="/video"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Înapoi la video
            </Link>

            <div className="mt-8">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-brand">
                {video.context}
              </p>
              <h1 className="mt-4 max-w-4xl font-serif text-4xl leading-tight text-foreground md:text-6xl">
                {video.title}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
                {video.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  {video.date}
                </span>
                {video.duration ? (
                  <span className="inline-flex items-center gap-2">
                    <Clock3 className="h-4 w-4" />
                    {video.duration}
                  </span>
                ) : null}
                <span>{video.platform}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-5 py-10 md:px-6 md:py-14">
          {video.embedUrl ? (
            <iframe
              src={video.embedUrl}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="aspect-video w-full rounded-lg border border-border bg-muted shadow-sm"
            />
          ) : (
            <Link
              href={video.href}
              target="_blank"
              rel="noreferrer"
              className="flex aspect-video w-full items-center justify-center rounded-lg border border-border bg-muted text-sm font-medium text-brand"
            >
              Deschide clipul
            </Link>
          )}

          <div className="mt-8 grid gap-6 border-y border-border py-6 text-sm text-muted-foreground md:grid-cols-3">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand">
                Emisiune
              </p>
              <p className="mt-2 text-foreground">{video.duration || video.context}</p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand">
                Platformă
              </p>
              <p className="mt-2 text-foreground">{video.platform}</p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand">
                Sursă
              </p>
              <Link
                href={video.href}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-foreground hover:text-brand"
              >
                Deschide sursa
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <VideoReviews videoSlug={video.slug} />
        </section>
      </article>
    </main>
  )
}
