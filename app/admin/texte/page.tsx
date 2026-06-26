import { SiteTextsEditor } from './site-texts-editor'

export const metadata = {
  title: 'Texte site',
}

export const dynamic = 'force-dynamic'

export default function AdminSiteTextsPage() {
  return <SiteTextsEditor />
}
