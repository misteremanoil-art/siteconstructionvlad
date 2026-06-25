import Link from 'next/link'
import { cn } from '@/lib/utils'

export function SiteLogo({
  className,
  textClassName,
  compact = false,
}: {
  className?: string
  textClassName?: string
  compact?: boolean
}) {
  return (
    <Link
      href="/"
      aria-label="Albert-Beniamin Cucu"
      className={cn(
        'group inline-flex items-center text-current transition-colors hover:text-brand',
        className,
      )}
    >
      <span
        className={cn(
          'flex min-w-0 items-baseline gap-2 leading-none',
          compact ? 'hidden sm:flex' : 'flex',
          textClassName,
        )}
      >
        <span className="font-serif text-[1.08rem] font-semibold tracking-[0.01em] sm:text-[1.16rem]">
          Albert
        </span>
        <span className="h-px w-5 bg-brand/70" aria-hidden="true" />
        <span className="font-serif text-[1.08rem] font-semibold tracking-[0.01em] sm:text-[1.16rem]">
          B. Cucu
        </span>
      </span>
      {compact ? (
        <span className="font-serif text-xl font-semibold tracking-[0.01em] sm:hidden">
          ABC
        </span>
      ) : null}
    </Link>
  )
}
