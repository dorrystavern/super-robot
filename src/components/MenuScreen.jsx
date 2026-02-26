import { useState } from 'react'
import { wordLists, wordListMeta, parseCustomWords } from '../data/wordLists.js'

export default function MenuScreen({ onPlay, disabled = false }) {
  const [selectedList, setSelectedList] = useState('')
  const [customInput, setCustomInput] = useState('')

  function handleSelectList(e) {
    setSelectedList(e.target.value)
    if (e.target.value) setCustomInput('')
  }

  function handleCustomInput(e) {
    setCustomInput(e.target.value)
    if (e.target.value.trim()) setSelectedList('')
  }

  const canPlay = !disabled && (selectedList !== '' || parseCustomWords(customInput).length > 0)

  function handlePlay() {
    if (!canPlay) return
    const words = selectedList
      ? wordLists[selectedList]
      : parseCustomWords(customInput)
    onPlay(words)
  }

  return (
    <div className="menu-screen">
      <h1>Sight Word Flashcards</h1>
      <p className="subtitle">Practice reading sight words out loud</p>

      <div className="menu-card">
        <div className="menu-section">
          <label htmlFor="grade-select">Choose a grade level:</label>
          <select
            id="grade-select"
            value={selectedList}
            onChange={handleSelectList}
            disabled={disabled}
          >
            <option value="">-- Select a grade --</option>
            {Object.entries(wordListMeta).map(([key, meta]) => (
              <option key={key} value={key}>
                {meta.label} — {meta.description}
              </option>
            ))}
          </select>
        </div>

        <div className="menu-divider">or</div>

        <div className="menu-section">
          <label htmlFor="custom-words">Enter custom words (comma-separated):</label>
          <textarea
            id="custom-words"
            value={customInput}
            onChange={handleCustomInput}
            placeholder="cat, dog, house, jump, ..."
            disabled={disabled}
          />
        </div>

        <button
          className="btn-play"
          onClick={handlePlay}
          disabled={!canPlay}
        >
          Play
        </button>
      </div>
    </div>
  )
}
