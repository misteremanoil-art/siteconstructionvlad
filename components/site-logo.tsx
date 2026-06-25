import Image from 'next/image'
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
      <span className="relative h-9 w-11 shrink-0 sm:h-10 sm:w-12" aria-hidden="true">
        <Image
          src="/images/site-logo-mark-gold.png"
          alt=""
          fill
          sizes="48px"
          className="object-contain"
          priority
        />
      </span>
      <span
        className={cn(
          'flex min-w-0 items-center leading-none',
          textClassName,
        )}
      >
        <span className="whitespace-nowrap font-sans text-[0.92rem] font-semibold tracking-[0.055em] sm:text-[1rem]">
          ALBERT BENIAMIN CUCU
        </span>
      </span>
    </Link>
  )
}
