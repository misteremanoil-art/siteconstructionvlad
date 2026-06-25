import Link from 'next/link'
import { cn } from '@/lib/utils'

export function SiteLogo({
  className,
  markClassName,
  textClassName,
  compact = false,
}: {
  className?: string
  markClassName?: string
  textClassName?: string
  compact?: boolean
}) {
  return (
    <Link
      href="/"
      aria-label="Albert-Beniamin Cucu"
      className={cn(
        'group inline-flex items-center gap-3 text-current transition-opacity hover:opacity-90',
        className,
      )}
    >
      <span
        className={cn(
          'relative flex h-9 w-9 shrink-0 items-center justify-center border border-brand/45 bg-brand/10 font-serif text-[0.72rem] font-semibold text-brand shadow-sm',
          'after:absolute after:inset-1 after:border after:border-current/10',
          markClassName,
        )}
      >
        AC
      </span>
      <span
        className={cn(
          'flex min-w-0 flex-col leading-none',
          compact ? 'hidden sm:flex' : 'flex',
          textClassName,
        )}
      >
        <span className="font-serif text-[1.05rem] font-semibold tracking-[0.01em]">
          Albert-Beniamin
        </span>
        <span className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.2em] opacity-70">
          Cucu
        </span>
      </span>
    </Link>
  )
}
