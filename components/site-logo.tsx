import Image from 'next/image'
import Link from 'next/link'

export function SiteLogo({
  className,
}: {
  className?: string
}) {
  return (
    <Link
      href="/"
      aria-label="VPPCONSTRUCT LTD"
      className={[
        'site-logo group inline-flex min-w-0 items-center gap-2 text-current transition-colors hover:text-brand sm:gap-3',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-[#c89b3c]/45 bg-white p-1 shadow-sm sm:h-16 sm:w-16">
        <Image
          src="/images/vpp-logo-new.png"
          alt=""
          width={256}
          height={256}
          className="h-full w-full object-contain"
          aria-hidden="true"
        />
      </span>
      <span className="flex min-w-0 flex-col leading-none">
        <span className="hidden text-[0.68rem] uppercase tracking-[0.22em] text-[#c89b3c] sm:block">Construction Company</span>
        <span className="mt-0.5 max-w-[9.5rem] truncate text-sm font-black tracking-[0.03em] text-current sm:mt-1 sm:max-w-none sm:text-lg">VPPCONSTRUCT LTD</span>
      </span>
    </Link>
  )
}
