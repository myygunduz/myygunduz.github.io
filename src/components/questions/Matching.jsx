// ─── src/components/questions/Matching.jsx ───────────────────────────────────
// Draw lines between two columns via click-select (works on both mouse & touch).
// Uses an SVG overlay to render the connection lines.

import { useState, useRef, useEffect, useCallback } from 'react'

/**
 * Matching
 *
 * The question object must have:
 *   question.options = [
 *     { leftText: "Term A",  rightText: "Definition 1" },
 *     { leftText: "Term B",  rightText: "Definition 2" },
 *     ...
 *   ]
 *   question.correctAnswer = { 0: 2, 1: 0, 2: 1, ... }
 *     (leftIndex → rightIndex mapping)
 *
 * Props:
 *   question      – full question object
 *   questionIndex – index in the active test
 *   onCheck       – called with (isCorrect: bool)
 */
export default function Matching({ question, questionIndex, onCheck }) {
  const pairs = question.options   // [{ leftText, rightText }]
  const n     = pairs.length

  // Shuffle the right column so it's not trivially aligned
  const [rightOrder] = useState(() => shuffle(pairs.map((_, i) => i)))

  // connections: { [leftIndex]: rightShuffledIndex }
  const [connections, setConnections] = useState({})
  // Which left node is currently "selected" waiting for a right pick
  const [selected, setSelected]  = useState(null)   // leftIndex | null
  const [checked,  setChecked]   = useState(false)
  const [correct,  setCorrect]   = useState(false)

  // Refs to measure node positions for SVG line drawing
  const leftRefs  = useRef([])
  const rightRefs = useRef([])
  const svgRef    = useRef(null)
  const containerRef = useRef(null)

  const [lines, setLines] = useState([])   // [{x1,y1,x2,y2, state}]
  const [mousePos, setMousePos] = useState(null)  // live cursor while dragging

  // ── recompute SVG lines whenever connections change ───────────────────────
  const computeLines = useCallback(() => {
    if (!containerRef.current) return
    const containerRect = containerRef.current.getBoundingClientRect()

    const computed = Object.entries(connections).map(([li, ri]) => {
      const lEl = leftRefs.current[Number(li)]
      const rEl = rightRefs.current[Number(ri)]
      if (!lEl || !rEl) return null
      const lRect = lEl.getBoundingClientRect()
      const rRect = rEl.getBoundingClientRect()
      const x1 = lRect.right  - containerRect.left
      const y1 = lRect.top    - containerRect.top  + lRect.height / 2
      const x2 = rRect.left   - containerRect.left
      const y2 = rRect.top    - containerRect.top  + rRect.height / 2

      let state = 'connected'
      if (checked) {
        // rightOrder[ri] gives the original index; correctAnswer[li] is the correct original index
        state = String(question.correctAnswer[li]) === String(rightOrder[Number(ri)]) ? 'correct' : 'wrong'
      }
      return { x1, y1, x2, y2, state }
    }).filter(Boolean)

    setLines(computed)
  }, [connections, checked, question.correctAnswer, rightOrder])

  useEffect(() => { computeLines() }, [computeLines])

  // Live preview line while a left node is selected
  const handleMouseMove = useCallback((e) => {
    if (selected === null) return
    const containerRect = containerRef.current?.getBoundingClientRect()
    if (!containerRect) return
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    setMousePos({
      x: clientX - containerRect.left,
      y: clientY - containerRect.top,
    })
  }, [selected])

  // ── click left node ───────────────────────────────────────────────────────
  const handleLeftClick = (leftIdx) => {
    if (checked) return
    if (selected === leftIdx) {
      setSelected(null)
      setMousePos(null)
    } else {
      setSelected(leftIdx)
    }
  }

  // ── click right node ──────────────────────────────────────────────────────
  const handleRightClick = (rightShuffledIdx) => {
    if (checked) return
    if (selected === null) return

    // Remove any existing connection from this left node
    // and any existing connection TO this right node
    const next = { ...connections }
    delete next[selected]
    Object.keys(next).forEach(k => {
      if (String(next[k]) === String(rightShuffledIdx)) delete next[k]
    })
    next[selected] = rightShuffledIdx

    setConnections(next)
    setSelected(null)
    setMousePos(null)
  }

  // ── check ─────────────────────────────────────────────────────────────────
  const handleCheck = () => {
    if (Object.keys(connections).length < n) return  // not all connected
    setChecked(true)
    // Map connections back to original indices
    const userAnswer = {}
    Object.entries(connections).forEach(([li, ri]) => {
      userAnswer[li] = rightOrder[ri]
    })
    const allCorrect = Object.entries(question.correctAnswer).every(
      ([li, correctRi]) => String(userAnswer[li]) === String(correctRi)
    )
    setCorrect(allCorrect)
    onCheck?.(allCorrect)
    computeLines()
  }

  const handleReset = () => {
    setConnections({})
    setChecked(false)
    setSelected(null)
    setMousePos(null)
    setLines([])
  }

  const connectedCount = Object.keys(connections).length

  // preview line anchor
  const getAnchor = (li) => {
    const el = leftRefs.current[li]
    if (!el || !containerRef.current) return null
    const cr = containerRef.current.getBoundingClientRect()
    const er = el.getBoundingClientRect()
    return {
      x: er.right  - cr.left,
      y: er.top    - cr.top + er.height / 2,
    }
  }

  return (
    <div
      className="matching-wrapper"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
      onMouseLeave={() => { setSelected(null); setMousePos(null) }}
    >
      <p className="matching-question">{question.questionText}</p>
      <p className="matching-hint-text">
        Click a term on the left, then click its match on the right.
      </p>

      {/* SVG overlay for lines */}
      <svg ref={svgRef} className="matching-svg" aria-hidden="true">
        <defs>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill="var(--accent)" />
          </marker>
        </defs>

        {/* Established connections */}
        {lines.map((l, i) => (
          <line key={i}
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            className={`matching-line matching-line--${l.state}`}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        ))}

        {/* Preview line */}
        {selected !== null && mousePos && (() => {
          const anchor = getAnchor(selected)
          if (!anchor) return null
          return (
            <line
              x1={anchor.x} y1={anchor.y}
              x2={mousePos.x} y2={mousePos.y}
              className="matching-line matching-line--preview"
              strokeWidth="2"
              strokeDasharray="6 4"
              strokeLinecap="round"
            />
          )
        })()}
      </svg>

      {/* Two columns */}
      <div className="matching-columns">
        {/* Left column */}
        <div className="matching-col matching-col--left">
          {pairs.map((pair, li) => {
            const isSelected   = selected === li
            const isConnected  = li in connections
            let nodeState = ''
            if (checked && isConnected) {
              const ri = connections[li]
              nodeState = String(question.correctAnswer[li]) === String(rightOrder[ri]) ? 'correct' : 'wrong'
            }
            return (
              <button
                key={li}
                ref={el => leftRefs.current[li] = el}
                className={`matching-node matching-node--left
                  ${isSelected  ? 'matching-node--selected'  : ''}
                  ${isConnected ? 'matching-node--connected'  : ''}
                  ${nodeState   ? `matching-node--${nodeState}` : ''}
                `}
                onClick={() => handleLeftClick(li)}
                disabled={checked}
              >
                {pair.leftText}
              </button>
            )
          })}
        </div>

        {/* Right column (shuffled) */}
        <div className="matching-col matching-col--right">
          {rightOrder.map((origIdx, ri) => {
            const isTargeted = Object.values(connections).includes(ri)
            let nodeState = ''
            if (checked && isTargeted) {
              const li = Object.keys(connections).find(k => connections[k] === ri)
              if (li !== undefined) {
                nodeState = String(question.correctAnswer[li]) === String(origIdx) ? 'correct' : 'wrong'
              }
            }
            return (
              <button
                key={ri}
                ref={el => rightRefs.current[ri] = el}
                className={`matching-node matching-node--right
                  ${isTargeted ? 'matching-node--connected'  : ''}
                  ${nodeState  ? `matching-node--${nodeState}` : ''}
                `}
                onClick={() => handleRightClick(ri)}
                disabled={checked}
              >
                {pairs[origIdx].rightText}
              </button>
            )
          })}
        </div>
      </div>

      {/* Controls */}
      {!checked ? (
        <div className="matching-controls">
          <button className="btn btn--ghost" onClick={handleReset}>
            ↺ Reset
          </button>
          <button
            className="btn btn--primary"
            onClick={handleCheck}
            disabled={connectedCount < n}
          >
            Check ({connectedCount}/{n}) ✓
          </button>
        </div>
      ) : (
        <div className={`fitb-feedback ${correct ? 'feedback--correct' : 'feedback--wrong'}`}>
          {correct ? '✅ All matches correct!' : '❌ Some matches are wrong. See highlighted lines.'}
          <button className="btn btn--ghost" style={{ marginLeft: 12 }} onClick={handleReset}>
            Try Again
          </button>
        </div>
      )}
    </div>
  )
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ─── CSS ──────────────────────────────────────────────────────────────────────
/*
.matching-wrapper {
  position: relative;
  user-select: none;
}

.matching-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: visible;
  z-index: 1;
}

.matching-line            { stroke: var(--accent);  }
.matching-line--connected { stroke: var(--accent);  }
.matching-line--correct   { stroke: #22c55e; }
.matching-line--wrong     { stroke: #ef4444; }
.matching-line--preview   { stroke: var(--accent); opacity: 0.5; }

.matching-columns {
  display: flex;
  gap: 80px;          /* gap gives room for the SVG lines */
  justify-content: space-between;
  position: relative;
  z-index: 2;
  margin: 24px 0;
}

.matching-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}

.matching-node {
  padding: 12px 16px;
  border-radius: 10px;
  border: 2px solid var(--border);
  background: var(--card-bg);
  text-align: left;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.15s ease;
  position: relative;
  z-index: 2;
}

.matching-node:hover { border-color: var(--accent); background: var(--accent-faint); }

.matching-node--selected  { border-color: var(--accent); background: var(--accent-faint); box-shadow: 0 0 0 3px var(--accent-faint); }
.matching-node--connected { border-color: var(--accent); opacity: 0.8; }
.matching-node--correct   { border-color: #22c55e; background: rgba(34,197,94,0.08); }
.matching-node--wrong     { border-color: #ef4444; background: rgba(239,68,68,0.08); }

.matching-col--right .matching-node { text-align: right; }

.matching-hint-text { font-size: 0.78rem; opacity: 0.45; margin-bottom: 4px; }

.matching-controls {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}
*/
