import { useState, useCallback, useEffect } from 'react'

export function useSpeechSynthesis() {
  const [voices, setVoices] = useState([])

  useEffect(() => {
    const synth = window.speechSynthesis
    if (!synth) return

    function loadVoices() {
      const v = synth.getVoices()
      if (v.length > 0) setVoices(v)
    }

    loadVoices()
    synth.addEventListener('voiceschanged', loadVoices)
    return () => synth.removeEventListener('voiceschanged', loadVoices)
  }, [])

  const pickVoice = useCallback(() => {
    const googleUS = voices.find(v => v.name.includes('Google') && v.lang.startsWith('en-US'))
    const anyUS    = voices.find(v => v.lang.startsWith('en-US'))
    const anyEn    = voices.find(v => v.lang.startsWith('en'))
    return googleUS ?? anyUS ?? anyEn ?? voices[0] ?? null
  }, [voices])

  const speak = useCallback((word, { onEnd } = {}) => {
    const synth = window.speechSynthesis
    if (!synth) return
    synth.cancel()
    const utterance = new SpeechSynthesisUtterance(word)
    const voice = pickVoice()
    if (voice) utterance.voice = voice
    utterance.lang = 'en-US'
    utterance.rate = 0.85
    if (onEnd) utterance.onend = onEnd
    synth.speak(utterance)
  }, [pickVoice])

  const cancel = useCallback(() => {
    window.speechSynthesis?.cancel()
  }, [])

  return { speak, cancel }
}
