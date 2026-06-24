import { LoginForm } from './login-form'

export const metadata = {
  title: 'Admin Login',
}

export const dynamic = 'force-dynamic'

export default function AdminLoginPage() {
  return <LoginForm />
}
