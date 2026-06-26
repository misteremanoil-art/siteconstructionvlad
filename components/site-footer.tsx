import Link from 'next/link'
import { SiteLogo } from '@/components/site-logo'
import { getSiteTexts } from '@/lib/site-texts'

export async function SiteFooter() {
  const texts = await getSiteTexts(['footer.copyright', 'donations.nav_label'])

  return (
    <footer className="mt-20 border-t border-border">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 text-sm text-muted-foreground sm:px-6 md:grid-cols-[1fr_auto] md:items-center">
        <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
          <SiteLogo />
          <p className="max-w-xl leading-relaxed">
            {texts['footer.copyright']}
          </p>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:justify-end">
          <Link href="/" className="transition-colors hover:text-brand">
            Acasă
          </Link>
          <Link href="/articole" className="transition-colors hover:text-brand">
            Articole
          </Link>
          <Link href="/video" className="transition-colors hover:text-brand">
            Video
          </Link>
          <Link href="/conversatii" className="transition-colors hover:text-brand">
            Conversații
          </Link>
          <Link href="/despre" className="transition-colors hover:text-brand">
            Despre
          </Link>
          <Link href="/donatii" className="transition-colors hover:text-brand">
            {texts['donations.nav_label']}
          </Link>
        </nav>
      </div>
    </footer>
  )
}
