import type { Metadata } from 'next'
import Link from 'next/link'
import { ExternalLink, Headphones, Radio } from 'lucide-react'
import { conversations, type ConversationItem } from '@/lib/conversations'

export const metadata: Metadata = {
  title: 'Conversații — Albert-Beniamin Cucu',
  description:
    'Emisiuni audio, dialoguri și reflecții biblice cu Albert-Beniamin Cucu.',
}

export default function ConversatiiPage() {
  const featured = conversations[0]
  const rest = conversations.slice(1)

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-brand">
            Audio
          </p>
          <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-foreground text-balance sm:text-5xl">
            Conversații
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Emisiuni audio, reflecții biblice și dialoguri despre credință, Scriptură și viața
            spirituală.
          </p>
        </div>

        {featured ? <FeaturedConversation conversation={featured} /> : null}
      </section>

      <section className="mt-14" aria-label="Arhivă conversații">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand">
            <Headphones className="h-5 w-5" />
          </span>
          <h2 className="font-serif text-2xl font-semibold text-foreground">
            Arhivă audio
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {rest.map((conversation) => (
            <ConversationCard key={conversation.slug} conversation={conversation} />
          ))}
        </div>
      </section>
    </main>
  )
}

function FeaturedConversation({ conversation }: { conversation: ConversationItem }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-brand/25 bg-card shadow-sm">
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
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline"
        >
          Deschide sursa RVS
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>
    </article>
  )
}

function ConversationCard({ conversation }: { conversation: ConversationItem }) {
  return (
    <article className="group rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-brand/40 hover:bg-brand/5 hover:shadow-md">
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
        className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline"
      >
        Sursa RVS
        <ExternalLink className="h-4 w-4" />
      </Link>
    </article>
  )
}
