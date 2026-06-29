import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, CheckCircle2, MapPin, ShieldCheck } from 'lucide-react'
import { getServicePage, servicePages } from '@/lib/service-pages'
import { primaryArea, serviceAreas } from '@/lib/seo'

type ServicePageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return servicePages.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const service = getServicePage(slug)

  if (!service) {
    return {}
  }

  return {
    title: service.title,
    description: service.metaDescription,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} | VPPCONSTRUCT LTD`,
      description: service.metaDescription,
    },
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params
  const service = getServicePage(slug)

  if (!service) {
    notFound()
  }

  return (
    <main className="service-page">
      <section className="service-detail-hero">
        <div className="page-shell service-detail-hero-shell">
          <div className="service-detail-hero-copy">
            <Link href="/services" className="project-back-link">
              <ArrowLeft className="h-4 w-4" />
              All services
            </Link>
            <p className="page-kicker">{service.eyebrow}</p>
            <h1 className="page-title">{service.title}</h1>
            <p>{service.summary}</p>
            <div className="service-detail-tags">
              {service.highlights.map((item) => (
                <span key={item}>
                  <CheckCircle2 className="h-4 w-4" />
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="service-quote-card">
            <span>Free quote</span>
            <strong>Tell us what you need and where the project is based.</strong>
            <Link href="/contact">
              Request a quote
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="page-shell service-detail-layout">
        <article className="service-main-panel">
          <p className="section-kicker">Service overview</p>
          <h2>Careful work, clear stages and a finish made for everyday use.</h2>
          {service.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="service-area-note">
            <MapPin className="h-4 w-4" />
            Based in {primaryArea}, covering {serviceAreas.slice(0, 6).join(', ')} and nearby areas.
          </div>
        </article>

        <aside className="service-side-panel">
          <p className="section-kicker">Suitable for</p>
          <ul>
            {service.suitableFor.map((item) => (
              <li key={item}>
                <ShieldCheck className="h-4 w-4" />
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="page-shell service-info-grid">
        <div className="service-list-panel">
          <p className="section-kicker">Work included</p>
          <h2>What can be covered</h2>
          <ul>
            {service.included.map((item) => (
              <li key={item}>
                <CheckCircle2 className="h-4 w-4" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="service-process-panel">
          <p className="section-kicker">Process</p>
          <h2>A straightforward way to plan the work</h2>
          <div className="service-process-list">
            {service.process.map((item, index) => (
              <div key={item}>
                <span>{index + 1}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell service-cta-band">
        <div>
          <p className="section-kicker">Start an enquiry</p>
          <h2>Ready to discuss {service.shortTitle.toLowerCase()}?</h2>
          <p>
            Send a few details about the property, the work needed and your preferred timing. Photos
            are helpful if you have them.
          </p>
        </div>
        <Link href="/contact" className="primary-action">
          Request a free quote
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </main>
  )
}
