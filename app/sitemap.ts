import type { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/articles'
import { getSiteUrl, safeDate } from '@/lib/seo'
import { getAllVideos } from '@/lib/videos'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl()
  const [articles, videos] = await Promise.all([getAllArticles(), getAllVideos()])

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/articole',
    '/video',
    '/conversatii',
    '/despre',
    '/donatii',
    '/termeni',
    '/confidentialitate',
    '/politica-cookie',
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.7,
  }))

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${siteUrl}/articole/${article.slug}`,
    lastModified: safeDate(article.date),
    changeFrequency: 'monthly',
    priority: article.featured ? 0.9 : 0.75,
  }))

  const videoRoutes: MetadataRoute.Sitemap = videos.map((video) => ({
    url: `${siteUrl}/video/${video.slug}`,
    lastModified: safeDate(video.date),
    changeFrequency: 'monthly',
    priority: video.featured ? 0.8 : 0.65,
  }))

  return [...staticRoutes, ...articleRoutes, ...videoRoutes]
}
