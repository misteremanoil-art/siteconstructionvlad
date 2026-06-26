import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { createSupabaseClient, type DatabaseArticle } from '@/lib/supabase'

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
  audioUrl: string
  tags: string[]
  featured?: boolean
}

export type Article = ArticleMeta & {
  content: string
}

function getLocalArticleSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return []
  return fs
    .readdirSync(ARTICLES_DIR)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''))
}

function getLocalArticle(slug: string): Article | null {
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
    audioUrl: data.audioUrl ?? '',
    tags: data.tags ?? [],
    featured: data.featured ?? false,
    content,
  }
}

function getLocalAllArticles(): Article[] {
  return getLocalArticleSlugs()
    .map((slug) => getLocalArticle(slug))
    .filter((a): a is Article => a !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

function fromDatabaseArticle(article: DatabaseArticle): Article {
  return {
    slug: article.slug,
    title: article.title,
    standfirst: article.standfirst,
    category: article.category,
    author: article.author,
    date: article.published_at,
    displayDate: article.display_date || article.published_at,
    readingTime: article.reading_time,
    image: article.image_url,
    imageAlt: article.image_alt || article.title,
    audioUrl: article.audio_url ?? '',
    tags: article.tags ?? [],
    featured: article.featured,
    content: article.content,
  }
}

async function getDatabaseArticles() {
  const supabase = createSupabaseClient()
  if (!supabase) return null

  const orderedQuery = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .order('display_order', { ascending: true, nullsFirst: false })
    .order('published_at', { ascending: false })

  const fallbackQuery = orderedQuery.error
    ? await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
    : orderedQuery

  const { data, error } = fallbackQuery

  if (error || !data?.length) return null

  return (data as DatabaseArticle[]).map(fromDatabaseArticle)
}

export async function getArticleSlugs(): Promise<string[]> {
  const articles = await getDatabaseArticles()
  if (articles) return articles.map((article) => article.slug)

  return getLocalArticleSlugs()
}

export async function getArticle(slug: string): Promise<Article | null> {
  const supabase = createSupabaseClient()

  if (supabase) {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle()

    if (!error && data) {
      return fromDatabaseArticle(data as DatabaseArticle)
    }
  }

  return getLocalArticle(slug)
}

export async function getAllArticles(): Promise<Article[]> {
  const articles = await getDatabaseArticles()
  if (articles) return articles

  return getLocalAllArticles()
}

export async function getFeaturedArticle(): Promise<Article | null> {
  const all = await getAllArticles()
  return all.find((a) => a.featured) ?? all[0] ?? null
}

function normalize(value: string) {
  return value
    .toLocaleLowerCase('ro-RO')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function getSearchText(article: Article) {
  return [
    article.title,
    article.standfirst,
    article.category,
    article.author,
    article.displayDate,
    article.readingTime,
    article.tags.join(' '),
    article.content,
  ].join(' ')
}

function getSearchScore(article: Article, query: string) {
  const normalizedQuery = normalize(query)
  const title = normalize(article.title)
  const standfirst = normalize(article.standfirst)
  const tags = normalize(article.tags.join(' '))
  const fullText = normalize(getSearchText(article))

  if (!fullText.includes(normalizedQuery)) return 0

  let score = 1
  if (title.includes(normalizedQuery)) score += 8
  if (standfirst.includes(normalizedQuery)) score += 4
  if (tags.includes(normalizedQuery)) score += 3

  return score
}

export async function searchArticles(query: string): Promise<Article[]> {
  const trimmedQuery = query.trim()
  if (!trimmedQuery) return []

  const supabase = createSupabaseClient()

  if (supabase) {
    const { data, error } = await supabase.rpc('search_published_articles', {
      search_query: trimmedQuery,
    })

    if (!error && data?.length) {
      return (data as DatabaseArticle[]).map(fromDatabaseArticle)
    }
  }

  return (await getAllArticles())
    .map((article) => ({
      article,
      score: getSearchScore(article, trimmedQuery),
    }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((result) => result.article)
}
