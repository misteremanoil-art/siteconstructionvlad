import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Politica de confidențialitate',
  description:
    'Informații despre datele personale prelucrate pe site-ul Albert-Beniamin Cucu.',
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
          Site-ul poate colecta date precum adresa de email, username-ul, comentariile/recenziile
          publicate, date tehnice de autentificare și informații minime necesare pentru funcționarea
          contului. Dacă te abonezi la newsletter sau folosești formularul de contact, sunt
          prelucrate datele pe care le trimiți voluntar.
        </LegalSection>

        <LegalSection title="2. Scopul prelucrării">
          Datele sunt folosite pentru autentificare, administrarea contului, afișarea comentariilor,
          trimiterea mesajelor solicitate, moderare, securitate și îmbunătățirea funcționării
          site-ului.
        </LegalSection>

        <LegalSection title="3. Servicii terțe">
          Site-ul folosește servicii tehnice precum Supabase pentru autentificare, bază de date și
          stocare, precum și servicii de hosting/deploy. Aceste servicii pot procesa date tehnice
          necesare funcționării site-ului.
        </LegalSection>

        <LegalSection title="4. Comentarii și conținut public">
          Recenziile sau comentariile pe care alegi să le publici pot fi vizibile public împreună cu
          username-ul asociat contului. Poți edita sau șterge propriile comentarii din zona de
          setări, acolo unde funcția este disponibilă.
        </LegalSection>

        <LegalSection title="5. Păstrarea datelor">
          Datele sunt păstrate atât timp cât este necesar pentru funcționarea contului, menținerea
          istoricului comentariilor, îndeplinirea obligațiilor tehnice sau protejarea site-ului.
        </LegalSection>

        <LegalSection title="6. Drepturile tale">
          Poți solicita accesul, corectarea sau ștergerea datelor tale, în limitele permise de lege
          și de funcționalitățile tehnice ale site-ului.
        </LegalSection>

        <LegalSection title="7. Contact">
          Pentru întrebări despre confidențialitate sau date personale, poți folosi datele de contact
          publicate pe site sau formularul disponibil, dacă acesta este activ.
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
