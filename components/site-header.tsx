'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, MessageCircle, Phone, X } from 'lucide-react'
import { SiteLogo } from '@/components/site-logo'

const NAV = [
  { href: '/#about', label: 'About' },
  { href: '/#services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/#why-us', label: 'Why us' },
  { href: '/#area', label: 'Area' },
  { href: '/#contact', label: 'Contact' },
]

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header-glass sticky top-0 z-50 text-foreground">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-3 px-4 sm:h-24 sm:px-6">
        <SiteLogo className="shrink-0" />

        <nav className="hidden items-center gap-9 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link text-base font-medium text-foreground/78 transition-colors hover:text-brand"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="tel:07466206758"
            className="header-action hidden h-11 items-center gap-2 rounded-sm bg-brand px-4 text-sm font-bold text-brand-foreground transition-colors hover:bg-foreground sm:inline-flex"
          >
            <Phone className="h-4 w-4 shrink-0" />
            <span className="truncate">07466 206758</span>
          </Link>
          <Link
            href="https://wa.me/447466206758?text=Hi%2C%20I%27d%20like%20a%20quote%20for%20building%2Frenovation%20work%20in%20London."
            className="header-action hidden h-11 items-center gap-2 rounded-sm border border-border px-4 text-sm font-bold text-foreground transition-colors hover:border-brand hover:text-brand md:inline-flex"
          >
            <MessageCircle className="h-4 w-4 shrink-0" />
            <span className="truncate">WhatsApp</span>
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-border text-foreground/80 lg:hidden sm:h-11 sm:w-11"
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-menu-glass border-t border-border lg:hidden">
          <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
            <nav className="flex flex-col gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-sm px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="tel:07466206758"
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-sm border border-border px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted"
              >
                Call 07466 206758
              </Link>
              <Link
                href="https://wa.me/447466206758?text=Hi%2C%20I%27d%20like%20a%20quote%20for%20building%2Frenovation%20work%20in%20London."
                onClick={() => setMenuOpen(false)}
                className="rounded-sm border border-border px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted"
              >
                Message me on WhatsApp
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
