'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { createBrowserSupabaseClient } from '@/lib/supabase-browser'
import { siteTextGroups, type SiteTextDefinition } from '@/lib/site-texts'
import type { DatabaseSiteText } from '@/lib/supabase'

type Values = Record<string, string>

function defaultValues() {
  return Object.fromEntries(
    siteTextGroups.flatMap((group) => group.texts.map((text) => [text.key, text.defaultValue])),
  ) as Values
}

export function SiteTextsEditor() {
  const supabase = useMemo(() => createBrowserSupabaseClient(), [])
  const [values, setValues] = useState<Values>(() => defaultValues())
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadTexts() {
      setLoading(true)
      setError('')

      const { data: userData } = await supabase.auth.getUser()
      if (!userData.user) {
        setLoading(false)
        setError('Trebuie să fii autentificat.')
        return
      }

      const { data: adminStatus } = await supabase.rpc('is_admin')
      setIsAdmin(Boolean(adminStatus))

      if (!adminStatus) {
        setLoading(false)
        setError('Contul este autentificat, dar nu are drepturi de admin.')
        return
      }

      const { data, error: loadError } = await supabase
        .from('site_texts')
        .select('key, value, group_label, description, updated_at')

      if (loadError) {
        setError('Nu pot încărca textele. Rulează SQL-ul pentru site_texts în Supabase.')
      } else {
        setValues((current) => {
          const next = { ...current }
          for (const row of (data ?? []) as DatabaseSiteText[]) {
            next[row.key] = row.value
          }
          return next
        })
      }

      setLoading(false)
    }

    loadTexts()
  }, [supabase])

  function updateValue(key: string, value: string) {
    setValues((current) => ({ ...current, [key]: value }))
  }

  async function saveText(text: SiteTextDefinition) {
    setSaving(true)
    setMessage('')
    setError('')

    const { data: userData } = await supabase.auth.getUser()
    const { data: adminStatus } = await supabase.rpc('is_admin')

    if (!userData.user || !adminStatus) {
      setSaving(false)
      setError('Doar adminii pot salva texte.')
      return
    }

    const { error: saveError } = await supabase.from('site_texts').upsert(
      {
        key: text.key,
        value: values[text.key] ?? text.defaultValue,
        group_label: text.group,
        description: text.label,
        updated_by: userData.user.id,
      },
      { onConflict: 'key' },
    )

    setSaving(false)

    if (saveError) {
      setError(saveError.message || 'Nu am putut salva textul.')
      return
    }

    setMessage(`Am salvat: ${text.label}`)
  }

  async function saveAll() {
    setSaving(true)
    setMessage('')
    setError('')

    const { data: userData } = await supabase.auth.getUser()
    const { data: adminStatus } = await supabase.rpc('is_admin')

    if (!userData.user || !adminStatus) {
      setSaving(false)
      setError('Doar adminii pot salva texte.')
      return
    }

    const payload = siteTextGroups.flatMap((group) =>
      group.texts.map((text) => ({
        key: text.key,
        value: values[text.key] ?? text.defaultValue,
        group_label: group.title,
        description: text.label,
        updated_by: userData.user!.id,
      })),
    )

    const { error: saveError } = await supabase
      .from('site_texts')
      .upsert(payload, { onConflict: 'key' })

    setSaving(false)

    if (saveError) {
      setError(saveError.message || 'Nu am putut salva textele.')
      return
    }

    setMessage('Am salvat toate textele.')
  }

  function resetToDefault(text: SiteTextDefinition) {
    updateValue(text.key, text.defaultValue)
  }

  if (loading) {
    return <main className="page-shell max-w-5xl">Se încarcă...</main>
  }

  return (
    <main className="page-shell max-w-5xl">
      <Link href="/admin" className="text-action">
        Înapoi la admin
      </Link>

      <div className="mt-6 border-b border-border pb-8">
        <p className="page-kicker">Admin</p>
        <h1 className="page-title mt-3 text-4xl">Texte site</h1>
        <p className="page-intro mt-4">
          Modifică textele importante de pe site fără să intri în cod. Doar adminii pot salva
          aceste schimbări.
        </p>
      </div>

      {!isAdmin ? (
        <p className="mt-6 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {error || 'Nu ai drepturi de admin.'}
        </p>
      ) : null}

      {message ? <p className="mt-6 text-sm text-brand">{message}</p> : null}
      {error && isAdmin ? <p className="mt-6 text-sm text-destructive">{error}</p> : null}

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={saveAll}
          disabled={saving || !isAdmin}
          className="primary-action disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? 'Se salvează...' : 'Salvează toate'}
        </button>
      </div>

      <div className="mt-8 grid gap-6">
        {siteTextGroups.map((group) => (
          <section key={group.title} className="surface-card p-5">
            <div className="mb-5">
              <p className="section-kicker">{group.title}</p>
              <h2 className="mt-2 font-serif text-2xl font-semibold">{group.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {group.description}
              </p>
            </div>

            <div className="grid gap-5">
              {group.texts.map((text) => (
                <div key={text.key} className="rounded-lg border border-border bg-background/45 p-4">
                  <label className="block text-sm">
                    <span className="font-medium">{text.label}</span>
                    {text.multiline ? (
                      <textarea
                        rows={5}
                        value={values[text.key] ?? text.defaultValue}
                        onChange={(e) => updateValue(text.key, e.target.value)}
                        disabled={!isAdmin}
                        className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand disabled:opacity-60"
                      />
                    ) : (
                      <input
                        value={values[text.key] ?? text.defaultValue}
                        onChange={(e) => updateValue(text.key, e.target.value)}
                        disabled={!isAdmin}
                        className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-brand disabled:opacity-60"
                      />
                    )}
                  </label>

                  <div className="mt-3 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => saveText(text)}
                      disabled={saving || !isAdmin}
                      className="secondary-action py-2 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Salvează textul
                    </button>
                    <button
                      type="button"
                      onClick={() => resetToDefault(text)}
                      disabled={!isAdmin}
                      className="text-action"
                    >
                      Revino la textul inițial
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
