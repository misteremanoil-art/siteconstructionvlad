'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { Menu, Search, UserRound, X } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { SiteLogo } from '@/components/site-logo'
import { cn } from '@/lib/utils'
import { createBrowserSupabaseClient } from '@/lib/supabase-browser'

const NAV = [
  { href: '/', label: 'Acasă' },
  { href: '/articole', label: 'Articole' },
  { href: '/video', label: 'Video' },
  { href: '/conversatii', label: 'Conversații' },
  { href: '/despre', label: 'Despre' },
]

function formatAccountLabel(value: string) {
  const cleanValue = value.trim()
  if (!cleanValue) return 'Cont'

  return cleanValue.charAt(0).toLocaleUpperCase('ro-RO') + cleanValue.slice(1)
}

export function SiteHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = useMemo(() => createBrowserSupabaseClient(), [])
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [accountLabel, setAccountLabel] = useState('Cont')

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  useEffect(() => {
    async function loadAccountLabel() {
      const { data: userData } = await supabase.auth.getUser()
      const user = userData.user

      if (!user) {
        setAccountLabel('Cont')
        return
      }

      const { data } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .maybeSingle()

      const username = (data?.username as string | null | undefined)?.trim()
      const fallbackName = user.email?.split('@')[0] ?? 'Cont'
      setAccountLabel(formatAccountLabel(username || fallbackName))
    }

    loadAccountLabel()

    const { data } = supabase.auth.onAuthStateChange(() => {
      loadAccountLabel()
    })

    return () => data.subscription.unsubscribe()
  }, [pathname, supabase])

  function submitSearch(value: string) {
    const q = value.trim()
    router.push(q ? `/cautare?q=${encodeURIComponent(q)}` : '/cautare')
    setMenuOpen(false)
    setSearchOpen(false)
  }

  function onSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const value = formData.get('q')
    submitSearch(typeof value === 'string' ? value : query)
  }

  function onSearchKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter') return
    e.preventDefault()
    submitSearch(e.currentTarget.value)
  }

  function onSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value)
  }

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)
  const isArticlePage = pathname.startsWith('/articole/') && pathname !== '/articole'
  const isTransparent = isArticlePage && !scrolled && !menuOpen

  return (
    <header
      className={cn(
        'top-0 z-50 backdrop-blur-md',
        isTransparent
          ? 'fixed inset-x-0 border-b border-white/10 bg-black/10 text-white'
          : isArticlePage
            ? 'fixed inset-x-0 border-b border-border bg-background/90 text-foreground shadow-sm'
            : 'sticky border-b border-border bg-background/80 text-foreground',
      )}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <SiteLogo
          className="shrink-0"
        />

        <nav
          className={cn(
            'hidden items-center gap-1 rounded-full border px-1 py-1 lg:flex',
            isTransparent
              ? 'border-white/15 bg-black/15'
              : 'border-border bg-muted/45',
          )}
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors',
                isTransparent
                  ? isActive(item.href)
                    ? 'bg-white text-foreground'
                    : 'text-white/75 hover:bg-white/10 hover:text-white'
                  : isActive(item.href)
                    ? 'bg-background text-brand shadow-sm'
                    : 'text-foreground/70 hover:bg-background/70 hover:text-foreground',
              )}
            >
              {item.href === '/cont/setari' ? accountLabel : item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div
            className={cn(
              'hidden items-center rounded-full border md:flex',
              searchOpen
                ? 'gap-2 px-3 py-1.5'
                : 'h-10 w-10 justify-center',
              isTransparent ? 'border-white/20 bg-black/10' : 'border-border bg-background/45',
            )}
          >
            <button
              type="button"
              aria-label="Caută"
              onClick={() => setSearchOpen((value) => !value)}
            >
              <Search
                className={cn(
                  'h-4 w-4 transition-colors',
                  isTransparent ? 'text-white/75 hover:text-white' : 'text-muted-foreground hover:text-brand',
                )}
              />
            </button>
            {searchOpen ? (
              <form action="/cautare" onSubmit={onSearch} className="flex items-center">
                <input
                  type="search"
                  name="q"
                  value={query}
                  onChange={onSearchChange}
                  onKeyDown={onSearchKeyDown}
                  placeholder="Caută"
                  aria-label="Caută articole"
                  autoFocus
                  className={cn(
                    'w-32 bg-transparent text-sm outline-none',
                    isTransparent
                      ? 'text-white placeholder:text-white/65'
                      : 'text-foreground placeholder:text-muted-foreground',
                  )}
                />
              </form>
            ) : null}
          </div>
          <ThemeToggle />
          <Link
            href="/cont/setari"
            className={cn(
              'hidden h-10 max-w-36 items-center gap-2 rounded-full border px-3 text-sm font-medium transition-colors sm:inline-flex',
              isTransparent
                ? 'border-white/20 bg-black/10 text-white/85 hover:bg-white/10 hover:text-white'
                : 'border-border bg-background/45 text-foreground/75 hover:border-brand/35 hover:text-brand',
            )}
          >
            <UserRound className="h-4 w-4 shrink-0" />
            <span className="truncate">{accountLabel}</span>
          </Link>
          <button
            type="button"
            className={cn(
              'inline-flex h-10 w-10 items-center justify-center rounded-full border lg:hidden',
              isTransparent ? 'border-white/20 text-white' : 'border-border text-foreground/80',
            )}
            aria-label="Meniu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className={cn(
            'border-t lg:hidden',
            isArticlePage
              ? 'border-white/10 bg-black/80 text-white'
              : 'border-border bg-background',
          )}
        >
          <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
            <form
              action="/cautare"
              onSubmit={onSearch}
              className={cn(
                'mb-4 flex items-center gap-2 rounded-full border px-3 py-2',
                isArticlePage ? 'border-white/20' : 'border-border',
              )}
            >
              <button type="submit" aria-label="Caută">
                <Search
                  className={cn(
                    'h-4 w-4 transition-colors hover:text-brand',
                    isArticlePage ? 'text-white/75 hover:text-white' : 'text-muted-foreground',
                  )}
                />
              </button>
              <input
                type="search"
                name="q"
                value={query}
                onChange={onSearchChange}
                onKeyDown={onSearchKeyDown}
                placeholder="Caută..."
                aria-label="Caută articole"
                className={cn(
                  'w-full bg-transparent text-sm outline-none',
                  isArticlePage
                    ? 'text-white placeholder:text-white/65'
                    : 'text-foreground placeholder:text-muted-foreground',
                )}
              />
            </form>
            <nav className="flex flex-col gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isArticlePage
                      ? isActive(item.href)
                        ? 'text-white'
                        : 'text-white/80 hover:bg-white/10'
                      : isActive(item.href)
                        ? 'text-brand'
                        : 'text-foreground/80 hover:bg-muted',
                  )}
                >
                  {item.href === '/cont/setari' ? accountLabel : item.label}
                </Link>
              ))}
              <Link
                href="/cont/setari"
                onClick={() => setMenuOpen(false)}
                className={cn(
                  'mt-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors',
                  isArticlePage
                    ? 'border-white/15 text-white/85 hover:bg-white/10'
                    : 'border-border text-foreground/80 hover:bg-muted',
                )}
              >
                {accountLabel}
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
