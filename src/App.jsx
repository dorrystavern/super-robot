import { useState } from 'react'
import MenuScreen from './components/MenuScreen.jsx'
import FlashcardScreen from './components/FlashcardScreen.jsx'
import SummaryScreen from './components/SummaryScreen.jsx'
import { shuffleWords } from './data/wordLists.js'

export default function App() {
  const [screen, setScreen] = useState('menu')
  const [wordQueue, setWordQueue] = useState([])
  const [results, setResults] = useState({ correct: [], skipped: [] })

  function onPlay(words) {
    setWordQueue(shuffleWords(words))
    setResults({ correct: [], skipped: [] })
    setScreen('game')
  }

  function onCorrect(word) {
    setResults(r => ({ ...r, correct: [...r.correct, word] }))
  }

  function onSkip(word) {
    setResults(r => ({ ...r, skipped: [...r.skipped, word] }))
  }

  function onFinish() {
    setScreen('summary')
  }

  function onPlayAgain() {
    setWordQueue([])
    setResults({ correct: [], skipped: [] })
    setScreen('menu')
  }

  return (
    <>
      {screen === 'menu' && (
        <MenuScreen onPlay={onPlay} />
      )}

      {screen === 'game' && (
        <FlashcardScreen
          words={wordQueue}
          onCorrect={onCorrect}
          onSkip={onSkip}
          onFinish={onFinish}
        />
      )}

      {screen === 'summary' && (
        <>
          <MenuScreen onPlay={onPlay} disabled />
          <SummaryScreen results={results} onPlayAgain={onPlayAgain} />
        </>
      )}
    </>
  )
}
