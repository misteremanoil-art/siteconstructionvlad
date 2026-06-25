'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import type { DatabaseVideo } from '@/lib/supabase'
import { createBrowserSupabaseClient } from '@/lib/supabase-browser'

export function VideoAdminList() {
  const supabase = useMemo(() => createBrowserSupabaseClient(), [])
  const [videos, setVideos] = useState<DatabaseVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadVideos() {
      const { data: userData } = await supabase.auth.getUser()

      if (!userData.user) {
        setError('Trebuie să fii autentificat.')
        setLoading(false)
        return
      }

      const { data: adminStatus } = await supabase.rpc('is_admin')
      if (!adminStatus) {
        setError('Contul nu are drepturi de admin.')
        setLoading(false)
        return
      }

      const { data, error: videosError } = await supabase
        .from('videos')
        .select('*')
        .order('published_at', { ascending: false })

      if (videosError) {
        setError('Nu pot încărca videoclipurile. Rulează SQL-ul pentru videos în Supabase.')
      } else {
        setVideos((data ?? []) as DatabaseVideo[])
      }

      setLoading(false)
    }

    loadVideos()
  }, [supabase])

  async function deleteVideo(id: string) {
    if (!confirm('Ștergi acest videoclip?')) return

    const { error: deleteError } = await supabase.from('videos').delete().eq('id', id)
    if (deleteError) {
      setError('Nu am putut șterge videoclipul.')
      return
    }

    setVideos((current) => current.filter((video) => video.id !== id))
  }

  if (loading) {
    return <p className="mt-8 text-muted-foreground">Se încarcă...</p>
  }

  if (error) {
    return <p className="mt-8 text-sm text-destructive">{error}</p>
  }

  return (
    <div className="mt-8 divide-y divide-border">
      {videos.length === 0 ? (
        <p className="py-8 text-muted-foreground">
          Nu există încă videoclipuri în Supabase.
        </p>
      ) : null}
      {videos.map((video) => (
        <div
          key={video.id}
          className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              {video.status} • {video.context} • {video.published_at}
            </p>
            <h2 className="mt-1 font-serif text-2xl">{video.title}</h2>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              /video/{video.slug || 'fara-slug'}
            </p>
          </div>
          <div className="flex gap-3">
            {video.status === 'published' && video.slug ? (
              <Link
                href={`/video/${video.slug}`}
                className="text-sm font-medium text-foreground hover:underline"
              >
                Vezi
              </Link>
            ) : null}
            <Link
              href={`/admin/video/${video.id}`}
              className="text-sm font-medium text-brand hover:underline"
            >
              Editează
            </Link>
            <button
              type="button"
              onClick={() => deleteVideo(video.id)}
              className="text-sm font-medium text-destructive hover:underline"
            >
              Șterge
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
