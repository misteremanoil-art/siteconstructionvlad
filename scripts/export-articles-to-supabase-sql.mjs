import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const root = process.cwd()
const contentDir = path.join(root, 'content', 'articole')
const outputFile = path.join(root, 'supabase', 'seed-articles.sql')

const files = fs
  .readdirSync(contentDir)
  .filter((file) => file.endsWith('.mdx'))
  .sort()

const articles = files.map((file) => {
  const slug = file.replace(/\.mdx$/, '')
  const raw = fs.readFileSync(path.join(contentDir, file), 'utf8')
  const { data, content } = matter(raw)

  return {
    slug,
    title: data.title ?? '',
    standfirst: data.standfirst ?? '',
    category: data.category ?? 'Teologie',
    author: data.author ?? 'Albert-Beniamin Cucu',
    published_at: data.date ?? new Date().toISOString().slice(0, 10),
    display_date: data.displayDate ?? data.date ?? '',
    reading_time: data.readingTime ?? '',
    image_url: data.image ?? '',
    image_alt: data.imageAlt ?? data.title ?? '',
    tags: Array.isArray(data.tags) ? data.tags : [],
    featured: Boolean(data.featured),
    content,
    status: 'published',
  }
})

const json = JSON.stringify(articles, null, 2)

const sql = `-- Generated from content/articole/*.mdx
-- Run supabase/schema.sql before this file.

with article_data as (
  select *
  from jsonb_to_recordset($articles$
${json}
$articles$::jsonb) as article(
    slug text,
    title text,
    standfirst text,
    category text,
    author text,
    published_at date,
    display_date text,
    reading_time text,
    image_url text,
    image_alt text,
    tags text[],
    featured boolean,
    content text,
    status article_status
  )
)
insert into public.articles (
  slug,
  title,
  standfirst,
  category,
  author,
  published_at,
  display_date,
  reading_time,
  image_url,
  image_alt,
  tags,
  featured,
  content,
  status
)
select
  slug,
  title,
  standfirst,
  category,
  author,
  published_at,
  display_date,
  reading_time,
  image_url,
  image_alt,
  tags,
  featured,
  content,
  status
from article_data
on conflict (slug) do update set
  title = excluded.title,
  standfirst = excluded.standfirst,
  category = excluded.category,
  author = excluded.author,
  published_at = excluded.published_at,
  display_date = excluded.display_date,
  reading_time = excluded.reading_time,
  image_url = excluded.image_url,
  image_alt = excluded.image_alt,
  tags = excluded.tags,
  featured = excluded.featured,
  content = excluded.content,
  status = excluded.status;
`

fs.mkdirSync(path.dirname(outputFile), { recursive: true })
fs.writeFileSync(outputFile, sql)

console.log(`Wrote ${outputFile}`)
