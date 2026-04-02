// ─── src/components/questions/FillInTheBlank.jsx ─────────────────────────────
import { useRef, useEffect } from 'react'
import { useStore, A } from '../../store/store'

/**
 * FillInTheBlank
 *
 * Props:
 *   question      – the question object from the dataset
 *   questionIndex – index within activeTest.questions
 *   onCheck       – called with (isCorrect: bool) after user clicks Check
 */
export default function FillInTheBlank({ question, questionIndex, onCheck }) {
  const { state, dispatch } = useStore()
  const { activeTest } = state

  const answer       = String(question.correctAnswer)
  const userAnswer   = activeTest?.answers[questionIndex] ?? ''
  const revealed     = activeTest?.revealed[questionIndex] ?? []
  const hasChecked   = activeTest?.checked?.[questionIndex] !== undefined
  const wasCorrect   = hasChecked && activeTest.checked[questionIndex]

  // Build the underscore display string, injecting revealed chars
  // e.g. answer="hello" revealed=[1,3] → "_ e _ l _"  (h=0, e=1, l=2, l=3, o=4)
  const buildUnderscoreDisplay = () =>
    answer.split('').map((ch, i) => {
      if (ch === ' ') return { char: ' ', type: 'space' }
      if (revealed.includes(i)) return { char: ch, type: 'revealed' }
      if (userAnswer[i] && !hasChecked) return { char: userAnswer[i], type: 'typed' }
      if (hasChecked) {
        const typed = userAnswer[i] ?? ''
        const correct = ch.toLowerCase() === typed.toLowerCase()
        return { char: typed || '_', type: correct ? 'correct' : 'wrong' }
      }
      return { char: '_', type: 'blank' }
    })

  const cells = buildUnderscoreDisplay()
  const inputRef = useRef(null)

  // Controlled character-by-character input
  // We intercept keystrokes to fill cells left-to-right
  const handleKeyDown = (e) => {
    if (hasChecked) return
    const current = (userAnswer || '').split('')
    // Ensure array is same length as answer
    while (current.length < answer.length) current.push('')

    if (e.key === 'Backspace') {
      // Find last filled position that isn't revealed
      let pos = current.length - 1
      while (pos >= 0 && (current[pos] === '' || revealed.includes(pos))) pos--
      if (pos >= 0) {
        current[pos] = ''
        dispatch({ type: A.ANSWER_QUESTION, payload: { questionIndex, answer: current.join('') } })
      }
      e.preventDefault()
    } else if (e.key.length === 1) {
      // Find next empty, non-revealed position
      let pos = 0
      while (pos < answer.length && (current[pos] !== '' || revealed.includes(pos))) pos++
      if (pos < answer.length) {
        // Skip spaces
        while (pos < answer.length && answer[pos] === ' ') pos++
        current[pos] = e.key
        dispatch({ type: A.ANSWER_QUESTION, payload: { questionIndex, answer: current.join('') } })
      }
      e.preventDefault()
    }
  }

  const handleRevealLetter = () => {
    dispatch({ type: A.REVEAL_LETTER, payload: { questionIndex } })
  }

  const handleCheck = () => {
    if (onCheck) {
      // Normalize comparison
      const given   = userAnswer.trim().toLowerCase()
      const correct = answer.trim().toLowerCase()
      onCheck(given === correct)
    }
  }

  const unrevealed = answer.split('').filter((ch, i) => ch !== ' ' && !revealed.includes(i)).length
  const allRevealed = unrevealed === 0

  return (
    <div className="fitb-wrapper" onClick={() => inputRef.current?.focus()}>
      {/* Question text */}
      <p className="fitb-question">{question.questionText}</p>

      {/* Visual cell display */}
      <div className="fitb-cells" aria-label="answer cells">
        {cells.map((cell, i) => {
          if (cell.type === 'space') return <span key={i} className="fitb-space" />
          return (
            <span
              key={i}
              className={`fitb-cell fitb-cell--${cell.type}`}
              data-char={cell.char}
            >
              <span className="fitb-char">{cell.char}</span>
              <span className="fitb-underline" />
            </span>
          )
        })}
      </div>

      {/* Hidden real input to capture keyboard */}
      <input
        ref={inputRef}
        className="fitb-hidden-input"
        onKeyDown={handleKeyDown}
        readOnly
        value=""
        aria-label="Type your answer"
        tabIndex={0}
      />

      {/* Character count hint */}
      <p className="fitb-charcount">
        {answer.replace(/ /g, '').length} characters
      </p>

      {/* Controls */}
      {!hasChecked && (
        <div className="fitb-controls">
          <button
            className="btn btn--ghost"
            onClick={handleRevealLetter}
            disabled={allRevealed}
            aria-label="Reveal a random letter"
          >
            💡 Reveal Letter ({unrevealed} left)
          </button>

          <button
            className="btn btn--primary"
            onClick={handleCheck}
            aria-label="Check answer"
          >
            Check ✓
          </button>
        </div>
      )}

      {/* Feedback */}
      {hasChecked && (
        <div className={`fitb-feedback ${wasCorrect ? 'feedback--correct' : 'feedback--wrong'}`}>
          {wasCorrect ? '✅ Correct!' : (
            <>
              ❌ The correct answer is: <strong>{answer}</strong>
            </>
          )}
        </div>
      )}
    </div>
  )
}

// ─── CSS (add to your global stylesheet or CSS module) ────────────────────────
/*
.fitb-wrapper {
  cursor: text;
  outline: none;
}

.fitb-cells {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 2px;
  margin: 24px 0;
  align-items: flex-end;
}

.fitb-space {
  width: 16px;
}

.fitb-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 24px;
  padding: 0 4px;
}

.fitb-char {
  font-size: 1.4rem;
  font-family: 'Courier New', monospace;
  line-height: 1;
  min-height: 1.4rem;
  color: var(--text-primary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.fitb-underline {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--border);
  margin-top: 4px;
  border-radius: 1px;
}

.fitb-cell--revealed .fitb-char  { color: var(--color-hint); }
.fitb-cell--revealed .fitb-underline { background: var(--color-hint); }

.fitb-cell--correct .fitb-char   { color: var(--color-success); }
.fitb-cell--correct .fitb-underline { background: var(--color-success); }

.fitb-cell--wrong .fitb-char     { color: var(--color-danger); }
.fitb-cell--wrong .fitb-underline { background: var(--color-danger); }

.fitb-hidden-input {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
  pointer-events: none;
}

.fitb-charcount {
  font-size: 0.75rem;
  opacity: 0.5;
  margin: -12px 0 16px;
}

.fitb-controls {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.fitb-feedback {
  margin-top: 16px;
  padding: 12px 16px;
  border-radius: 8px;
  font-weight: 500;
}

.feedback--correct { background: rgba(34,197,94,0.12); color: var(--color-success); }
.feedback--wrong   { background: rgba(239,68,68,0.12);  color: var(--color-danger); }
*/
