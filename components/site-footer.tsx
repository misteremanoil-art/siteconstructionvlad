import Link from 'next/link'
import { SiteLogo } from '@/components/site-logo'

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-10 text-sm text-muted-foreground sm:flex-row sm:px-6">
        <SiteLogo />
        <nav className="flex items-center gap-6">
          <Link href="/" className="transition-colors hover:text-brand">
            Acasă
          </Link>
          <Link href="/articole" className="transition-colors hover:text-brand">
            Articole
          </Link>
          <Link href="/video" className="transition-colors hover:text-brand">
            Video
          </Link>
          <Link href="/despre" className="transition-colors hover:text-brand">
            Despre
          </Link>
        </nav>
        <span>© 2026</span>
      </div>
    </footer>
  )
}
