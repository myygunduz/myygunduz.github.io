// ─── src/components/Flashcard.jsx ─────────────────────────────────────────────
// Tinder-style swipe (touch + mouse) + click-to-flip flashcard.
// Zero external dependencies – pure React + CSS transforms.

import { useState, useRef, useCallback, useEffect } from 'react'

const SWIPE_THRESHOLD = 80   // px horizontal drag to trigger a swipe decision
const ROTATION_FACTOR = 0.12 // degrees per pixel of drag

/**
 * Flashcard
 *
 * Props:
 *   card      – { questionText, correctAnswer, hint, subject, topic }
 *   onKnow    – called when swiped right  ("I know it")
 *   onReview  – called when swiped left   ("Needs review")
 *   index     – position in deck (used for z-index stacking)
 *   total     – total cards in deck (for progress display)
 */
export default function Flashcard({ card, onKnow, onReview, index, total }) {
  const [flipped,  setFlipped]  = useState(false)
  const [dragX,    setDragX]    = useState(0)
  const [dragging, setDragging] = useState(false)
  const [leaving,  setLeaving]  = useState(null)  // 'right' | 'left' | null

  const startX  = useRef(null)
  const cardRef = useRef(null)

  // ── reset flip when card changes ────────────────────────────────────────────
  useEffect(() => {
    setFlipped(false)
    setDragX(0)
    setLeaving(null)
  }, [card])

  // ── pointer helpers (works for both mouse & touch) ─────────────────────────
  const getClientX = (e) =>
    e.touches ? e.touches[0].clientX : e.clientX

  const onDragStart = useCallback((e) => {
    startX.current = getClientX(e)
    setDragging(true)
  }, [])

  const onDragMove = useCallback((e) => {
    if (!dragging || startX.current === null) return
    const delta = getClientX(e) - startX.current
    setDragX(delta)
  }, [dragging])

  const onDragEnd = useCallback(() => {
    if (!dragging) return
    setDragging(false)

    if (dragX > SWIPE_THRESHOLD) {
      // Swipe RIGHT → know it
      setLeaving('right')
      setTimeout(() => onKnow?.(), 350)
    } else if (dragX < -SWIPE_THRESHOLD) {
      // Swipe LEFT → needs review
      setLeaving('left')
      setTimeout(() => onReview?.(), 350)
    } else {
      // Snap back
      setDragX(0)
    }
    startX.current = null
  }, [dragging, dragX, onKnow, onReview])

  const handleFlip = (e) => {
    // Don't flip if it was a swipe
    if (Math.abs(dragX) > 5) return
    setFlipped(f => !f)
  }

  // ── derive visual state ────────────────────────────────────────────────────
  const rotation  = dragging ? dragX * ROTATION_FACTOR : 0
  const opacity   = leaving ? 0 : Math.max(0, 1 - Math.abs(dragX) / 300)
  const translateX = leaving === 'right' ? 500 : leaving === 'left' ? -500 : dragX

  const overlayOpacity = Math.min(1, Math.abs(dragX) / SWIPE_THRESHOLD)
  const showKnow   = dragX > 20
  const showReview = dragX < -20

  const cardStyle = {
    transform:  `translateX(${translateX}px) rotate(${rotation}deg)`,
    opacity,
    transition: dragging ? 'none' : 'transform 0.35s cubic-bezier(.25,.8,.25,1), opacity 0.35s ease',
    cursor:     dragging ? 'grabbing' : 'grab',
    zIndex:     index,
  }

  return (
    <div className="fc-scene" style={cardStyle}
      ref={cardRef}
      // Mouse events
      onMouseDown={onDragStart}
      onMouseMove={onDragMove}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
      // Touch events
      onTouchStart={onDragStart}
      onTouchMove={onDragMove}
      onTouchEnd={onDragEnd}
      // Click to flip (only if not dragging)
      onClick={handleFlip}
      role="button"
      aria-label={flipped ? 'Card showing answer, click to flip' : 'Card showing question, click to flip'}
      tabIndex={0}
      onKeyDown={(e) => e.key === ' ' && handleFlip()}
    >
      {/* Swipe overlays */}
      {showKnow && (
        <div className="fc-overlay fc-overlay--know" style={{ opacity: overlayOpacity }}>
          <span>✓ Know it</span>
        </div>
      )}
      {showReview && (
        <div className="fc-overlay fc-overlay--review" style={{ opacity: overlayOpacity }}>
          <span>↻ Review</span>
        </div>
      )}

      {/* 3D flip container */}
      <div className={`fc-card ${flipped ? 'fc-card--flipped' : ''}`}>
        {/* Front: Question */}
        <div className="fc-face fc-face--front">
          <div className="fc-meta">
            <span className="fc-topic">{card.subject} › {card.topic}</span>
            <span className="fc-counter">{total - index} / {total}</span>
          </div>
          <div className="fc-content">
            <p className="fc-label">QUESTION</p>
            <p className="fc-text">{card.questionText}</p>
          </div>
          {card.hint && (
            <details className="fc-hint">
              <summary>💡 Hint</summary>
              <p>{card.hint}</p>
            </details>
          )}
          <p className="fc-flip-cue">Tap to reveal answer</p>
        </div>

        {/* Back: Answer */}
        <div className="fc-face fc-face--back">
          <div className="fc-meta">
            <span className="fc-topic">{card.subject} › {card.topic}</span>
          </div>
          <div className="fc-content">
            <p className="fc-label">ANSWER</p>
            <p className="fc-text">{String(card.correctAnswer)}</p>
          </div>
          {card.source && (
            <p className="fc-source">📖 {card.source}</p>
          )}
          <p className="fc-flip-cue">Tap to see question</p>
        </div>
      </div>
    </div>
  )
}

