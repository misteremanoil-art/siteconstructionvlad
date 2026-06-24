import { ArticleEditor } from '../article-editor'

export const metadata = {
  title: 'Editează articol',
}

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <ArticleEditor articleId={id} />
}
