import { ArticleEditor } from '../article-editor'

export const metadata = {
  title: 'Articol nou',
}

export const dynamic = 'force-dynamic'

export default function NewArticlePage() {
  return <ArticleEditor />
}
