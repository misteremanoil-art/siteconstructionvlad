import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Politica de confidențialitate',
  description:
    'Informații despre datele personale prelucrate pe site-ul VPPCONSTRUCT LTD.',
  alternates: {
    canonical: '/confidentialitate',
  },
}

export default function PrivacyPage() {
  return (
    <main className="page-shell max-w-4xl">
      <p className="page-kicker">Legal</p>
      <h1 className="page-title mt-3">Politica de confidențialitate</h1>
      <p className="page-intro mt-5">
        Această pagină explică ce date pot fi colectate atunci când folosești site-ul și cum sunt
        utilizate.
      </p>

      <section className="surface-card mt-10 space-y-7 p-6 leading-relaxed text-muted-foreground sm:p-8">
        <LegalSection title="1. Date colectate">
          Site-ul este o pagină de prezentare și nu oferă conturi de utilizator, comentarii,
          newsletter sau formulare conectate la o bază de date. Pot fi prelucrate doar date tehnice
          minime generate de browser, hosting sau serviciile de analiză activate de platforma de
          publicare.
        </LegalSection>

        <LegalSection title="2. Scopul prelucrării">
          Datele tehnice sunt folosite pentru livrarea paginii, securitate, performanță și
          înțelegerea funcționării site-ului.
        </LegalSection>

        <LegalSection title="3. Servicii terțe">
          Site-ul poate folosi servicii de hosting, deploy și analiză tehnică. Aceste servicii pot
          procesa informații standard precum adresa IP, tipul de browser, pagina accesată și timpul
          de încărcare.
        </LegalSection>

        <LegalSection title="4. Contact">
          Dacă alegi să contactezi VPPCONSTRUCT LTD prin telefon, email sau alt canal publicat pe
          site, datele trimise voluntar vor fi folosite pentru a răspunde solicitării tale.
        </LegalSection>

        <LegalSection title="5. Păstrarea datelor">
          Datele sunt păstrate doar atât timp cât este necesar pentru scopul pentru care au fost
          furnizate sau pentru îndeplinirea obligațiilor legale aplicabile.
        </LegalSection>

        <LegalSection title="6. Drepturile tale">
          Poți solicita accesul, corectarea sau ștergerea datelor tale, în limitele permise de lege
          și de funcționalitățile tehnice ale site-ului.
        </LegalSection>

        <LegalSection title="7. Întrebări">
          Pentru întrebări despre confidențialitate sau date personale, poți folosi datele de
          contact publicate pe site.
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
