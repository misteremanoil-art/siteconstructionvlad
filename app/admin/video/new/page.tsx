import { VideoEditor } from '../video-editor'

export const metadata = {
  title: 'Video nou',
}

export const dynamic = 'force-dynamic'

export default function NewVideoPage() {
  return <VideoEditor />
}
