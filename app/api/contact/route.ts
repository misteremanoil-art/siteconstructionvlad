import { NextResponse } from 'next/server'

type ContactPayload = {
  name?: string
  phone?: string
  email?: string
  projectType?: string
  message?: string
  company?: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function clean(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

export async function POST(request: Request) {
  const resendApiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_TO_EMAIL
  const fromEmail = process.env.CONTACT_FROM_EMAIL

  if (!resendApiKey || !toEmail || !fromEmail) {
    return NextResponse.json(
      { message: 'The contact form is not configured yet. Please call or send a WhatsApp message.' },
      { status: 503 },
    )
  }

  let body: ContactPayload

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ message: 'Please check the form details and try again.' }, { status: 400 })
  }

  if (clean(body.company)) {
    return NextResponse.json({ message: 'Thank you. Your enquiry has been sent.' })
  }

  const name = clean(body.name)
  const phone = clean(body.phone)
  const email = clean(body.email)
  const projectType = clean(body.projectType) || 'General enquiry'
  const message = clean(body.message)

  if (!name || !phone || !message) {
    return NextResponse.json({ message: 'Please add your name, phone number and message.' }, { status: 400 })
  }

  if (email && !emailPattern.test(email)) {
    return NextResponse.json({ message: 'Please add a valid email address.' }, { status: 400 })
  }

  const subject = `New website enquiry: ${projectType}`
  const replyTo = email || undefined
  const text = [
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email || 'Not provided'}`,
    `Project type: ${projectType}`,
    '',
    'Message:',
    message,
  ].join('\n')

  const html = `
    <div style="font-family: Arial, sans-serif; color: #1f2933; line-height: 1.6;">
      <h2 style="margin: 0 0 16px;">New website enquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email || 'Not provided')}</p>
      <p><strong>Project type:</strong> ${escapeHtml(projectType)}</p>
      <hr style="border: 0; border-top: 1px solid #ddd; margin: 20px 0;" />
      <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
    </div>
  `

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: replyTo,
      subject,
      text,
      html,
    }),
  })

  if (!response.ok) {
    return NextResponse.json(
      { message: 'The enquiry could not be sent. Please call or send a WhatsApp message.' },
      { status: 502 },
    )
  }

  return NextResponse.json({ message: 'Thank you. Your enquiry has been sent.' })
}
