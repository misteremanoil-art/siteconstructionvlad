import Link from 'next/link'
import { ExternalLink, HandHeart } from 'lucide-react'
import { getSiteTexts } from '@/lib/site-texts'

function isExternalUrl(value: string) {
  return /^https?:\/\//i.test(value)
}

export async function DonationInline() {
  const texts = await getSiteTexts([
    'donations.inline_title',
    'donations.inline_description',
    'donations.inline_button',
    'donations.url',
  ])
  const donationUrl = texts['donations.url'] || '/donatii'
  const external = isExternalUrl(donationUrl)
  const href = donationUrl === '#modalitati' ? '/donatii#modalitati' : donationUrl

  return (
    <aside className="mt-12 rounded-lg border border-brand/25 bg-brand/5 p-5 sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
            <HandHeart className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-serif text-2xl font-semibold text-foreground">
              {texts['donations.inline_title']}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {texts['donations.inline_description']}
            </p>
          </div>
        </div>

        <Link
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noreferrer' : undefined}
          className="primary-action shrink-0"
        >
          {texts['donations.inline_button']}
          {external ? <ExternalLink className="h-4 w-4" /> : null}
        </Link>
      </div>
    </aside>
  )
}
