import Link from 'next/link'
import { cn } from '@/lib/utils'

export function SiteLogo({
  className,
  textClassName,
}: {
  className?: string
  textClassName?: string
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
          textClassName,
        )}
      >
        <span className="whitespace-nowrap font-serif text-[1rem] font-medium tracking-[0.01em] sm:text-[1.14rem]">
          Albert-Beniamin
        </span>
        <span className="mx-2 h-1 w-1 rounded-full bg-brand/80" aria-hidden="true" />
        <span className="whitespace-nowrap font-serif text-[1rem] font-semibold tracking-[0.01em] text-brand sm:text-[1.14rem]">
          Cucu
        </span>
      </span>
    </Link>
  )
}
