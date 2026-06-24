'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Search, Menu, X } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/', label: 'Acasă' },
  { href: '/articole', label: 'Articole' },
  { href: '/despre', label: 'Despre' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  function onSearch(e: React.FormEvent) {
    e.preventDefault()
    const q = query.trim()
    router.push(q ? `/cautare?q=${encodeURIComponent(q)}` : '/cautare')
    setMenuOpen(false)
  }

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Left: search + theme */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <form
            onSubmit={onSearch}
            className="hidden items-center gap-2 rounded-full border border-border px-3 py-1.5 sm:flex"
          >
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Caută..."
              aria-label="Caută articole"
              className="w-28 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground focus:w-40 transition-[width]"
            />
          </form>
        </div>

        {/* Center: logo */}
        <Link
          href="/"
          className="font-serif text-lg font-semibold tracking-tight text-foreground sm:text-xl"
        >
          Albert-Beniamin Cucu
        </Link>

        {/* Right: nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-brand',
                isActive(item.href) ? 'text-brand' : 'text-foreground/70',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/80 md:hidden"
          aria-label="Meniu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
            <form
              onSubmit={onSearch}
              className="mb-4 flex items-center gap-2 rounded-full border border-border px-3 py-2"
            >
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Caută..."
                aria-label="Caută articole"
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </form>
            <nav className="flex flex-col gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    'rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted',
                    isActive(item.href) ? 'text-brand' : 'text-foreground/80',
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
