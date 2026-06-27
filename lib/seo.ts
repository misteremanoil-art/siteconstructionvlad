export const siteName = 'VPPCONSTRUCT LTD'

export const siteTitle = 'Builder in Edgware | Renovations, Kitchens, Bathrooms & Extensions'

export const siteDescription =
  'VPPCONSTRUCT LTD is a local builder in Edgware offering renovations, kitchens, bathrooms, extensions and general building work across North West London.'

export const siteKeywords = [
  'builder in Edgware',
  'builders Edgware',
  'renovations Edgware',
  'kitchen fitters Edgware',
  'bathroom renovations Edgware',
  'house extensions Edgware',
  'general builder North West London',
  'construction company London',
  'VPPCONSTRUCT LTD',
]

export const phoneDisplay = '07466 206758'
export const phoneInternational = '+447466206758'
export const whatsappUrl =
  'https://wa.me/447466206758?text=Hi%2C%20I%27d%20like%20a%20quote%20for%20building%2Frenovation%20work%20in%20London.'

export const primaryArea = 'Edgware, London'
export const serviceAreas = [
  'Edgware',
  'Barnet',
  'Harrow',
  'Brent',
  'Hendon',
  'Mill Hill',
  'North London',
  'North West London',
]

export const services = [
  'Renovations',
  'Kitchen fitting',
  'Bathroom renovations',
  'House extensions',
  'General building',
  'Commercial building work',
]

export function getSiteUrl() {
  const rawUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '') ||
    'https://siteconstructionvlad.vercel.app'

  return rawUrl.replace(/\/$/, '')
}

export function absoluteUrl(path = '/') {
  if (/^https?:\/\//i.test(path)) return path

  const siteUrl = getSiteUrl()
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${siteUrl}${normalizedPath}`
}

export function safeDate(value?: string) {
  if (!value) return new Date()
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? new Date() : date
}
