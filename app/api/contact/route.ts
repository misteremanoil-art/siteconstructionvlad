import { NextResponse } from 'next/server'
import { createSupabaseClient } from '@/lib/supabase'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: Request) {
  const supabase = createSupabaseClient()
  if (!supabase) {
    return NextResponse.json(
      { error: 'Formularul de contact nu este configurat încă.' },
      { status: 503 },
    )
  }

  const body = (await request.json().catch(() => null)) as {
    name?: string
    email?: string
    message?: string
  } | null

  const name = body?.name?.trim() ?? ''
  const email = body?.email?.trim().toLowerCase() ?? ''
  const message = body?.message?.trim() ?? ''

  if (!name || !isValidEmail(email) || message.length < 10) {
    return NextResponse.json(
      { error: 'Completează numele, emailul și un mesaj valid.' },
      { status: 400 },
    )
  }

  const { error } = await supabase
    .from('contact_messages')
    .insert({ name, email, message })

  if (error) {
    return NextResponse.json(
      { error: 'Nu am putut salva mesajul. Încearcă din nou.' },
      { status: 500 },
    )
  }

  return NextResponse.json({ ok: true })
}
