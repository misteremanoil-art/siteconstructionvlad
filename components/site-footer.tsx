import Link from 'next/link'
import { MapPin, MessageCircle, Phone } from 'lucide-react'
import { SiteLogo } from '@/components/site-logo'

export async function SiteFooter() {
  return (
    <footer className="border-t border-border bg-[#111715] text-[#f8f4eb]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-start">
          <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
            <SiteLogo />
            <p className="max-w-xl text-sm leading-relaxed text-[#c9c1b0]">
              VPPCONSTRUCT LTD offers building, renovation, fit-out and general construction services in Edgware and across nearby areas of London.
            </p>
            <div className="grid gap-2 text-sm text-[#c9c1b0]">
              <p className="inline-flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href="tel:07466206758" className="transition-colors hover:text-brand">
                  07466 206758
                </a>
              </p>
              <p className="inline-flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                <a
                  href="https://wa.me/447466206758?text=Hi%2C%20I%27d%20like%20a%20quote%20for%20building%2Frenovation%20work%20in%20London."
                  className="transition-colors hover:text-brand"
                >
                  Message me on WhatsApp
                </a>
              </p>
              <p className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Edgware, London
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-[#c9c1b0] md:max-w-md md:justify-end">
            <Link href="/#about" className="transition-colors hover:text-brand">
              About
            </Link>
            <Link href="/#services" className="transition-colors hover:text-brand">
              Services
            </Link>
            <Link href="/#work" className="transition-colors hover:text-brand">
              Work
            </Link>
            <Link href="/#why-us" className="transition-colors hover:text-brand">
              Why us
            </Link>
            <Link href="/#contact" className="transition-colors hover:text-brand">
              Contact
            </Link>
          </nav>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6">
          <div className="border border-white/10 bg-white/5 px-5 py-4">
            <p className="text-sm font-medium text-[#fffaf1]">
              © 2026 VPPCONSTRUCT LTD
            </p>
            <p className="mt-2 max-w-4xl text-xs leading-relaxed text-[#c9c1b0]">
              Building, renovation and fit-out services in Edgware and the surrounding London areas.
            </p>
            <nav className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#c9c1b0]">
              <Link href="/termeni" className="transition-colors hover:text-brand">
                Terms
              </Link>
              <Link href="/confidentialitate" className="transition-colors hover:text-brand">
                Privacy
              </Link>
              <Link href="/politica-cookie" className="transition-colors hover:text-brand">
                Cookie policy
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
