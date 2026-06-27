import type { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/seo'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl()
  const lastModified = new Date('2026-06-27')

  return [
    { path: '', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/termeni', priority: 0.4, changeFrequency: 'yearly' as const },
    { path: '/confidentialitate', priority: 0.4, changeFrequency: 'yearly' as const },
    { path: '/politica-cookie', priority: 0.4, changeFrequency: 'yearly' as const },
  ].map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
