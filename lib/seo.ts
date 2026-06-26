export const siteName = 'Albert-Beniamin Cucu'

export const siteDescription =
  'Eseuri, reflecții biblice, conversații audio și apariții video despre teologie, credință, rugăciune și viață spirituală.'

export function getSiteUrl() {
  const rawUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '') ||
    'http://localhost:3000'

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
