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
          'flex min-w-0 flex-col items-center leading-none',
          compact ? 'hidden sm:flex' : 'flex',
          textClassName,
        )}
      >
        <span className="font-serif text-[1.08rem] font-semibold tracking-[0.01em] sm:text-[1.18rem]">
          Albert-Beniamin Cucu
        </span>
        <span className="mt-1 h-px w-16 bg-brand/70 transition-all group-hover:w-20" aria-hidden="true" />
        <span className="mt-1 font-mono text-[0.55rem] uppercase tracking-[0.22em] opacity-65">
          eseuri & reflecții
        </span>
      </span>
      {compact ? (
        <span className="flex flex-col items-center sm:hidden">
          <span className="font-serif text-base font-semibold tracking-[0.01em]">
            A-B Cucu
          </span>
          <span className="mt-1 h-px w-10 bg-brand/70" aria-hidden="true" />
        </span>
      ) : null}
    </Link>
  )
}
