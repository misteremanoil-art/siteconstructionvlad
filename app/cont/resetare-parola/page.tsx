import { PasswordResetRequestForm } from './password-reset-request-form'

export const metadata = {
  title: 'Resetare parolă',
}

export const dynamic = 'force-dynamic'

export default function PasswordResetPage() {
  return <PasswordResetRequestForm />
}
