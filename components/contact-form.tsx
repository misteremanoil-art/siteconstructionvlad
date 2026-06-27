'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowRight, Loader2 } from 'lucide-react'

const serviceOptions = [
  'Renovation',
  'Kitchen',
  'Bathroom',
  'Extension',
  'General building',
  'Not sure yet',
]

type Status = {
  type: 'idle' | 'success' | 'error'
  message: string
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ type: 'idle', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: 'idle', message: '' })

    const form = event.currentTarget
    const formData = new FormData(form)

    const payload = {
      name: String(formData.get('name') || ''),
      phone: String(formData.get('phone') || ''),
      email: String(formData.get('email') || ''),
      service: String(formData.get('service') || ''),
      location: String(formData.get('location') || ''),
      message: String(formData.get('message') || ''),
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(result?.message || 'Something went wrong. Please call or message on WhatsApp.')
      }

      form.reset()
      setStatus({
        type: 'success',
        message: 'Thank you. Your enquiry has been sent and we will get back to you shortly.',
      })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label className="form-field">
          <span>Name</span>
          <input name="name" type="text" autoComplete="name" required />
        </label>
        <label className="form-field">
          <span>Phone</span>
          <input name="phone" type="tel" autoComplete="tel" required />
        </label>
      </div>
      <div className="form-grid">
        <label className="form-field">
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" />
        </label>
        <label className="form-field">
          <span>Service needed</span>
          <select name="service" defaultValue="Renovation" required>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="form-field">
        <span>Location / postcode</span>
        <input name="location" type="text" autoComplete="postal-code" placeholder="Example: Edgware, HA8" />
      </label>
      <label className="form-field">
        <span>Project details</span>
        <textarea
          name="message"
          rows={5}
          placeholder="Tell us what you need, the property type and when you would like the work to start."
          required
        />
      </label>
      <button className="form-submit" type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending
          </>
        ) : (
          <>
            Send enquiry
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
      {status.message ? (
        <p className={`form-status ${status.type === 'success' ? 'form-status-success' : 'form-status-error'}`}>
          {status.message}
        </p>
      ) : null}
    </form>
  )
}
