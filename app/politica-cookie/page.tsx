import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Cookie policy',
  description: 'How cookies and similar technologies may be used on the VPPCONSTRUCT LTD website.',
  alternates: {
    canonical: '/politica-cookie',
  },
}

export default function CookiePolicyPage() {
  return (
    <main className="page-shell max-w-4xl">
      <p className="page-kicker">Legal</p>
      <h1 className="page-title mt-3">Cookie policy</h1>
      <p className="page-intro mt-5">
        This page explains how cookies and similar technologies may be used on the website.
      </p>

      <section className="surface-card mt-10 space-y-7 p-6 leading-relaxed text-muted-foreground sm:p-8">
        <LegalSection title="1. What cookies are">
          Cookies are small files stored in your browser. They help websites work properly, remember
          basic preferences and support security or performance features.
        </LegalSection>

        <LegalSection title="2. Essential cookies">
          The website may use cookies or local storage for basic operation, theme preference and
          similar technical settings.
        </LegalSection>

        <LegalSection title="3. Analytics and hosting">
          Depending on the publishing setup, hosting or analytics services may collect technical
          information such as visited pages, browser type and performance data.
        </LegalSection>

        <LegalSection title="4. External services">
          If the website uses maps, fonts, images or other external resources, those providers may
          use their own measurement and security technologies.
        </LegalSection>

        <LegalSection title="5. Managing cookies">
          You can block or delete cookies in your browser settings. Some preferences or basic site
          functions may not work as expected if cookies are fully disabled.
        </LegalSection>

        <LegalSection title="6. Updates">
          This policy may be updated when the website features or technical services change.
        </LegalSection>
      </section>
    </main>
  )
}

function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-serif text-2xl font-semibold text-foreground">{title}</h2>
      <p className="mt-3">{children}</p>
    </section>
  )
}
