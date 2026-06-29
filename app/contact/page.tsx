import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BadgeCheck, Clock3, MapPin, MessageCircle, Phone, ShieldCheck } from 'lucide-react'
import { ContactForm } from '@/components/contact-form'

export const metadata: Metadata = {
  title: 'Contact VPPCONSTRUCT LTD',
  description:
    'Request a free quote from VPPCONSTRUCT LTD for driveways, roofing, extensions, renovations and general building work in Edgware and North West London.',
  alternates: {
    canonical: '/contact',
  },
}

const highlights = ['Free quote request', 'Edgware based', 'North West London coverage']

const steps = [
  'Send the project details',
  'We review the scope and location',
  'You receive a clear response',
]

export default function ContactPage() {
  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="page-shell contact-hero-shell">
          <div>
            <p className="page-kicker">Contact VPPCONSTRUCT LTD</p>
            <h1 className="page-title">Tell us about the work you need done.</h1>
            <p className="contact-hero-copy">
              Request a quote for driveways, roofing, extensions, renovations, landscaping and
              general building work across Edgware and North West London.
            </p>
            <div className="contact-hero-tags">
              {highlights.map((item) => (
                <span key={item}>
                  <BadgeCheck className="h-4 w-4" />
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="contact-hero-card">
            <span>Fastest option</span>
            <strong>Call or WhatsApp for urgent enquiries.</strong>
            <div className="contact-hero-actions">
              <Link href="tel:07466206758">
                <Phone className="h-4 w-4" />
                07466 206758
              </Link>
              <Link href="https://wa.me/447466206758?text=Hi%2C%20I%27d%20like%20a%20quote%20for%20building%2Frenovation%20work%20in%20London.">
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell contact-layout">
        <aside className="contact-info-panel" aria-label="Contact details">
          <div className="contact-info-card">
            <Phone className="h-5 w-5" />
            <span>Phone</span>
            <Link href="tel:07466206758">07466 206758</Link>
          </div>
          <div className="contact-info-card">
            <MessageCircle className="h-5 w-5" />
            <span>WhatsApp</span>
            <Link href="https://wa.me/447466206758?text=Hi%2C%20I%27d%20like%20a%20quote%20for%20building%2Frenovation%20work%20in%20London.">
              Send a message
            </Link>
          </div>
          <div className="contact-info-card">
            <MapPin className="h-5 w-5" />
            <span>Base</span>
            <strong>Edgware, HA8 9LS</strong>
          </div>
          <div className="contact-response-card">
            <p className="section-kicker">What happens next</p>
            <div className="contact-steps">
              {steps.map((step, index) => (
                <div key={step}>
                  <span>{index + 1}</span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <div className="contact-form-panel">
          <div className="contact-form-heading">
            <div>
              <p className="section-kicker">Free quote</p>
              <h2>Send your enquiry</h2>
            </div>
            <ShieldCheck className="h-7 w-7" />
          </div>
          <p>
            Add the location, type of work and any useful details. Your message goes privately to
            the team and your email address is not shown on the website.
          </p>
          <ContactForm />
          <div className="contact-form-footnote">
            <Clock3 className="h-4 w-4" />
            <span>For urgent work, calling or WhatsApp is usually quicker.</span>
          </div>
        </div>
      </section>
    </main>
  )
}
