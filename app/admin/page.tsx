import { AdminDashboard } from './admin-dashboard'

export const metadata = {
  title: 'Admin',
}

export const dynamic = 'force-dynamic'

export default function AdminPage() {
  return <AdminDashboard />
}
