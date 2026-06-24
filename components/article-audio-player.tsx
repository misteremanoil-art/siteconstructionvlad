'use client'

import { useEffect, useMemo, useState } from 'react'
import { Headphones, Pause, Play, Square } from 'lucide-react'

function cleanTextForSpeech(value: string) {
  return value
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_~{}[\]()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function ArticleAudioPlayer({
  title,
  text,
  audioUrl,
}: {
  title: string
  text: string
  audioUrl: string
}) {
  const [supported, setSupported] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const [paused, setPaused] = useState(false)

  const speechText = useMemo(
    () => cleanTextForSpeech(`${title}. ${text}`),
    [title, text],
  )

  useEffect(() => {
    setSupported(typeof window !== 'undefined' && 'speechSynthesis' in window)

    return () => {
      window.speechSynthesis?.cancel()
    }
  }, [])

  function getRomanianVoice() {
    const voices = window.speechSynthesis.getVoices()
    return (
      voices.find((voice) => voice.lang.toLowerCase().startsWith('ro')) ??
      voices.find((voice) => voice.lang.toLowerCase().startsWith('en')) ??
      voices[0]
    )
  }

  function playAutomaticAudio() {
    if (!supported || !speechText) return

    if (paused) {
      window.speechSynthesis.resume()
      setPaused(false)
      setSpeaking(true)
      return
    }

    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(speechText)
    const voice = getRomanianVoice()

    if (voice) utterance.voice = voice
    utterance.lang = voice?.lang ?? 'ro-RO'
    utterance.rate = 0.92
    utterance.pitch = 1

    utterance.onend = () => {
      setSpeaking(false)
      setPaused(false)
    }
    utterance.onerror = () => {
      setSpeaking(false)
      setPaused(false)
    }

    window.speechSynthesis.speak(utterance)
    setSpeaking(true)
    setPaused(false)
  }

  function pauseAutomaticAudio() {
    window.speechSynthesis.pause()
    setPaused(true)
    setSpeaking(false)
  }

  function stopAutomaticAudio() {
    window.speechSynthesis.cancel()
    setPaused(false)
    setSpeaking(false)
  }

  if (!audioUrl && !supported) return null

  return (
    <section className="mt-8 max-w-2xl rounded-lg border border-white/20 bg-black/30 p-4 text-white shadow-lg backdrop-blur-md">
      <div className="mb-3 flex items-center gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10">
          <Headphones className="h-4 w-4" />
        </span>
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-white/65">
            Ascultă articolul
          </p>
          <p className="mt-1 line-clamp-1 font-serif text-base text-white">{title}</p>
        </div>
      </div>
      {audioUrl ? (
        <audio controls preload="metadata" src={audioUrl} className="w-full">
          Browserul tău nu poate reda acest fișier audio.
        </audio>
      ) : (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={playAutomaticAudio}
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-opacity hover:opacity-90"
          >
            <Play className="h-4 w-4" />
            {paused ? 'Continuă' : speaking ? 'Repornește' : 'Ascultă automat'}
          </button>
          <button
            type="button"
            onClick={pauseAutomaticAudio}
            disabled={!speaking}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-45"
          >
            <Pause className="h-4 w-4" />
            Pauză
          </button>
          <button
            type="button"
            onClick={stopAutomaticAudio}
            disabled={!speaking && !paused}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-45"
          >
            <Square className="h-4 w-4" />
            Oprește
          </button>
        </div>
      )}
    </section>
  )
}
