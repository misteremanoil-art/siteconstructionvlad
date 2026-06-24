import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const ARTICLES_DIR = path.join(process.cwd(), 'content', 'articole')

export type ArticleMeta = {
  slug: string
  title: string
  standfirst: string
  category: string
  author: string
  date: string
  displayDate: string
  readingTime: string
  image: string
  imageAlt: string
  tags: string[]
  featured?: boolean
}

export type Article = ArticleMeta & {
  content: string
}

export function getArticleSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return []
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''))
}

export function getArticle(slug: string): Article | null {
  const fullPath = path.join(ARTICLES_DIR, `${slug}.mdx`)
  if (!fs.existsSync(fullPath)) return null

  const raw = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(raw)

  return {
    slug,
    title: data.title ?? '',
    standfirst: data.standfirst ?? '',
    category: data.category ?? 'Teologie',
    author: data.author ?? 'Albert-Beniamin Cucu',
    date: data.date ?? '',
    displayDate: data.displayDate ?? data.date ?? '',
    readingTime: data.readingTime ?? '',
    image: data.image ?? '',
    imageAlt: data.imageAlt ?? data.title ?? '',
    tags: data.tags ?? [],
    featured: data.featured ?? false,
    content,
  }
}

export function getAllArticles(): Article[] {
  return getArticleSlugs()
    .map((slug) => getArticle(slug))
    .filter((a): a is Article => a !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getFeaturedArticle(): Article | null {
  const all = getAllArticles()
  return all.find((a) => a.featured) ?? all[0] ?? null
}
