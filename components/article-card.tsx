import Link from 'next/link'
import Image from 'next/image'
import type { ArticleMeta } from '@/lib/articles'

export function ArticleCard({ article }: { article: ArticleMeta }) {
  const href = article.slug ? `/articole/${article.slug}` : '/articole'

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={article.image || '/placeholder.svg'}
          alt={article.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-background/85 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
          {article.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {article.author} • {article.displayDate} • {article.readingTime}
        </p>
        <h3 className="font-serif text-xl font-semibold leading-snug text-foreground text-balance group-hover:text-brand">
          {article.title}
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {article.standfirst}
        </p>
        <div className="mt-auto flex flex-wrap gap-2 pt-1">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
