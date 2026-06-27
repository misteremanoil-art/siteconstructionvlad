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
      <span
        aria-hidden="true"
        className="flex h-14 w-14 items-center justify-center border-2 border-[#c59d54] bg-[#14211e] text-lg font-black tracking-[0.08em] text-[#f4d487]"
      >
        VP
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[0.68rem] uppercase tracking-[0.22em] text-[#c59d54]">General Builders</span>
        <span className="mt-1 text-base font-black tracking-[0.03em] text-current sm:text-lg">VPPCONSTRUCT</span>
      </span>
    </Link>
  )
}
