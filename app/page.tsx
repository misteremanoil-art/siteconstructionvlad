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
import { projects } from '@/lib/projects'

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

const reasons = [
  'Organised quotation process',
  'Residential and commercial work',
  'Clean, practical site management',
  'Flexible scope from small repairs to larger projects',
]

const testimonials = [
  {
    name: 'M. Harris',
    initials: 'MH',
    project: 'Bathroom floor renovation · Edgware',
    quote: 'Reliable, tidy and easy to speak with. The work was explained clearly and the bathroom floor was left with a clean finish.',
  },
  {
    name: 'A. Patel',
    initials: 'AP',
    project: 'Kitchen flooring · North West London',
    quote: 'Good communication from start to finish. Small changes were handled sensibly and the new kitchen floor looks much neater.',
  },
  {
    name: 'D. Collins',
    initials: 'DC',
    project: 'Garden fencing · Barnet area',
    quote: 'Turned up when agreed, cleared the garden properly and left the new fence line looking organised and well finished.',
  },
]

const coverage = ['Edgware', 'HA8', 'Barnet', 'Harrow', 'Hendon', 'Mill Hill', 'Stanmore', 'Wembley', 'Finchley', 'North West London']
const featuredProjects = projects.slice(-4)

export default function HomePage() {
  return (
    <main className="construction-page">
      <section className="hero-band" id="top">
        <div className="hero-overlay">
          <div className="page-shell hero-shell">
            <div className="hero-copy">
              <p className="hero-pill">VPPCONSTRUCT LTD · Edgware & North West London</p>
              <h1 className="hero-title">
                Renovation work that looks sharp and lasts.
              </h1>
              <p className="hero-intro">
                Clean, practical building and finishing work for homes and commercial spaces:
                bathrooms, kitchens, flooring, media walls, fencing and full renovation support.
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
              <div className="hero-trust-row" aria-label="Work standards">
                {['Clean finish', 'Clear communication', 'Detailed workmanship'].map((item) => (
                  <span key={item}>
                    <BadgeCheck className="h-4 w-4" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="hero-showcase" aria-label="Recent project highlights">
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
              <Link href="/projects/bespoke-media-wall-installation" className="hero-project-card">
                <span>Featured project</span>
                <strong>Bespoke media wall with LED lighting</strong>
                <small>View project</small>
              </Link>
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
            <h2 className="section-title">Recent project work with clear before and after progress.</h2>
          </div>
          <Link href="/projects" className="text-action">
            View projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="home-project-grid">
          {featuredProjects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="home-project-card"
            >
              <span className="home-project-topline">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <ArrowRight className="h-4 w-4" />
              </span>
              <div className="home-project-image">
                <Image
                  src={project.heroImage}
                  alt={project.shortTitle}
                  fill
                  sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="home-project-copy">
                <p>{project.category}</p>
                <h3>{project.shortTitle}</h3>
                <span>{project.summary}</span>
              </div>
            </Link>
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

      <section className="page-shell testimonials-section" aria-labelledby="testimonials-title">
        <div className="section-header">
          <div>
            <p className="section-kicker">Local feedback</p>
            <h2 className="section-title" id="testimonials-title">
              Recent client feedback from local building work.
            </h2>
          </div>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
            <figure key={testimonial.name} className="testimonial-card">
              <div className="testimonial-top">
                <span className="testimonial-avatar">{testimonial.initials}</span>
                <div>
                  <figcaption>{testimonial.name}</figcaption>
                  <p>{testimonial.project}</p>
                </div>
              </div>
              <div className="testimonial-stars" aria-label="5 star feedback">
                {'★★★★★'}
              </div>
              <blockquote>“{testimonial.quote}”</blockquote>
              <span className="testimonial-note">Local project feedback</span>
            </figure>
          ))}
        </div>
      </section>

      <section className="page-shell area-contact-grid" id="area">
        <div className="area-panel">
          <p className="section-kicker">Service area</p>
          <h2 className="section-title">Edgware, HA8 9LS</h2>
          <p>
            Based in Edgware and covering nearby North West London areas for renovations, kitchens,
            bathrooms, extensions and general building work.
          </p>
          <div className="area-chips">
            {coverage.map((area) => (
              <span key={area} className="area-chip">
                {area}
              </span>
            ))}
          </div>
          <div className="area-meta">
            <div className="area-meta-icon">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <span>Base postcode</span>
              <strong>HA8 9LS · Edgware</strong>
            </div>
          </div>
          <Link href="#contact" className="area-action">
            Check coverage
            <ArrowRight className="h-4 w-4" />
          </Link>
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
