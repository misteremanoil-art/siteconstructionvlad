import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Hammer,
  HousePlus,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  TimerReset,
  Wrench,
} from 'lucide-react'

const services = [
  {
    title: 'Constructii si renovari',
    description: 'Proiecte complete pentru locuinte si spatii comerciale, de la lucrari structurale pana la finisajele finale.',
    icon: Hammer,
  },
  {
    title: 'Amenajari interioare',
    description: 'Reconfigurari, placari, montaj si finisaje executate curat, cu atentie la functionalitate si aspect.',
    icon: Sparkles,
  },
  {
    title: 'Extensii si conversii',
    description: 'Spatii noi, compartimentari si adaptari pentru proiecte care cer flexibilitate si executie solida.',
    icon: HousePlus,
  },
  {
    title: 'Finisaje complete',
    description: 'Glet, vopsitorii, rigips, pardoseli si detalii de inchidere care ridica nivelul intregii proprietati.',
    icon: Wrench,
  },
  {
    title: 'Lucrari exterioare',
    description: 'Fatade, terase, garduri, paving si alte lucrari care completeaza proiectul dincolo de interior.',
    icon: Building2,
  },
  {
    title: 'Orice tip de lucrare',
    description: 'VPPCONSTRUCT LTD preia o gama larga de lucrari, de la reparatii punctuale pana la proiecte mari, rezidentiale sau comerciale.',
    icon: TimerReset,
  },
]

const strengths = [
  'Lucrari rezidentiale si comerciale',
  'Atentie reala la detalii si finisaje',
  'Estimari clare si ritm de lucru organizat',
  'Flexibilitate pentru orice tip de proiect',
]

const projects = [
  {
    title: 'Apartament renovat complet',
    label: 'Renovare integrala',
    description: 'Refacere cap-coada, cu trasee noi, finisaje actuale si un ritm de executie bine controlat.',
  },
  {
    title: 'Baie moderna cu detalii premium',
    label: 'Baie',
    description: 'Spatiu compact, bine gandit, cu placari curate si solutii practice pentru depozitare.',
  },
  {
    title: 'Bucatarie functionala pentru familie',
    label: 'Bucatarie',
    description: 'Configuratie eficienta, suprafete rezistente si integrare coerenta a instalatiilor.',
  },
  {
    title: 'Terasa si zona exterioara refacute',
    label: 'Exterior',
    description: 'Amenajare simpla si solida, potrivita pentru folosire frecventa si intretinere usoara.',
  },
]

const processSteps = [
  'Discutie initiala si stabilirea prioritatilor proiectului',
  'Masuratori, recomandari si estimare de buget',
  'Plan de executie pe etape, cu materiale si termene clare',
  'Predare curata, cu verificare finala a detaliilor',
]

const coverage = ['Edgware', 'North London', 'North West London', 'Barnet', 'Harrow', 'Brent', 'Hendon', 'Mill Hill']