/**
 * FlashcardDeck
 * Manages a stack of Flashcard components.
 *
 * Props:
 *   cards    – array of card objects
 *   onFinish – called when all cards are done, with { known, review } arrays
 */
export function FlashcardDeck({ cards: initialCards, onFinish }) {
  const [deck,   setDeck]   = useState(initialCards)
  const [known,  setKnown]  = useState([])
  const [review, setReview] = useState([])

  useEffect(() => {
    setDeck(initialCards)
    setKnown([])
    setReview([])
  }, [initialCards])

  const handleKnow = useCallback(() => {
    const [top, ...rest] = deck
    const nextKnown = [top, ...known]
    setKnown(nextKnown)
    if (rest.length === 0) onFinish?.({ known: nextKnown, review })
    else setDeck(rest)
  }, [deck, known, review, onFinish])

  const handleReview = useCallback(() => {
    const [top, ...rest] = deck
    const nextReview = [top, ...review]
    setReview(nextReview)
    if (rest.length === 0) onFinish?.({ known, review: nextReview })
    else setDeck(rest)
  }, [deck, known, review, onFinish])

  if (deck.length === 0) return null

  // Render top 3 cards stacked (only top is interactive)
  const visible = deck.slice(0, 3)

  return (
    <div className="fc-deck">
      {/* Stack ghost cards below for depth effect */}
      {visible.slice(1).reverse().map((card, i) => (
        <div
          key={card.questionText}
          className="fc-deck-ghost"
          style={{
            transform: `translateY(${(visible.length - 1 - i) * 6}px) scale(${1 - (visible.length - 1 - i) * 0.03})`,
            zIndex: i,
          }}
        />
      ))}

      {/* Active top card */}
      <Flashcard
        key={visible[0].questionText}
        card={visible[0]}
        onKnow={handleKnow}
        onReview={handleReview}
        index={visible.length}
        total={initialCards.length}
      />

      {/* Manual swipe buttons */}
      <div className="fc-buttons">
        <button className="fc-btn fc-btn--review" onClick={handleReview} aria-label="Needs review">
          ← Review
        </button>
        <button className="fc-btn fc-btn--flip" onClick={() => {}} aria-label="Flip card">
          ↕ Flip
        </button>
        <button className="fc-btn fc-btn--know" onClick={handleKnow} aria-label="I know it">
          Know it →
        </button>
      </div>

      {/* Progress */}
      <div className="fc-progress-bar">
        <div
          className="fc-progress-fill"
          style={{ width: `${((initialCards.length - deck.length) / initialCards.length) * 100}%` }}
        />
      </div>
      <p className="fc-progress-text">
        {initialCards.length - deck.length} / {initialCards.length} cards done
        {' · '}✓ {known.length}
        {' · '}↻ {review.length}
      </p>
    </div>
  )
}

// ─── CSS ──────────────────────────────────────────────────────────────────────
/*
.fc-deck {
  position: relative;
  width: 340px;
  height: 480px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.fc-deck-ghost {
  position: absolute;
  width: 320px;
  height: 440px;
  border-radius: 20px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  bottom: 60px;
  transition: transform 0.3s ease;
}

.fc-scene {
  position: absolute;
  width: 320px;
  height: 440px;
  user-select: none;
  -webkit-user-select: none;
}

.fc-overlay {
  position: absolute;
  inset: 0;
  z-index: 10;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  pointer-events: none;
  border: 3px solid;
}

.fc-overlay--know   { background: rgba(34,197,94,0.15); border-color: #22c55e; color: #22c55e; }
.fc-overlay--review { background: rgba(239,68,68,0.15); border-color: #ef4444; color: #ef4444; }

/* 3D flip */
.fc-card {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.5s cubic-bezier(.25,.8,.25,1);
  border-radius: 20px;
}

.fc-card--flipped { transform: rotateY(180deg); }

.fc-face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 20px;
  padding: 28px 24px 20px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  box-shadow: 0 8px 32px rgba(0,0,0,0.10);
  display: flex;
  flex-direction: column;
}

.fc-face--back { transform: rotateY(180deg); }

.fc-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.72rem;
  opacity: 0.5;
  margin-bottom: 16px;
}

.fc-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.fc-label {
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  font-weight: 700;
  opacity: 0.4;
  margin-bottom: 12px;
}

.fc-text {
  font-size: 1.2rem;
  line-height: 1.6;
  font-weight: 500;
}

.fc-hint details { margin-top: 12px; font-size: 0.85rem; opacity: 0.7; }
.fc-source { font-size: 0.75rem; opacity: 0.5; margin-top: 12px; }
.fc-flip-cue { font-size: 0.72rem; opacity: 0.35; text-align: center; margin-top: 12px; }

.fc-buttons {
  display: flex;
  gap: 12px;
  margin-top: 16px;
  position: relative;
  z-index: 20;
}

.fc-btn {
  padding: 10px 20px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.85rem;
  border: 2px solid;
  cursor: pointer;
  transition: all 0.15s ease;
}

.fc-btn--review { border-color: #ef4444; color: #ef4444; background: transparent; }
.fc-btn--review:hover { background: #ef4444; color: white; }
.fc-btn--know   { border-color: #22c55e; color: #22c55e; background: transparent; }
.fc-btn--know:hover   { background: #22c55e; color: white; }
.fc-btn--flip   { border-color: var(--border); color: var(--text-secondary); background: transparent; }

.fc-progress-bar {
  width: 280px;
  height: 4px;
  background: var(--border);
  border-radius: 2px;
  margin-top: 20px;
  overflow: hidden;
}

.fc-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  border-radius: 2px;
  transition: width 0.4s ease;
}

.fc-progress-text {
  font-size: 0.75rem;
  opacity: 0.5;
  margin-top: 6px;
  text-align: center;
}
*/
