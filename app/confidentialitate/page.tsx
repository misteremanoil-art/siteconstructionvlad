import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: 'How VPPCONSTRUCT LTD handles basic website and contact information.',
  alternates: {
    canonical: '/confidentialitate',
  },
}

export default function PrivacyPage() {
  return (
    <main className="page-shell max-w-4xl">
      <p className="page-kicker">Legal</p>
      <h1 className="page-title mt-3">Privacy policy</h1>
      <p className="page-intro mt-5">
        This page explains what information may be handled when you visit the website or contact
        VPPCONSTRUCT LTD.
      </p>

      <section className="surface-card mt-10 space-y-7 p-6 leading-relaxed text-muted-foreground sm:p-8">
        <LegalSection title="1. Information we may receive">
          This is a simple presentation website. It does not offer user accounts, comments,
          newsletters or database-backed forms. The website may still process basic technical data
          created by your browser, hosting provider or analytics tools.
        </LegalSection>

        <LegalSection title="2. How the information is used">
          Technical information is used to deliver the website, keep it secure, understand basic
          performance and make sure pages load properly.
        </LegalSection>

        <LegalSection title="3. Contact details">
          If you call or send a WhatsApp message, the information you choose to share will be used
          to respond to your enquiry and discuss the work you are asking about.
        </LegalSection>

        <LegalSection title="4. Third-party services">
          Hosting, deployment and analytics services may process standard technical details such as
          IP address, browser type, pages visited and loading times.
        </LegalSection>

        <LegalSection title="5. Keeping information">
          Information is kept only for as long as needed for the reason it was provided, or where
          there is a legal or practical reason to keep a record.
        </LegalSection>

        <LegalSection title="6. Your rights">
          You can ask for access, correction or deletion of personal information where the law gives
          you that right and where the request can reasonably be fulfilled.
        </LegalSection>

        <LegalSection title="7. Questions">
          For privacy questions, use the contact details published on the website.
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
