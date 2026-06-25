'use client'

import { useEffect, useState } from 'react'
import { Check, Link2, MoreHorizontal, Printer, Share2 } from 'lucide-react'

export function ShareRow({ title }: { title: string }) {
  const [url, setUrl] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => setUrl(window.location.href), [])

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const links = [
    {
      label: 'Facebook',
      shortLabel: 'f',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      className: 'bg-[#1877f2] text-white border-[#1877f2]',
    },
    {
      label: 'X',
      shortLabel: 'X',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      className: 'bg-foreground text-background border-foreground',
    },
    {
      label: 'Pinterest',
      shortLabel: 'P',
      href: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
      className: 'bg-[#bd081c] text-white border-[#bd081c]',
    },
    {
      label: 'WhatsApp',
      shortLabel: 'W',
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      className: 'bg-[#25d366] text-white border-[#25d366]',
    },
    {
      label: 'LinkedIn',
      shortLabel: 'in',
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
      className: 'bg-[#0a66c2] text-white border-[#0a66c2]',
    },
  ]

  async function copyLink() {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url)
      } else {
        const textarea = document.createElement('textarea')
        textarea.value = url
        textarea.setAttribute('readonly', '')
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* ignore */
    }
  }

  async function nativeShare() {
    if (!navigator.share) {
      await copyLink()
      return
    }

    try {
      await navigator.share({ title, url })
    } catch {
      /* user cancelled */
    }
  }

  return (
    <aside className="my-14 rounded-lg border border-border bg-card p-5 shadow-sm">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand">
            <Share2 className="h-4 w-4" />
          </span>
          <div>
            <h2 className="font-serif text-2xl leading-none text-foreground">
              Distribuie articolul
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Alege o platformă sau copiază linkul.
            </p>
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Distribuie pe ${link.label}`}
              className={`inline-flex h-11 items-center justify-center gap-2 rounded-md border px-3 text-sm font-semibold transition-opacity hover:opacity-90 ${link.className}`}
            >
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white/20 px-1 text-[0.7rem] font-bold leading-none">
                {link.shortLabel}
              </span>
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 border-t border-border pt-4">
          <button
            type="button"
            onClick={copyLink}
            aria-label="Copiază linkul"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground/75 transition-colors hover:border-brand hover:text-brand"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copiat
              </>
            ) : (
              <>
                <Link2 className="h-4 w-4" />
                Link
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground/75 transition-colors hover:border-brand hover:text-brand"
          >
            <Printer className="h-4 w-4" />
            Print
          </button>
          <button
            type="button"
            onClick={nativeShare}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium text-foreground/75 transition-colors hover:border-brand hover:text-brand"
          >
            <MoreHorizontal className="h-4 w-4" />
            Mai mult
          </button>
        </div>
      </div>
    </aside>
  )
}
