import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Politica de cookie',
  description:
    'Informații despre cookie-uri și tehnologii similare folosite pe site-ul VPPCONSTRUCT LTD.',
  alternates: {
    canonical: '/politica-cookie',
  },
}

export default function CookiePolicyPage() {
  return (
    <main className="page-shell max-w-4xl">
      <p className="page-kicker">Legal</p>
      <h1 className="page-title mt-3">Politica de cookie</h1>
      <p className="page-intro mt-5">
        Această politică explică folosirea cookie-urilor și a tehnologiilor similare pe site.
      </p>

      <section className="surface-card mt-10 space-y-7 p-6 leading-relaxed text-muted-foreground sm:p-8">
        <LegalSection title="1. Ce sunt cookie-urile">
          Cookie-urile sunt fișiere mici salvate în browser pentru ca un site să poată funcționa
          corect, să rețină anumite preferințe sau să ofere funcții precum autentificarea.
        </LegalSection>

        <LegalSection title="2. Cookie-uri necesare">
          Site-ul poate folosi cookie-uri sau stocare locală pentru funcționare, preferința de temă
          și setări tehnice similare. Acestea ajută site-ul să funcționeze corect.
        </LegalSection>

        <LegalSection title="3. Analitice și servicii externe">
          În funcție de mediul de publicare, site-ul poate folosi servicii de analiză sau hosting
          care colectează date tehnice agregate, precum pagini vizitate, tip de browser sau
          informații despre performanță. Aceste date ajută la înțelegerea funcționării site-ului.
        </LegalSection>

        <LegalSection title="4. Servicii externe">
          Dacă site-ul include hărți, imagini, fonturi sau alte resurse încărcate din servicii
          externe, acestea pot folosi propriile tehnologii de măsurare și securitate.
        </LegalSection>

        <LegalSection title="5. Controlul cookie-urilor">
          Poți șterge sau bloca cookie-urile din setările browserului. Unele preferințe sau funcții
          de bază pot să nu mai funcționeze corect dacă sunt dezactivate complet.
        </LegalSection>

        <LegalSection title="6. Actualizări">
          Politica de cookie poate fi actualizată atunci când se schimbă funcționalitățile site-ului
          sau serviciile tehnice folosite.
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
