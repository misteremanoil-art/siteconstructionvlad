import Link from 'next/link'
import { MessageCircle, Phone } from 'lucide-react'

export function MobileStickyCta() {
  return (
    <div className="mobile-sticky-cta" aria-label="Quick contact options">
      <Link href="tel:07466206758" className="mobile-sticky-cta-call">
        <Phone className="h-4 w-4" />
        Call now
      </Link>
      <Link
        href="https://wa.me/447466206758?text=Hi%2C%20I%27d%20like%20a%20quote%20for%20building%2Frenovation%20work%20in%20London."
        className="mobile-sticky-cta-whatsapp"
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp
      </Link>
    </div>
  )
}
