import { useState, useEffect, useRef, useCallback } from 'react'
import { useSpeechRecognition, isSpeechRecognitionSupported } from '../hooks/useSpeechRecognition.js'
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis.js'

export default function FlashcardScreen({ words, onCorrect, onSkip, onFinish }) {
  const [index, setIndex]   = useState(0)
  const [status, setStatus] = useState('listening')  // 'listening' | 'correct' | 'skipped' | 'speaking'
  const [speechError, setSpeechError] = useState(null)

  const currentWord = words[index]
  const advanceTimeoutRef = useRef(null)

  const { speak, cancel: cancelSpeech } = useSpeechSynthesis()

  const advance = useCallback((word, type) => {
    if (type === 'correct') onCorrect(word)
    else onSkip(word)

    setStatus(type)
    advanceTimeoutRef.current = setTimeout(() => {
      const nextIndex = index + 1
      if (nextIndex >= words.length) {
        onFinish()
      } else {
        setIndex(nextIndex)
        setStatus('listening')
      }
    }, 600)
  }, [index, words.length, onCorrect, onSkip, onFinish])

  const handleMatch = useCallback(() => {
    if (status !== 'listening') return
    recStop()
    advance(currentWord, 'correct')
  }, [status, currentWord, advance])   // recStop added via ref below

  const handleSpeechError = useCallback((err) => {
    if (err === 'not-supported') {
      setSpeechError('Speech recognition is not supported. Please use Chrome or Edge.')
    } else if (err === 'not-allowed') {
      setSpeechError('Microphone access was denied. Please allow microphone permissions and refresh.')
    }
    // other errors: ignore
  }, [])

  const { start: recStart, stop: recStop } = useSpeechRecognition({
    targetWord: currentWord,
    onMatch: handleMatch,
    onError: handleSpeechError,
  })

  // Start recognition whenever we land on a new card
  useEffect(() => {
    if (!isSpeechRecognitionSupported) return
    setStatus('listening')
    setSpeechError(null)
    recStart()
    return () => recStop()
  }, [index])   // only re-run when card changes

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      clearTimeout(advanceTimeoutRef.current)
      recStop()
      cancelSpeech()
    }
  }, [])

  function handleHearWord() {
    recStop()
    setStatus('speaking')
    speak(currentWord, {
      onEnd: () => {
        setStatus('listening')
        recStart()
      }
    })
  }

  function handleSkip() {
    if (status === 'correct') return
    recStop()
    cancelSpeech()
    advance(currentWord, 'skipped')
  }

  function handleClose() {
    clearTimeout(advanceTimeoutRef.current)
    recStop()
    cancelSpeech()
    onFinish()
  }

  return (
    <div className="flashcard-screen">
      <button className="btn-close" onClick={handleClose} title="Exit">✕</button>
      <div className="progress">{index + 1} / {words.length}</div>

      <div className="flashcard-wrapper">
        <div className={`flashcard${status === 'correct' ? ' flashcard--correct' : ''}${status === 'skipped' ? ' flashcard--skipped' : ''}`}>
          <span className="card-word">{currentWord}</span>
          {status === 'correct' && (
            <span className="card-status card-status--correct">Correct!</span>
          )}
          {status === 'skipped' && (
            <span className="card-status card-status--skipped">Skipped</span>
          )}
        </div>

        <div className="listening-bar">
          {status === 'listening' && isSpeechRecognitionSupported && !speechError && (
            <>
              <span className="listening-dot" />
              <span>Listening… read the word aloud</span>
            </>
          )}
          {status === 'speaking' && <span>Speaking…</span>}
        </div>

        {speechError && (
          <div className="speech-unsupported">{speechError}</div>
        )}

        {!isSpeechRecognitionSupported && !speechError && (
          <div className="speech-unsupported">
            Speech recognition requires Chrome or Edge. Use the Skip button to continue.
          </div>
        )}

        <div className="card-controls">
          <button
            className="btn-hear"
            onClick={handleHearWord}
            disabled={status === 'correct' || status === 'skipped'}
          >
            🔊 Hear Word
          </button>
          <button
            className="btn-skip"
            onClick={handleSkip}
            disabled={status === 'correct' || status === 'skipped'}
          >
            Skip →
          </button>
        </div>
      </div>
    </div>
  )
}
