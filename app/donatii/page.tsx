import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowDown, ExternalLink, HandHeart, ShieldCheck } from 'lucide-react'
import { getSiteTexts } from '@/lib/site-texts'

export const metadata: Metadata = {
  title: 'Donații — Albert-Beniamin Cucu',
  description:
    'Susține activitatea editorială, materialele publicate și menținerea site-ului Albert-Beniamin Cucu.',
}

export const dynamic = 'force-dynamic'

const donationTextKeys = [
  'donations.kicker',
  'donations.title',
  'donations.description',
  'donations.primary_button',
  'donations.secondary_button',
  'donations.url',
  'donations.methods_title',
  'donations.methods_description',
  'donations.details',
  'donations.note',
]

function isExternalUrl(value: string) {
  return /^https?:\/\//i.test(value)
}

export default async function DonationsPage() {
  const texts = await getSiteTexts(donationTextKeys)
  const donationUrl = texts['donations.url'] || '#modalitati'
  const external = isExternalUrl(donationUrl)

  return (
    <main>
      <section className="border-b border-border bg-[linear-gradient(135deg,var(--background),var(--accent))]">
        <div className="page-shell grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div>
            <p className="page-kicker">{texts['donations.kicker']}</p>
            <h1 className="page-title mt-5 max-w-4xl">
              {texts['donations.title']}
            </h1>
            <p className="page-intro mt-6">
              {texts['donations.description']}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={donationUrl}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer' : undefined}
                className="primary-action"
              >
                <HandHeart className="h-4 w-4" />
                {texts['donations.primary_button']}
                {external ? <ExternalLink className="h-4 w-4" /> : null}
              </Link>
              <Link href="#modalitati" className="secondary-action">
                <ArrowDown className="h-4 w-4" />
                {texts['donations.secondary_button']}
              </Link>
            </div>
          </div>

          <aside className="surface-card p-6 sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-brand">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h2 className="mt-5 font-serif text-2xl font-semibold text-foreground">
              Susținere voluntară
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {texts['donations.note']}
            </p>
          </aside>
        </div>
      </section>

      <section id="modalitati" className="page-shell">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="section-kicker">Detalii</p>
            <h2 className="section-title mt-3">
              {texts['donations.methods_title']}
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {texts['donations.methods_description']}
            </p>
          </div>

          <div className="surface-card p-6 sm:p-8">
            <p className="whitespace-pre-line leading-relaxed text-foreground">
              {texts['donations.details']}
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
