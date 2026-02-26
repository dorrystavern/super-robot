export default function SummaryScreen({ results, onPlayAgain }) {
  const { correct, skipped } = results
  const total = correct.length + skipped.length
  const allCorrect = skipped.length === 0 && total > 0

  return (
    <div className="summary-overlay">
      <div className="summary-card">
        <h2>{allCorrect ? '🎉 Perfect score!' : 'Nice work!'}</h2>

        <div className="summary-score">
          <div className="score-box score-box--correct">
            <div className="score-num">{correct.length}</div>
            <div className="score-label">Correct</div>
          </div>
          <div className="score-box score-box--skipped">
            <div className="score-num">{skipped.length}</div>
            <div className="score-label">Skipped</div>
          </div>
        </div>

        {total > 0 && (
          <div className="summary-words">
            <div className="word-column word-column--correct">
              <h3>Correct</h3>
              {correct.length > 0 ? (
                <ul>
                  {correct.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
              ) : (
                <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>None</p>
              )}
            </div>
            <div className="word-column word-column--skipped">
              <h3>Skipped</h3>
              {skipped.length > 0 ? (
                <ul>
                  {skipped.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
              ) : (
                <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>None</p>
              )}
            </div>
          </div>
        )}

        <button className="btn-play-again" onClick={onPlayAgain}>
          Play Again
        </button>
      </div>
    </div>
  )
}
