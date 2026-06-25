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
          'flex min-w-0 items-center leading-none',
          compact ? 'hidden sm:flex' : 'flex',
          textClassName,
        )}
      >
        <span className="font-serif text-[1.12rem] font-medium tracking-[0.015em] sm:text-[1.24rem]">
          Albert-Beniamin Cucu
        </span>
      </span>
      {compact ? (
        <span className="font-serif text-[1.02rem] font-medium tracking-[0.01em] sm:hidden">
          Albert-Beniamin Cucu
        </span>
      ) : null}
    </Link>
  )
}
