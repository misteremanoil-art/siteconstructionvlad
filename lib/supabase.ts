import { createClient } from '@supabase/supabase-js'

export type DatabaseArticle = {
  id: string
  slug: string
  title: string
  standfirst: string
  category: string
  author: string
  published_at: string
  display_date: string
  reading_time: string
  image_url: string
  image_alt: string
  tags: string[]
  featured: boolean
  content: string
  status: 'draft' | 'published'
}

export function createSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return null
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
  })
}