export default function HomePage() {
  return (
    <main className="construction-page">
      <section className="hero-band" id="top">
        <div className="page-shell py-0">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="section-kicker">VPPCONSTRUCT LTD</p>
              <h1 className="hero-title">
                Building, renovation and fit-out work delivered with care in Edgware, London.
              </h1>
              <p className="hero-intro">
                VPPCONSTRUCT LTD handles a wide range of construction work, from full renovations and interior upgrades
                to extensions, exterior work and practical day-to-day building jobs.
              </p>
              <div className="hero-actions">
                <Link href="#contact" className="primary-action">
                  Cere o oferta
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="#servicii" className="secondary-action">
                  Vezi serviciile
                </Link>
              </div>
              <div className="hero-stats">
                <div>
                  <strong>50+</strong>
                  <span>projects completed</span>
                </div>
                <div>
                  <strong>1 echipa</strong>
                  <span>start-to-finish coordination</span>
                </div>
                <div>
                  <strong>All-round</strong>
                  <span>service for all types of work</span>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-image-wrap">
                <Image
                  src="/placeholder.jpg"
                  alt="Proiect de renovare si amenajare interioara"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 44vw"
                  className="object-cover"
                />
              </div>
              <div className="hero-note">
                <span className="hero-note-label">Executie atenta</span>
                <p>Design sobru, materiale bine alese si lucrari gandite pentru folosire reala, nu doar pentru poze.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell" id="despre">
        <div className="section-header">
          <div>
            <p className="section-kicker">Despre</p>
            <h2 className="section-title">A stronger web presence for a London building company that covers more than just one niche.</h2>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="surface-card construction-panel p-7 sm:p-8">
            <p className="construction-lead">
              VPPCONSTRUCT LTD can be presented as a dependable all-round contractor: clear services, strong first impression,
              visible project examples and a contact section that keeps enquiries simple.
            </p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              The tone is broader now, so the company does not look limited to kitchens, bathrooms or one narrow category.
              It reads like a practical London builder ready for domestic and commercial work across different job sizes.
            </p>
          </div>
          <div className="grid gap-4">
            {strengths.map((item) => (
              <div key={item} className="surface-card construction-panel flex items-start gap-3 p-5">
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                <p className="text-sm leading-6 text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="construction-section construction-section-alt" id="servicii">
        <div className="page-shell">
          <div className="section-header">
            <div>
              <p className="section-kicker">Servicii</p>
              <h2 className="section-title">Services are now framed to support the message that the company can handle almost any building job.</h2>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map(({ title, description, icon: Icon }) => (
              <article key={title} className="surface-card construction-panel service-card p-6">
                <span className="service-icon">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-foreground">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell" id="proiecte">
        <div className="section-header">
          <div>
            <p className="section-kicker">Proiecte</p>
            <h2 className="section-title">Project examples that help the company feel established and versatile.</h2>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <article key={project.title} className="surface-card overflow-hidden">
              <div className="relative aspect-[16/10]">
                <Image
                  src="/placeholder.jpg"
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,16,18,0.06),rgba(14,16,18,0.72))]" />
                <span className="media-badge absolute left-4 top-4">{project.label}</span>
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/70">Proiect 0{index + 1}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">{project.title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-white/78">{project.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="construction-section" id="proces">
        <div className="page-shell">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="section-kicker">Proces</p>
              <h2 className="section-title">A clear process section that makes the company feel organised and easy to work with.</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
                Instead of generic promises, this section shows how enquiries move into planning, quoting, delivery and final handover.
              </p>
            </div>
            <div className="grid gap-4">
              {processSteps.map((step, index) => (
                <div key={step} className="surface-card construction-panel flex gap-4 p-5 sm:p-6">
                  <div className="step-index">{index + 1}</div>
                  <p className="pt-1 text-sm leading-7 text-foreground">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="construction-section construction-section-alt" id="zona">
        <div className="page-shell">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="surface-card construction-panel p-7 sm:p-8">
              <p className="section-kicker">Zona de lucru</p>
              <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
                A simple area section for local trust and quick orientation.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
                The working area is now aligned with Edgware and surrounding parts of London.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {coverage.map((area) => (
                  <span key={area} className="area-chip">
                    {area}
                  </span>
                ))}
              </div>
            </div>
            <div className="surface-card contact-highlight p-7 sm:p-8" id="contact">
              <p className="section-kicker">Contact</p>
              <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">
                Contact rapid pentru lucrari in Edgware si zonele apropiate.
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Trimite datele reale de telefon si email cand le ai, iar sectiunea poate fi actualizata imediat.
              </p>
              <div className="mt-7 grid gap-3">
                <div className="contact-row">
                  <MapPin className="h-4 w-4" />
                  <span>Edgware, London</span>
                </div>
                <div className="contact-row">
                  <Hammer className="h-4 w-4" />
                  <span>Domestic and commercial building work</span>
                </div>
                <div className="contact-row">
                  <Phone className="h-4 w-4" />
                  <span>Numar de telefon de adaugat</span>
                </div>
              </div>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <div className="mini-stat">
                  <ShieldCheck className="h-4 w-4 text-brand" />
                  <span>Quotes available</span>
                </div>
                <div className="mini-stat">
                  <BadgeCheck className="h-4 w-4 text-brand" />
                  <span>Flexible project scope</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
