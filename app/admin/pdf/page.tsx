import { PdfArticleConverter } from './pdf-article-converter'

export const metadata = {
  title: 'PDF în articol',
}

export const dynamic = 'force-dynamic'

export default function PdfArticlePage() {
  return <PdfArticleConverter />
}
