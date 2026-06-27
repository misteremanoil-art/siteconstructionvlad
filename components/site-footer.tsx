import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'
import { SiteLogo } from '@/components/site-logo'

export async function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-card/45">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-start">
          <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
            <SiteLogo />
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
              VPPCONSTRUCT LTD offers building, renovation, fit-out and general construction services in Edgware and across nearby areas of London.
            </p>
            <div className="grid gap-2 text-sm text-muted-foreground">
              <p className="inline-flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Numar de telefon de adaugat
              </p>
              <p className="inline-flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Adresa de email de adaugat
              </p>
              <p className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Edgware, London
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground md:max-w-md md:justify-end">
            <Link href="/#despre" className="transition-colors hover:text-brand">
              Despre
            </Link>
            <Link href="/#servicii" className="transition-colors hover:text-brand">
              Servicii
            </Link>
            <Link href="/#proiecte" className="transition-colors hover:text-brand">
              Proiecte
            </Link>
            <Link href="/#proces" className="transition-colors hover:text-brand">
              Proces
            </Link>
            <Link href="/#contact" className="transition-colors hover:text-brand">
              Contact
            </Link>
          </nav>
        </div>

        <div className="mt-8 border-t border-border pt-6">
          <div className="rounded-lg border border-border bg-background/60 px-5 py-4">
            <p className="text-sm font-medium text-foreground">
              © 2026 VPPCONSTRUCT LTD
            </p>
            <p className="mt-2 max-w-4xl text-xs leading-relaxed text-muted-foreground">
              Site de prezentare pentru servicii de constructii, renovari si amenajari in Edgware si zonele apropiate din Londra.
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
