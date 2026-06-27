import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Hammer,
  Home,
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
                <Link
                  href="https://wa.me/447466206758?text=Hi%2C%20I%27d%20like%20a%20quote%20for%20building%2Frenovation%20work%20in%20London."
                  className="secondary-action"
                >
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

      <section className="page-shell split-section" id="about">
        <div>
          <p className="section-kicker">About VPPCONSTRUCT LTD</p>
          <h2 className="section-title">
            A practical building team for homes and commercial spaces.
          </h2>
        </div>
        <div className="section-copy">
          <p>
            VPPCONSTRUCT LTD helps clients in and around Edgware with the kind of building work that
            needs care, coordination and a steady pair of hands. From full renovations to smaller
            repairs, the aim is to keep the job clear, tidy and properly finished.
          </p>
          <p>
            You can get in touch for kitchens, bathrooms, extensions, interior upgrades, exterior
            improvements and general construction work. If the job needs a reliable builder, it is
            worth a quick conversation.
          </p>
        </div>
      </section>

      <section className="dark-section" id="services">
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

      <section className="page-shell" id="work">
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

      <section className="feature-band" id="why-us">
        <div className="page-shell feature-grid">
          <div>
            <p className="section-kicker">Why choose us</p>
            <h2 className="section-title">
              Clear stages, tidy execution and flexible construction support.
            </h2>
            <p className="feature-copy">
              From the first conversation to final handover, the focus is on practical planning,
              realistic quotations and finishing details that look right in everyday use.
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

      <section className="page-shell area-contact-grid" id="area">
        <div className="area-panel">
          <p className="section-kicker">Service area</p>
          <h2 className="section-title">Based around Edgware and nearby London areas.</h2>
          <p>
            Most enquiries come from Edgware and nearby parts of London. If your project is close by,
            send a message and the scope can be checked quickly.
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
            <a
              className="contact-row"
              href="https://wa.me/447466206758?text=Hi%2C%20I%27d%20like%20a%20quote%20for%20building%2Frenovation%20work%20in%20London."
            >
              <MessageCircle className="h-5 w-5" />
              <span>Message me on WhatsApp</span>
            </a>
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
