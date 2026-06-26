import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Termeni și condiții',
  description:
    'Termenii de utilizare pentru site-ul Albert-Beniamin Cucu și materialele publicate.',
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
        Acești termeni stabilesc condițiile generale de utilizare a site-ului și a materialelor
        publicate aici.
      </p>

      <section className="surface-card mt-10 space-y-7 p-6 leading-relaxed text-muted-foreground sm:p-8">
        <LegalSection title="1. Utilizarea site-ului">
          Site-ul este un spațiu editorial personal, destinat publicării de articole, reflecții,
          materiale audio și video. Poți accesa conținutul în scop personal, educațional și
          informativ, cu respectarea drepturilor de autor.
        </LegalSection>

        <LegalSection title="2. Drepturi de autor">
          Textele, eseurile, structura editorială și materialele originale publicate pe acest site
          aparțin lui Albert-Beniamin Cucu, dacă nu este indicat alt autor sau altă sursă.
          Reproducerea, distribuirea sau republicarea materialelor se poate face doar cu menționarea
          autorului și a sursei. Folosirea comercială necesită acord scris.
        </LegalSection>

        <LegalSection title="3. Comentarii și conturi">
          Utilizatorii care își creează cont pot lăsa recenzii sau comentarii, acolo unde această
          funcție este disponibilă. Comentariile trebuie să fie respectuoase, relevante și să nu
          conțină limbaj abuziv, atacuri personale, spam sau conținut ilegal. Administratorul poate
          edita, ascunde sau șterge conținutul care încalcă aceste reguli.
        </LegalSection>

        <LegalSection title="4. Donații">
          Donațiile sunt voluntare și susțin activitatea editorială, tehnică și de documentare a
          site-ului. Ele nu condiționează accesul la conținutul public și nu reprezintă o obligație
          contractuală din partea utilizatorului.
        </LegalSection>

        <LegalSection title="5. Limitarea răspunderii">
          Materialele publicate reflectă perspectiva autorului și au caracter informativ, teologic,
          educațional sau editorial. Deși conținutul este pregătit cu atenție, nu este garantată
          absența completă a erorilor sau actualitatea permanentă a fiecărei informații.
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
