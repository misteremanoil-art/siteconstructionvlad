import { NextResponse } from 'next/server'
import { createSupabaseClient } from '@/lib/supabase'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: Request) {
  const supabase = createSupabaseClient()
  if (!supabase) {
    return NextResponse.json(
      { error: 'Newsletterul nu este configurat încă.' },
      { status: 503 },
    )
  }

  const body = (await request.json().catch(() => null)) as {
    email?: string
  } | null
  const email = body?.email?.trim().toLowerCase() ?? ''

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: 'Adresa de email nu este validă.' },
      { status: 400 },
    )
  }

  const { error } = await supabase
    .from('newsletter_subscribers')
    .insert({ email, source: 'site' })

  if (error && error.code !== '23505') {
    return NextResponse.json(
      { error: 'Nu am putut salva abonarea. Încearcă din nou.' },
      { status: 500 },
    )
  }

  return NextResponse.json({ ok: true })
}
