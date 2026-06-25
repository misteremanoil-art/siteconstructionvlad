export type VideoItem = {
  title: string
  description: string
  platform: 'YouTube' | 'Facebook' | 'TV'
  href: string
  embedUrl?: string
  date: string
  duration?: string
  featured?: boolean
  context: string
}

export const videos: VideoItem[] = [
  {
    title: 'Conversație despre credință, vocație și slujire',
    description:
      'Un dialog amplu despre formarea spirituală, responsabilitatea pastorală și felul în care teologia devine practică în viața comunității.',
    platform: 'YouTube',
    href: 'https://www.youtube.com/',
    date: '2026',
    duration: 'Emisiune',
    featured: true,
    context: 'Interviu',
  },
  {
    title: 'Perspective pastorale pentru comunitatea de azi',
    description:
      'O intervenție despre provocările slujirii contemporane, grija față de oameni și echilibrul dintre rigoare biblică și sensibilitate pastorală.',
    platform: 'YouTube',
    href: 'https://www.youtube.com/',
    date: '2026',
    duration: 'Panel',
    context: 'Emisiune TV',
  },
  {
    title: 'Studiu biblic și viață spirituală',
    description:
      'O discuție despre lectura Scripturii, formarea caracterului și maturizarea credinței în ritmul vieții de zi cu zi.',
    platform: 'YouTube',
    href: 'https://www.youtube.com/',
    date: '2026',
    duration: 'Dialog',
    context: 'Podcast',
  },
]
