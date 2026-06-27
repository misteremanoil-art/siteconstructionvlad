import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Terms and conditions',
  description: 'Terms for using the VPPCONSTRUCT LTD website.',
  alternates: {
    canonical: '/termeni',
  },
}

export default function TermsPage() {
  return (
    <main className="page-shell max-w-4xl">
      <p className="page-kicker">Legal</p>
      <h1 className="page-title mt-3">Terms and conditions</h1>
      <p className="page-intro mt-5">
        These terms explain how this website can be used and how enquiries should be understood.
      </p>

      <section className="surface-card mt-10 space-y-7 p-6 leading-relaxed text-muted-foreground sm:p-8">
        <LegalSection title="1. Using the website">
          The website presents VPPCONSTRUCT LTD and its building, renovation and fit-out services.
          You may use it to read about the services, check the working area and get in touch.
        </LegalSection>

        <LegalSection title="2. Website content">
          Text, layout, images and original materials on the website belong to VPPCONSTRUCT LTD or
          are used with permission. Please do not copy or reuse them commercially without written
          agreement.
        </LegalSection>

        <LegalSection title="3. Service information">
          The information on the website is general. Final details about cost, timing, materials and
          availability are agreed directly after the project has been discussed.
        </LegalSection>

        <LegalSection title="4. Enquiries and quotes">
          Sending an enquiry does not automatically create a confirmed booking. Work is only agreed
          once the scope, price and timing have been confirmed directly.
        </LegalSection>

        <LegalSection title="5. Accuracy">
          The website is kept as clear and accurate as possible, but details may change over time.
          Always confirm important information before making a decision.
        </LegalSection>

        <LegalSection title="6. Updates">
          These terms may be updated when the website or services change. The version shown on this
          page is the current version.
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
