import { createSupabaseClient, type DatabaseVideo } from '@/lib/supabase'

export type VideoItem = {
  id?: string
  slug: string
  title: string
  description: string
  platform: 'YouTube' | 'Facebook' | 'TV'
  href: string
  embedUrl?: string
  thumbnailUrl?: string
  date: string
  duration?: string
  featured?: boolean
  context: string
  status?: 'draft' | 'published'
}

export const fallbackVideos: VideoItem[] = [
  {
    slug: 'frustrarea-credinciosului',
    title: 'Frustrarea credinciosului. Este normal să fii supărat pe Dumnezeu?',
    description:
      'Reflecții biblice despre tensiunea sinceră dintre credință, suferință și întrebările adresate lui Dumnezeu.',
    platform: 'TV',
    href: 'https://www.sperantatv.ro/reflectii-biblice-frustrarea-credinciosului-este-normal-sa-fii-suparat-pe-dumnezeu-invitati-lucian-tomoiaga-albert-cucu/',
    embedUrl: 'https://www.youtube.com/embed/YSn1IGk4FjU',
    thumbnailUrl: 'https://www.sperantatv.ro/wp-content/uploads/2026/01/yt-thumb-eb038d95.jpg',
    date: '2026',
    duration: 'Reflecții biblice',
    featured: true,
    context: 'Speranța TV',
  },
  {
    slug: 'ispita-succesului',
    title: 'Ispita succesului',
    description:
      'Un episod despre felul în care succesul poate deveni o presiune spirituală și morală atunci când își pierde locul firesc.',
    platform: 'TV',
    href: 'https://www.sperantatv.ro/reflectii-biblice-ispita-succesului-invitati-lucian-tomoiaga-albert-cucu/',
    embedUrl: 'https://www.youtube.com/embed/Q5qcaZYsloY',
    thumbnailUrl: 'https://www.sperantatv.ro/wp-content/uploads/2026/03/yt-thumb-a5a56085.jpg',
    date: '2026',
    duration: 'Reflecții biblice',
    context: 'Speranța TV',
  },
  {
    slug: 'lumea-si-influenta-ei-1',
    title: 'Lumea și influența ei (I). Cum te schimbă lumea fără să-ți dai seama?',
    description:
      'O conversație despre influențele subtile care modelează gândirea, valorile și viața spirituală.',
    platform: 'TV',
    href: 'https://www.sperantatv.ro/reflectii-biblice-lumea-si-influenta-ei-i-cum-te-schimba-lumea-fara-sa-ti-dai-seama-invitati-gabriel-stefanita-albert-cucu/',
    embedUrl: 'https://www.youtube.com/embed/SDIH352iom4',
    thumbnailUrl: 'https://www.sperantatv.ro/wp-content/uploads/2026/05/yt-thumb-0c917ce7.jpg',
    date: '2026',
    duration: 'Reflecții biblice',
    context: 'Speranța TV',
  },
  {
    slug: 'lumea-si-influenta-ei-2',
    title: 'Lumea și influența ei (II)',
    description:
      'Continuarea discuției despre influența lumii asupra identității, alegerilor și sensibilității spirituale.',
    platform: 'YouTube',
    href: 'https://youtu.be/USz-NuNkd_c',
    embedUrl: 'https://www.youtube.com/embed/USz-NuNkd_c',
    thumbnailUrl: 'https://i.ytimg.com/vi/USz-NuNkd_c/hqdefault.jpg',
    date: '2026',
    duration: 'Reflecții biblice, s02 ep. 34',
    context: 'Proiect M',
  },
  {
    slug: 'de-ce-ne-am-pierdut-rabdarea',
    title: 'De ce ne-am pierdut răbdarea?',
    description:
      'Un dialog despre ritmul vieții moderne, nerăbdare și felul în care se poate trăi mai așezat.',
    platform: 'YouTube',
    href: 'https://youtu.be/pPgJvcDAJWI',
    embedUrl: 'https://www.youtube.com/embed/pPgJvcDAJWI',
    thumbnailUrl: 'https://i.ytimg.com/vi/pPgJvcDAJWI/hqdefault.jpg',
    date: '2026',
    duration: 'Se poate altfel, s01 ep. 08',
    context: 'Proiect M',
  },
  {
    slug: 'dumnezeu-bun-potop-global',
    title: 'De ce un Dumnezeu bun trimite un potop global',
    description:
      'O discuție biblică despre judecată, bunătatea lui Dumnezeu și întrebările dificile ridicate de textul Scripturii.',
    platform: 'YouTube',
    href: 'https://youtu.be/uUiw-8nhdJk',
    embedUrl: 'https://www.youtube.com/embed/uUiw-8nhdJk',
    thumbnailUrl: 'https://i.ytimg.com/vi/uUiw-8nhdJk/hqdefault.jpg',
    date: '2026',
    duration: 'Vorbe din Text, s01 ep. 10',
    context: 'Proiect M',
  },
]

function fromDatabaseVideo(video: DatabaseVideo): VideoItem {
  return {
    id: video.id,
    slug: video.slug,
    title: video.title,
    description: video.description,
    platform: video.platform,
    href: video.href,
    embedUrl: video.embed_url,
    thumbnailUrl: video.thumbnail_url,
    date: video.published_at,
    duration: video.duration,
    featured: video.featured,
    context: video.context,
    status: video.status,
  }
}

async function getDatabaseVideos() {
  const supabase = createSupabaseClient()
  if (!supabase) return null

  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (error || !data?.length) return null

  return (data as DatabaseVideo[]).map(fromDatabaseVideo)
}

export async function getAllVideos(): Promise<VideoItem[]> {
  return (await getDatabaseVideos()) ?? fallbackVideos
}

export async function getFeaturedVideo(): Promise<VideoItem | null> {
  const all = await getAllVideos()
  return all.find((video) => video.featured) ?? all[0] ?? null
}

export async function getVideoBySlug(slug: string): Promise<VideoItem | null> {
  const supabase = createSupabaseClient()

  if (supabase) {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .maybeSingle()

    if (!error && data) {
      return fromDatabaseVideo(data as DatabaseVideo)
    }
  }

  return fallbackVideos.find((video) => video.slug === slug) ?? null
}
