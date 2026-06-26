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
  audio_url: string
  tags: string[]
  featured: boolean
  content: string
  status: 'draft' | 'published'
}

export type DatabaseVideo = {
  id: string
  slug: string
  title: string
  description: string
  platform: 'YouTube' | 'Facebook' | 'TV'
  href: string
  embed_url: string
  thumbnail_url: string
  published_at: string
  duration: string
  featured: boolean
  context: string
  status: 'draft' | 'published'
  created_at: string
  updated_at: string
}

export type DatabaseSiteText = {
  key: string
  value: string
  group_label: string
  description: string
  updated_at: string
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
