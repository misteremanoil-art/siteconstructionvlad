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
      <span className="relative h-16 w-20 shrink-0 sm:h-[72px] sm:w-[88px]" aria-hidden="true">
        <Image
          src="/images/site-logo-gold.png"
          alt=""
          fill
          sizes="88px"
          className="object-contain"
          priority
        />
      </span>
    </Link>
  )
}
