'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, Mail, X } from 'lucide-react'
import { SiteLogo } from '@/components/site-logo'

const NAV = [
  { href: '/#despre', label: 'Despre' },
  { href: '/#servicii', label: 'Servicii' },
  { href: '/#proiecte', label: 'Proiecte' },
  { href: '/#proces', label: 'Proces' },
  { href: '/#zona', label: 'Zona' },
  { href: '/#contact', label: 'Contact' },
]

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/88 text-foreground backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <SiteLogo className="shrink-0" />

        <nav className="hidden items-center gap-1 rounded-full border border-border bg-card/75 px-1 py-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-1.5 text-sm font-medium text-foreground/72 transition-colors hover:bg-background hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/#contact"
            className="hidden h-10 items-center gap-2 rounded-full bg-brand px-4 text-sm font-medium text-brand-foreground transition-colors hover:bg-foreground sm:inline-flex"
          >
            <Mail className="h-4 w-4 shrink-0" />
            <span className="truncate">Request a quote</span>
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground/80 lg:hidden"
            aria-label="Meniu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
            <nav className="flex flex-col gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted"
              >
                Request a quote
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
