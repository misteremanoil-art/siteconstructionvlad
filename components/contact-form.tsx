'use client'

import { FormEvent, useState } from 'react'
import { ArrowRight, Loader2 } from 'lucide-react'

type FormState = 'idle' | 'sending' | 'success' | 'error'

export function ContactForm() {
  const [state, setState] = useState<FormState>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setState('sending')
    setMessage('')

    const form = event.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result?.message || 'Something went wrong. Please try again.')
      }

      form.reset()
      setState('success')
      setMessage('Thank you. Your enquiry has been sent.')
    } catch (error) {
      setState('error')
      setMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="contact-form-hidden" />

      <div className="contact-form-grid">
        <label>
          <span>Name</span>
          <input name="name" type="text" autoComplete="name" required placeholder="Your name" />
        </label>
        <label>
          <span>Phone</span>
          <input name="phone" type="tel" autoComplete="tel" required placeholder="Your phone number" />
        </label>
      </div>

      <label>
        <span>Email</span>
        <input name="email" type="email" autoComplete="email" placeholder="Your email address" />
      </label>

      <label>
        <span>Project type</span>
        <select name="projectType" defaultValue="Renovation">
          <option>Renovation</option>
          <option>Driveway / block paving</option>
          <option>Roofing</option>
          <option>Extension</option>
          <option>Bathroom / kitchen</option>
          <option>Landscaping / fencing</option>
          <option>General building</option>
        </select>
      </label>

      <label>
        <span>Message</span>
        <textarea
          name="message"
          rows={4}
          required
          placeholder="Tell us a little about the work, location and preferred timing."
        />
      </label>

      <button type="submit" disabled={state === 'sending'}>
        {state === 'sending' ? (
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

      {message ? <p className={`contact-form-message ${state === 'success' ? 'is-success' : 'is-error'}`}>{message}</p> : null}
    </form>
  )
}
