'use client'

import { useEffect, useState } from 'react'
import { Link2, Check } from 'lucide-react'

export function ShareRow({ title }: { title: string }) {
  const [url, setUrl] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => setUrl(window.location.href), [])

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const links = [
    {
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: 'X',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      label: 'WhatsApp',
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
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

  return (
    <aside className="my-14 border-y border-border py-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">
            Distribuie
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Trimite articolul mai departe sau copiază linkul.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Distribuie pe ${link.label}`}
              className="inline-flex h-9 items-center justify-center rounded-full border border-border bg-background px-3 text-sm font-medium text-foreground/70 transition-colors hover:border-brand hover:text-brand"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={copyLink}
            aria-label="Copiază linkul"
            className="inline-flex h-9 items-center justify-center gap-2 rounded-full border border-border bg-background px-3 text-sm font-medium text-foreground/70 transition-colors hover:border-brand hover:text-brand"
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
        </div>
      </div>
    </aside>
  )
}
