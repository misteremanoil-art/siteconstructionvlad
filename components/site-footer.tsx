import Link from 'next/link'
import { SiteLogo } from '@/components/site-logo'
import { getSiteTexts } from '@/lib/site-texts'

export async function SiteFooter() {
  const texts = await getSiteTexts([
    'footer.tagline',
    'footer.copyright',
    'footer.rights_notice',
    'donations.nav_label',
  ])

  return (
    <footer className="mt-20 border-t border-border bg-card/45">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-start">
          <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
          <SiteLogo />
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            {texts['footer.tagline']}
          </p>
        </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground md:max-w-md md:justify-end">
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

        <div className="mt-8 border-t border-border pt-6">
          <div className="rounded-lg border border-border bg-background/60 px-5 py-4">
            <p className="text-sm font-medium text-foreground">
              {texts['footer.copyright']}
            </p>
            <p className="mt-2 max-w-4xl text-xs leading-relaxed text-muted-foreground">
              {texts['footer.rights_notice']}
            </p>
            <nav className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
              <Link href="/termeni" className="transition-colors hover:text-brand">
                Termeni
              </Link>
              <Link href="/confidentialitate" className="transition-colors hover:text-brand">
                Confidențialitate
              </Link>
              <Link href="/politica-cookie" className="transition-colors hover:text-brand">
                Politică cookie
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
