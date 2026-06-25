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
        <span className="whitespace-nowrap font-sans text-[0.98rem] font-semibold tracking-[0.08em] sm:text-[1.05rem]">
          ALBERT-BENIAMIN CUCU
        </span>
      </span>
    </Link>
  )
}
