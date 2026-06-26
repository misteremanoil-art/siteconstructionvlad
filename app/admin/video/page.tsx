import Link from 'next/link'
import { VideoAdminList } from './video-admin-list'

export const metadata = {
  title: 'Admin video',
}

export const dynamic = 'force-dynamic'

export default function AdminVideoPage() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-16">
      <div className="flex flex-col gap-4 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">
            Admin
          </p>
          <h1 className="mt-3 font-serif text-4xl">Video</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin"
            className="rounded-full border border-border px-5 py-2.5 text-sm font-medium"
          >
            Articole
          </Link>
          <Link
            href="/admin/organizator"
            className="rounded-full border border-border px-5 py-2.5 text-sm font-medium"
          >
            Organizator
          </Link>
          <Link
            href="/admin/video/new"
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground"
          >
            Video nou
          </Link>
        </div>
      </div>
      <VideoAdminList />
    </main>
  )
}
