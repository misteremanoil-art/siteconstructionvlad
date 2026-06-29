import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { servicePages } from '@/lib/service-pages'

export const metadata: Metadata = {
  title: 'Building Services in Edgware',
  description:
    'Explore VPPCONSTRUCT LTD services in Edgware and North West London, including driveways, roofing, extensions, renovations, bathrooms and kitchens.',
  alternates: {
    canonical: '/services',
  },
}

export default function ServicesPage() {
  return (
    <main className="construction-page">
      <section className="services-index-hero">
        <div className="page-shell services-index-shell">
          <p className="page-kicker">Services</p>
          <h1 className="page-title">Building work planned around real homes and practical results.</h1>
          <p className="page-intro services-index-intro">
            From driveways and roofing to extensions, renovations, bathrooms and kitchens,
            VPPCONSTRUCT LTD helps clients in Edgware and across North West London with reliable
            building support.
          </p>
        </div>
      </section>

      <section className="page-shell services-index-grid" aria-label="Service pages">
        {servicePages.map((service) => (
          <Link key={service.slug} href={`/services/${service.slug}`} className="service-index-card">
            <div className="service-index-image">
              <Image
                src={service.heroImage}
                alt={service.shortTitle}
                fill
                sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="service-index-copy">
              <p>{service.eyebrow}</p>
              <h2>{service.shortTitle}</h2>
              <span>{service.summary}</span>
              <div>
                <CheckCircle2 className="h-4 w-4" />
                {service.highlights[0]}
              </div>
            </div>
            <span className="service-index-arrow">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </section>
    </main>
  )
}
