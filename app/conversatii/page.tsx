import type { Metadata } from 'next'
import Link from 'next/link'
import { ExternalLink, Radio } from 'lucide-react'
import { conversations, type ConversationItem } from '@/lib/conversations'
import { getSiteTexts } from '@/lib/site-texts'

export const metadata: Metadata = {
  title: 'Conversații — Albert-Beniamin Cucu',
  description:
    'Emisiuni audio, dialoguri și reflecții biblice cu Albert-Beniamin Cucu.',
}

export const dynamic = 'force-dynamic'

export default async function ConversatiiPage() {
  const featured = conversations[0]
  const rest = conversations.slice(1)
  const texts = await getSiteTexts([
    'conversations.kicker',
    'conversations.title',
    'conversations.description',
    'conversations.archive_title',
    'conversations.archive_kicker',
    'conversations.source_featured',
    'conversations.source_card',
  ])

  return (
    <main className="page-shell">
      <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p className="page-kicker">
            {texts['conversations.kicker']}
          </p>
          <h1 className="page-title mt-4">
            {texts['conversations.title']}
          </h1>
          <p className="page-intro mt-5 max-w-2xl">
            {texts['conversations.description']}
          </p>
        </div>

        {featured ? (
          <FeaturedConversation
            conversation={featured}
            sourceLabel={texts['conversations.source_featured']}
          />
        ) : null}
      </section>

      <section className="mt-14" aria-label="Arhivă conversații">
        <div className="section-header">
          <div>
          <p className="section-kicker">{texts['conversations.archive_kicker']}</p>
          <h2 className="section-title">
            {texts['conversations.archive_title']}
          </h2>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {rest.map((conversation) => (
            <ConversationCard
              key={conversation.slug}
              conversation={conversation}
              sourceLabel={texts['conversations.source_card']}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

function FeaturedConversation({
  conversation,
  sourceLabel,
}: {
  conversation: ConversationItem
  sourceLabel: string
}) {
  return (
    <article className="surface-card overflow-hidden border-brand/25">
      <div className="bg-[linear-gradient(135deg,var(--foreground),var(--brand))] px-6 py-7 text-white sm:px-8">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/75">
          <Radio className="h-4 w-4" />
          {conversation.show}
        </div>
        <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-balance">
          {conversation.title}
        </h2>
        <p className="mt-3 text-sm text-white/75">{conversation.date}</p>
      </div>
      <div className="p-6 sm:p-8">
        <p className="leading-relaxed text-muted-foreground">{conversation.description}</p>
        <audio controls preload="none" className="mt-6 w-full">
          <source src={conversation.audioUrl} type="audio/mpeg" />
        </audio>
        <Link
          href={conversation.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="text-action mt-5"
        >
          {sourceLabel}
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>
    </article>
  )
}

function ConversationCard({
  conversation,
  sourceLabel,
}: {
  conversation: ConversationItem
  sourceLabel: string
}) {
  return (
    <article className="surface-card group p-5 transition-all hover:-translate-y-1 hover:border-brand/40 hover:bg-brand/5 hover:shadow-md">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-wide text-muted-foreground">
        <span className="text-brand">{conversation.show}</span>
        <span>{conversation.date}</span>
      </div>
      <h3 className="mt-3 font-serif text-2xl font-semibold leading-snug text-foreground transition-colors group-hover:text-brand">
        {conversation.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {conversation.description}
      </p>
      <audio controls preload="none" className="mt-5 w-full">
        <source src={conversation.audioUrl} type="audio/mpeg" />
      </audio>
      <Link
        href={conversation.sourceUrl}
        target="_blank"
        rel="noreferrer"
        className="text-action mt-4"
      >
        {sourceLabel}
        <ExternalLink className="h-4 w-4" />
      </Link>
    </article>
  )
}
