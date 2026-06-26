import Link from 'next/link'
import Image from 'next/image'
import type { ArticleMeta } from '@/lib/articles'
import { getContentHoverStyle } from '@/lib/hover-styles'

export function ArticleCard({ article }: { article: ArticleMeta }) {
  const href = article.slug ? `/articole/${article.slug}` : '/articole'
  const hoverStyle = getContentHoverStyle(article.slug || article.title)

  return (
    <Link
      href={href}
      className={`surface-card group flex flex-col overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg ${hoverStyle.card}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={article.image || '/placeholder.svg'}
          alt={article.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className={`media-badge absolute left-3 top-3 backdrop-blur transition-colors ${hoverStyle.badge}`}>
          {article.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {article.author} • {article.displayDate} • {article.readingTime}
        </p>
        <h3 className={`font-serif text-xl font-semibold leading-snug text-foreground text-balance transition-colors ${hoverStyle.title}`}>
          {article.title}
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {article.standfirst}
        </p>
        <div className="mt-auto flex flex-wrap gap-2 pt-1">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground transition-colors group-hover:border-brand/40 group-hover:text-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
