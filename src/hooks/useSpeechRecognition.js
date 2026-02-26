import { useRef, useCallback, useEffect } from 'react'

const SpeechRecognition =
  typeof window !== 'undefined'
    ? window.SpeechRecognition || window.webkitSpeechRecognition
    : null

export const isSpeechRecognitionSupported = Boolean(SpeechRecognition)

export function useSpeechRecognition({ targetWord, onMatch, onError }) {
  const recognitionRef   = useRef(null)
  const shouldListenRef  = useRef(false)
  const targetWordRef    = useRef(targetWord)

  // Keep targetWordRef in sync without recreating callbacks
  useEffect(() => {
    targetWordRef.current = targetWord
  }, [targetWord])

  const normalize = (str) => str?.toLowerCase().trim() ?? ''

  const handleResult = useCallback((event) => {
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const result = event.results[i]
      for (let a = 0; a < result.length; a++) {
        const tokens = normalize(result[a].transcript).split(/\s+/)
        if (tokens.includes(normalize(targetWordRef.current))) {
          onMatch()
          return
        }
      }
    }
  }, [onMatch])

  const startRecognition = useCallback(() => {
    if (!SpeechRecognition) return
    const rec = new SpeechRecognition()
    rec.continuous     = false
    rec.interimResults = true
    rec.lang           = 'en-US'
    rec.maxAlternatives = 3

    rec.onresult = handleResult

    rec.onerror = (e) => {
      if (e.error === 'no-speech') return   // normal timeout, restart silently
      onError?.(e.error)
    }

    rec.onend = () => {
      if (shouldListenRef.current) {
        try { rec.start() } catch (_) { /* already starting */ }
      }
    }

    recognitionRef.current = rec
    try { rec.start() } catch (_) {}
  }, [handleResult, onError])

  const start = useCallback(() => {
    if (!SpeechRecognition) { onError?.('not-supported'); return }
    shouldListenRef.current = true
    startRecognition()
  }, [startRecognition, onError])

  const stop = useCallback(() => {
    shouldListenRef.current = false
    recognitionRef.current?.stop()
    recognitionRef.current = null
  }, [])

  // Cleanup on unmount
  useEffect(() => () => stop(), [stop])

  return { start, stop }
}
