import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Hammer,
  Home,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react'

const services = [
  {
    title: 'Renovations',
    description: 'Complete property refreshes, structural changes, plastering, flooring, decorating and final finishes.',
    icon: Hammer,
  },
  {
    title: 'Kitchens & bathrooms',
    description: 'Careful fitting, tiling, plumbing coordination and detail-led finishing for the busiest rooms in the home.',
    icon: Sparkles,
  },
  {
    title: 'Extensions',
    description: 'Practical new space for London homes, from groundwork and shell construction through to interior completion.',
    icon: Home,
  },
  {
    title: 'General building',
    description: 'Domestic and commercial building work, repairs, conversions, exterior upgrades and planned improvements.',
    icon: Building2,
  },
]

const gallery = [
  {
    title: 'Home extensions',
    label: 'Structural work',
    image: '/images/vppconstruct-extension.png',
  },
  {
    title: 'Interior renovations',
    label: 'Finishing work',
    image: '/images/vppconstruct-interior.png',
  },
]

const reasons = [
  'Organised quotation process',
  'Residential and commercial work',
  'Clean, practical site management',
  'Flexible scope from small repairs to larger projects',
]

const coverage = ['Edgware', 'Barnet', 'Harrow', 'Brent', 'Hendon', 'Mill Hill', 'North London', 'North West London']

export default function HomePage() {
  return (
    <main className="construction-page">
      <section className="hero-band" id="top">
        <div className="hero-overlay">
          <div className="page-shell hero-shell">
            <div className="hero-copy">
              <p className="hero-pill">Renovations · Kitchens · Bathrooms · Extensions</p>
              <h1 className="hero-title">
                Premium building and renovation work across Edgware & London.
              </h1>
              <p className="hero-intro">
                VPPCONSTRUCT LTD delivers general building, renovation, fit-out and finishing work
                for homeowners and commercial clients who want clear communication and reliable execution.
              </p>
              <div className="hero-actions">
                <Link href="#contact" className="primary-action">
                  Request a free quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="https://wa.me/447466206758" className="secondary-action">
                  <MessageCircle className="h-4 w-4" />
                  Message me on WhatsApp
                </Link>
              </div>
              <div className="hero-stats" aria-label="Company highlights">
                <div>
                  <strong>50+</strong>
                  <span>projects handled</span>
                </div>
                <div>
                  <strong>8</strong>
                  <span>local areas covered</span>
                </div>
                <div>
                  <strong>All-in</strong>
                  <span>building service</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell split-section" id="despre">
        <div>
          <p className="section-kicker">About VPPCONSTRUCT LTD</p>
          <h2 className="section-title">
            A local building team for complete renovations and practical construction work.
          </h2>
        </div>
        <div className="section-copy">
          <p>
            The site is now focused on VPPCONSTRUCT LTD as a broad, capable building company in
            Edgware. The message is simple: one team for renovations, extensions, kitchens,
            bathrooms, exterior work and general building jobs.
          </p>
          <p>
            This keeps the business away from the old content structure and presents it like a clean,
            premium construction website built for enquiries.
          </p>
        </div>
      </section>

      <section className="dark-section" id="servicii">
        <div className="page-shell">
          <div className="section-header">
            <div>
              <p className="section-kicker">Services</p>
              <h2 className="section-title">Building services shaped around real projects.</h2>
            </div>
            <Link href="#contact" className="text-action">
              Start an enquiry
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="service-grid">
            {services.map(({ title, description, icon: Icon }) => (
              <article key={title} className="service-card">
                <span className="service-icon">
                  <Icon className="h-5 w-5" />
                </span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell" id="proiecte">
        <div className="section-header">
          <div>
            <p className="section-kicker">Project focus</p>
            <h2 className="section-title">Renovations, extensions and detailed finishing.</h2>
          </div>
        </div>
        <div className="gallery-grid">
          {gallery.map((item) => (
            <article key={item.title} className="project-card">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="project-card-overlay">
                <span>{item.label}</span>
                <h3>{item.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="feature-band" id="proces">
        <div className="page-shell feature-grid">
          <div>
            <p className="section-kicker">Why choose us</p>
            <h2 className="section-title">
              Clear stages, tidy execution and flexible construction support.
            </h2>
            <p className="feature-copy">
              From the first conversation to final handover, the work is presented around practical
              planning, realistic quotations and consistent attention to finishing details.
            </p>
          </div>
          <div className="reason-list">
            {reasons.map((reason) => (
              <div key={reason} className="reason-row">
                <CheckCircle2 className="h-5 w-5" />
                <span>{reason}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell area-contact-grid" id="zona">
        <div className="area-panel">
          <p className="section-kicker">Service area</p>
          <h2 className="section-title">Based around Edgware and nearby London areas.</h2>
          <p>
            The site keeps the local focus clear, while still showing that VPPCONSTRUCT LTD can
            support different types of residential and commercial work.
          </p>
          <div className="area-chips">
            {coverage.map((area) => (
              <span key={area} className="area-chip">
                {area}
              </span>
            ))}
          </div>
        </div>

        <div className="contact-panel" id="contact">
          <p className="section-kicker">Contact</p>
          <h2>Request a free quote.</h2>
          <p>
            Call directly or send a WhatsApp message with a few details about the project, location
            and preferred timing.
          </p>
          <div className="contact-list">
            <div className="contact-row">
              <MapPin className="h-5 w-5" />
              <span>Edgware, London</span>
            </div>
            <a className="contact-row" href="tel:07466206758">
              <Phone className="h-5 w-5" />
              <span>07466 206758</span>
            </a>
            <a className="contact-row" href="https://wa.me/447466206758">
              <MessageCircle className="h-5 w-5" />
              <span>Message me on WhatsApp</span>
            </a>
            <div className="contact-row">
              <Mail className="h-5 w-5" />
              <span>Email address to be added</span>
            </div>
            <div className="contact-row">
              <ShieldCheck className="h-5 w-5" />
              <span>Domestic and commercial work</span>
            </div>
            <div className="contact-row">
              <Wrench className="h-5 w-5" />
              <span>Renovations, extensions and general building</span>
            </div>
            <div className="contact-row">
              <BadgeCheck className="h-5 w-5" />
              <span>Flexible project scope</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
