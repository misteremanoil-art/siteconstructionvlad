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
        'group inline-flex items-center gap-3 text-current transition-colors hover:text-brand',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="flex h-16 w-20 items-center justify-center overflow-hidden rounded-sm border border-[#c59d54]/45 bg-white p-1 shadow-sm">
        <Image
          src="/images/vpp-logo.jpg"
          alt=""
          width={132}
          height={118}
          className="h-full w-full object-contain"
          aria-hidden="true"
        />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[0.68rem] uppercase tracking-[0.22em] text-[#c59d54]">Construction Companies</span>
        <span className="mt-1 text-base font-black tracking-[0.03em] text-current sm:text-lg">VPPCONSTRUCT LTD</span>
      </span>
    </Link>
  )
}
