import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Termeni și condiții',
  description:
    'Termenii de utilizare pentru site-ul VPPCONSTRUCT LTD.',
  alternates: {
    canonical: '/termeni',
  },
}

export default function TermsPage() {
  return (
    <main className="page-shell max-w-4xl">
      <p className="page-kicker">Legal</p>
      <h1 className="page-title mt-3">Termeni și condiții</h1>
      <p className="page-intro mt-5">
        Acești termeni stabilesc condițiile generale de utilizare a site-ului VPPCONSTRUCT LTD.
      </p>

      <section className="surface-card mt-10 space-y-7 p-6 leading-relaxed text-muted-foreground sm:p-8">
        <LegalSection title="1. Utilizarea site-ului">
          Site-ul este o prezentare online a serviciilor VPPCONSTRUCT LTD. Îl poți accesa pentru
          informații despre servicii, zonă de lucru și modalități de contact.
        </LegalSection>

        <LegalSection title="2. Drepturi de autor">
          Textele, structura vizuală și materialele originale publicate pe site aparțin
          VPPCONSTRUCT LTD sau sunt folosite cu drept de utilizare. Reproducerea sau folosirea
          comercială necesită acord scris.
        </LegalSection>

        <LegalSection title="3. Informații despre servicii">
          Informațiile de pe site au rol de prezentare generală. Detaliile finale despre lucrări,
          costuri, termene și disponibilitate se stabilesc direct cu echipa, în funcție de proiect.
        </LegalSection>

        <LegalSection title="4. Solicitări și oferte">
          O solicitare trimisă prin datele de contact publicate pe site nu reprezintă automat o
          comandă confirmată. Orice lucrare se stabilește prin comunicare directă și acord explicit.
        </LegalSection>

        <LegalSection title="5. Limitarea răspunderii">
          Conținutul este pregătit cu atenție, dar pot exista modificări, erori sau informații care
          se actualizează în timp. Verifică direct detaliile importante înainte de a lua o decizie.
        </LegalSection>

        <LegalSection title="6. Modificări">
          Acești termeni pot fi actualizați periodic. Versiunea publicată pe această pagină este cea
          aplicabilă la momentul accesării site-ului.
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
