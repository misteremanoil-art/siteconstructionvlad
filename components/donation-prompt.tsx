'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { HandHeart, X } from 'lucide-react'

type DonationPromptTexts = {
  title: string
  description: string
  button: string
  later: string
}

const DISMISSED_UNTIL_KEY = 'donationPromptDismissedUntil'
const SHOWN_AT_KEY = 'donationPromptShownAt'
const WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000
const TWO_DAYS_IN_MS = 2 * 24 * 60 * 60 * 1000
const SHOW_DELAY_IN_MS = 45000

function shouldShowPrompt() {
  const now = Date.now()
  const dismissedUntil = Number(window.localStorage.getItem(DISMISSED_UNTIL_KEY) ?? 0)
  const shownAt = Number(window.localStorage.getItem(SHOWN_AT_KEY) ?? 0)

  return now > dismissedUntil && now - shownAt > TWO_DAYS_IN_MS
}

export function DonationPrompt({ texts }: { texts: DonationPromptTexts }) {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (pathname.startsWith('/donatii')) return
    if (!shouldShowPrompt()) return

    const timer = window.setTimeout(() => {
      window.localStorage.setItem(SHOWN_AT_KEY, String(Date.now()))
      setVisible(true)
    }, SHOW_DELAY_IN_MS)

    return () => window.clearTimeout(timer)
  }, [pathname])

  function dismiss() {
    window.localStorage.setItem(DISMISSED_UNTIL_KEY, String(Date.now() + WEEK_IN_MS))
    setVisible(false)
  }

  if (!visible) return null

  return (
    <aside
      aria-label="Susține proiectul"
      className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-md rounded-lg border border-border bg-popover p-4 text-popover-foreground shadow-2xl sm:bottom-6 sm:left-auto sm:right-6 sm:mx-0"
    >
      <button
        type="button"
        aria-label="Închide"
        onClick={dismiss}
        className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="flex gap-4 pr-8">
        <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
          <HandHeart className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-serif text-xl font-semibold leading-tight text-foreground">
            {texts.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {texts.description}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Link href="/donatii" onClick={dismiss} className="primary-action">
              {texts.button}
            </Link>
            <button
              type="button"
              onClick={dismiss}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-brand"
            >
              {texts.later}
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
