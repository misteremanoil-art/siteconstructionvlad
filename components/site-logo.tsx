import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function SiteLogo({
  className,
}: {
  className?: string
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
      <span className="relative h-12 w-14 shrink-0 sm:h-14 sm:w-16" aria-hidden="true">
        <Image
          src="/images/site-logo-gold.png"
          alt=""
          fill
          sizes="64px"
          className="object-contain"
          priority
        />
      </span>
    </Link>
  )
}
