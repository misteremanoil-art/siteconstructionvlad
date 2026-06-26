export const contentHoverStyles = [
  {
    card: 'hover:border-brand/60 hover:bg-brand/10',
    badge: 'group-hover:bg-brand group-hover:text-brand-foreground',
    icon: 'group-hover:bg-brand group-hover:text-brand-foreground',
    title: 'group-hover:text-brand',
  },
  {
    card: 'hover:border-emerald-600/45 hover:bg-emerald-500/10',
    badge: 'group-hover:bg-emerald-700 group-hover:text-white',
    icon: 'group-hover:bg-emerald-700 group-hover:text-white',
    title: 'group-hover:text-emerald-700 dark:group-hover:text-emerald-300',
  },
  {
    card: 'hover:border-sky-600/45 hover:bg-sky-500/10',
    badge: 'group-hover:bg-sky-700 group-hover:text-white',
    icon: 'group-hover:bg-sky-700 group-hover:text-white',
    title: 'group-hover:text-sky-700 dark:group-hover:text-sky-300',
  },
  {
    card: 'hover:border-rose-600/45 hover:bg-rose-500/10',
    badge: 'group-hover:bg-rose-700 group-hover:text-white',
    icon: 'group-hover:bg-rose-700 group-hover:text-white',
    title: 'group-hover:text-rose-700 dark:group-hover:text-rose-300',
  },
  {
    card: 'hover:border-violet-600/45 hover:bg-violet-500/10',
    badge: 'group-hover:bg-violet-700 group-hover:text-white',
    icon: 'group-hover:bg-violet-700 group-hover:text-white',
    title: 'group-hover:text-violet-700 dark:group-hover:text-violet-300',
  },
  {
    card: 'hover:border-amber-600/45 hover:bg-amber-500/10',
    badge: 'group-hover:bg-amber-700 group-hover:text-white',
    icon: 'group-hover:bg-amber-700 group-hover:text-white',
    title: 'group-hover:text-amber-700 dark:group-hover:text-amber-300',
  },
]

export function stableIndex(value: string, length: number) {
  return [...value].reduce((sum, char) => sum + char.charCodeAt(0), 0) % length
}

export function getContentHoverStyle(value: string) {
  return contentHoverStyles[stableIndex(value, contentHoverStyles.length)]
}
