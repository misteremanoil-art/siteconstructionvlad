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
      aria-label="VPPCONSTRUCT LTD"
      className={cn(
        'group inline-flex items-center gap-3 text-current transition-colors hover:text-brand',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-brand/35 bg-brand/12 text-sm font-semibold tracking-[0.18em] text-brand"
      >
        SV
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[0.72rem] uppercase tracking-[0.22em] text-muted-foreground">London Builders</span>
        <span className="mt-1 text-base font-semibold text-foreground sm:text-lg">VPPCONSTRUCT LTD</span>
      </span>
    </Link>
  )
}
