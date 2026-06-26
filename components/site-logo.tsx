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
      <span className="relative h-11 w-12 shrink-0 sm:h-12 sm:w-14" aria-hidden="true">
        <Image
          src="/images/site-logo-mark-gold.png"
          alt=""
          fill
          sizes="56px"
          className="object-contain"
          priority
        />
      </span>
      <span className="ml-2.5 flex flex-col leading-none">
        <span className="font-serif text-lg font-semibold text-current transition-colors group-hover:text-brand sm:text-xl">
          Albert-Beniamin
        </span>
        <span className="mt-1 font-serif text-lg font-semibold text-current transition-colors group-hover:text-brand sm:text-xl">
          Cucu
        </span>
      </span>
    </Link>
  )
}
