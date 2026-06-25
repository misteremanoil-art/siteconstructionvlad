import { VideoEditor } from '../video-editor'

export const metadata = {
  title: 'Editează video',
}

export const dynamic = 'force-dynamic'

export default async function EditVideoPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <VideoEditor videoId={id} />
}
