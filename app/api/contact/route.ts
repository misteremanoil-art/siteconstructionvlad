import { NextResponse } from 'next/server'

type ContactPayload = {
  name?: string
  phone?: string
  email?: string
  service?: string
  location?: string
  message?: string
}

function clean(value?: string) {
  return String(value || '').trim().slice(0, 2000)
}

function isValidEmail(value: string) {
  if (!value) return true
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export async function POST(request: Request) {
  let body: ContactPayload

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ message: 'Invalid enquiry details.' }, { status: 400 })
  }

  const name = clean(body.name)
  const phone = clean(body.phone)
  const email = clean(body.email)
  const service = clean(body.service)
  const location = clean(body.location)
  const message = clean(body.message)

  if (!name || !phone || !service || !message) {
    return NextResponse.json({ message: 'Please add your name, phone, service and project details.' }, { status: 400 })
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ message: 'Please enter a valid email address.' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_TO_EMAIL
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'VPPCONSTRUCT LTD <onboarding@resend.dev>'

  if (!apiKey || !toEmail) {
    return NextResponse.json(
      { message: 'The contact form is not connected yet. Please call or message on WhatsApp.' },
      { status: 503 },
    )
  }

  const submittedAt = new Date().toLocaleString('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Europe/London',
  })

  const text = [
    'New website enquiry from VPPCONSTRUCT LTD',
    '',
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email || 'Not provided'}`,
    `Service: ${service}`,
    `Location / postcode: ${location || 'Not provided'}`,
    `Submitted: ${submittedAt}`,
    '',
    'Project details:',
    message,
  ].join('\n')

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #14211e;">
      <h2 style="margin: 0 0 16px;">New website enquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email || 'Not provided')}</p>
      <p><strong>Service:</strong> ${escapeHtml(service)}</p>
      <p><strong>Location / postcode:</strong> ${escapeHtml(location || 'Not provided')}</p>
      <p><strong>Submitted:</strong> ${submittedAt}</p>
      <hr style="border: 0; border-top: 1px solid #ddd; margin: 20px 0;" />
      <p><strong>Project details:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
    </div>
  `

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: email || undefined,
      subject: `New ${service} enquiry from ${name}`,
      text,
      html,
    }),
  })

  if (!response.ok) {
    return NextResponse.json(
      { message: 'The enquiry could not be sent. Please call or message on WhatsApp.' },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
