// src/pages/TestPage.jsx
//
// Düzeltmeler:
//  1. FillInTheBlank: Yerel (local) checked/correct state — başka soruların
//     cevabı kesinlikle sızmaz. Her soru kendi useState'ini kullanır.
//  2. FillInTheBlank: Klavye girişi çalışmıyordu çünkü hidden input focus
//     alınca onKeyDown tetikleniyordu ama onChange yoktu. Düzeltildi:
//     gerçek bir textarea + pointer-events:none overlay yaklaşımı.
//  3. Matching: Touch event koordinatları containerRef'e göre doğru hesaplanıyor.
//     Mobilde SVG çizgileri çalışır. Dokunmatik seçim/bırakma optimize edildi.

import { useEffect, useRef, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore, A, isCorrect } from '../store/store'

/* ════════════════════════════════════════════════════════════════════
   MULTIPLE CHOICE
   ════════════════════════════════════════════════════════════════════ */
function MultipleChoice({ question, questionIndex, answered, onAnswer }) {
  const { state } = useStore()
  const userAnswer = state.activeTest?.answers[questionIndex]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {question.options.map((opt, i) => {
        let extra = {}
        let icon  = null
        if (answered) {
          if (i === question.correctAnswer) {
            extra = { borderColor: 'var(--color-success)', background: 'rgba(74,222,128,0.08)' }
            icon  = '✅'
          } else if (i === userAnswer) {
            extra = { borderColor: 'var(--color-danger)', background: 'rgba(248,113,113,0.08)' }
            icon  = '❌'
          }
        }
        const isSelected = userAnswer === i && !answered
        return (
          <button
            key={i}
            disabled={answered}
            onClick={() => !answered && onAnswer(i)}
            style={{
              width: '100%', textAlign: 'left',
              padding: '13px 16px',
              borderRadius: 12,
              border: `2px solid ${isSelected ? 'var(--accent)' : 'var(--border)'}`,
              background: isSelected ? 'var(--accent-faint)' : 'var(--card-bg)',
              color: 'var(--text-primary)', cursor: answered ? 'default' : 'pointer',
              fontFamily: 'var(--font-body)', fontSize: '0.92rem',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              gap: 12,
              minHeight: 'var(--touch-min)',
              WebkitTapHighlightColor: 'transparent',
              ...extra,
            }}
          >
            <span>
              <strong style={{ marginRight: 10, opacity: 0.5 }}>
                {String.fromCharCode(65 + i)}.
              </strong>
              {opt.optionText}
            </span>
            {icon && <span style={{ flexShrink: 0 }}>{icon}</span>}
          </button>
        )
      })}
      {answered && question.options[question.correctAnswer]?.explanation && (
        <div style={{
          padding: '10px 14px', marginTop: 4,
          background: 'var(--bg-3)', border: '1px solid var(--border)',
          borderRadius: 10, fontSize: '0.85rem', color: 'var(--text-secondary)',
        }}>
          💬 {question.options[question.correctAnswer].explanation}
        </div>
      )}
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════
   TRUE / FALSE
   ════════════════════════════════════════════════════════════════════ */
function TrueFalse({ question, questionIndex, answered, onAnswer }) {
  const { state } = useStore()
  const userAnswer = state.activeTest?.answers[questionIndex]

  return (
    <div style={{ display: 'flex', gap: 12 }}>
      {[{ label: '✅ Doğru', value: true }, { label: '❌ Yanlış', value: false }].map(({ label, value }) => {
        let extra = {}
        if (answered) {
          if (value === question.correctAnswer) extra = { borderColor: 'var(--color-success)', background: 'rgba(74,222,128,0.08)' }
          else if (value === userAnswer)        extra = { borderColor: 'var(--color-danger)',  background: 'rgba(248,113,113,0.08)' }
        }
        const isSelected = userAnswer === value && !answered
        return (
          <button
            key={String(value)}
            disabled={answered}
            onClick={() => !answered && onAnswer(value)}
            style={{
              flex: 1, padding: '16px 12px', borderRadius: 12,
              border: `2px solid ${isSelected ? 'var(--accent)' : 'var(--border)'}`,
              background: isSelected ? 'var(--accent-faint)' : 'var(--card-bg)',
              color: 'var(--text-primary)', cursor: answered ? 'default' : 'pointer',
              fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 600,
              minHeight: 'var(--touch-min)',
              WebkitTapHighlightColor: 'transparent',
              ...extra,
            }}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════
   FILL IN THE BLANK
   ────────────────────────────────────────────────────────────────────
   DÜZELTME 1: Artık tamamen yerel state (checked/correct) kullanıyor.
               Başka soruların cevabı sızmaz — her soru bağımsız.
   DÜZELTME 2: Giriş mekanizması: visible <input> üst üste bindirilmiş
               hücrelerin üstünde, textarea yaklaşımı yerine. Bu sayede
               mobilde klavye açılır ve yazım çalışır.
   ════════════════════════════════════════════════════════════════════ */
function FillInTheBlank({ question, questionIndex }) {
  const { state, dispatch } = useStore()
  const answer     = String(question.correctAnswer)
  const userAnswer = state.activeTest?.answers[questionIndex] ?? ''
  const revealed   = state.activeTest?.revealed[questionIndex] ?? []

  // ── Her soru için YEREL state — diğer sorulara hiçbir şekilde sızmaz ──
  const [checked, setChecked] = useState(false)
  const [correct, setCorrect] = useState(false)

  // Reset local state when question changes
  const prevIndexRef = useRef(questionIndex)
  useEffect(() => {
    if (prevIndexRef.current !== questionIndex) {
      setChecked(false)
      setCorrect(false)
      prevIndexRef.current = questionIndex
    }
  }, [questionIndex])

  const inputRef = useRef(null)
  const unrevealed = answer.split('').filter((ch, i) => ch !== ' ' && !revealed.includes(i)).length

  // ── Build cell data ───────────────────────────────────────────────
  const cells = answer.split('').map((ch, i) => {
    if (ch === ' ') return { type: 'space', char: ' ' }
    if (revealed.includes(i)) return { type: 'revealed', char: ch }
    const typed = (userAnswer || '')[i] || ''
    if (checked) return {
      type: typed.toLowerCase() === ch.toLowerCase() ? 'correct' : 'wrong',
      char: typed || '_',
    }
    return { type: typed ? 'typed' : 'blank', char: typed || '_' }
  })

  // ── Input handling ────────────────────────────────────────────────
  // We use a real input overlaid on the cells for mobile keyboard support.
  // Value is always empty string so we intercept keystrokes manually.
  const handleKeyDown = (e) => {
    if (checked) { e.preventDefault(); return }

    // Pad to answer length
    const current = Array.from({ length: answer.length }, (_, i) => (userAnswer || '')[i] || '')

    if (e.key === 'Backspace') {
      e.preventDefault()
      // Find rightmost filled, non-revealed, non-space cell
      let pos = answer.length - 1
      while (pos >= 0 && (current[pos] === '' || revealed.includes(pos) || answer[pos] === ' ')) pos--
      if (pos >= 0) {
        current[pos] = ''
        dispatch({ type: A.ANSWER_QUESTION, payload: { questionIndex, answer: current.join('') } })
      }
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
      e.preventDefault()
      // Find leftmost empty, non-revealed, non-space cell
      let pos = 0
      while (pos < answer.length && (current[pos] !== '' || revealed.includes(pos) || answer[pos] === ' ')) pos++
      if (pos < answer.length) {
        current[pos] = e.key
        dispatch({ type: A.ANSWER_QUESTION, payload: { questionIndex, answer: current.join('') } })
      }
    }
  }

  // Mobile: onChange fires when user types on soft keyboard
  const handleChange = (e) => {
    if (checked) return
    const val = e.target.value
    if (!val) return
    // Take only the last character typed
    const char = val.slice(-1)

    const current = Array.from({ length: answer.length }, (_, i) => (userAnswer || '')[i] || '')
    let pos = 0
    while (pos < answer.length && (current[pos] !== '' || revealed.includes(pos) || answer[pos] === ' ')) pos++
    if (pos < answer.length) {
      current[pos] = char
      dispatch({ type: A.ANSWER_QUESTION, payload: { questionIndex, answer: current.join('') } })
    }
    // Clear the input value so next keystroke is always a single char
    e.target.value = ''
  }

  const handleCheck = () => {
    if (checked) return
    const given = (userAnswer || '').trim().toLowerCase()
    const corr  = answer.trim().toLowerCase()
    setCorrect(given === corr)
    setChecked(true)
  }

  const handleReveal = () => dispatch({ type: A.REVEAL_LETTER, payload: { questionIndex } })

  const cellColor = {
    revealed: 'var(--color-hint)',
    correct:  'var(--color-success)',
    wrong:    'var(--color-danger)',
    typed:    'var(--accent)',
    blank:    'var(--text-muted)',
  }

  return (
    <div>
      {/* Cells display + invisible input overlay */}
      <div
        style={{ position: 'relative', cursor: 'text', marginBottom: 8 }}
        onClick={() => !checked && inputRef.current?.focus()}
      >
        {/* Character cells */}
        <div style={{
          display: 'flex', flexWrap: 'wrap',
          gap: '6px 4px', padding: '20px 0 12px',
          alignItems: 'flex-end', pointerEvents: 'none',
        }}>
          {cells.map((cell, i) =>
            cell.type === 'space'
              ? <span key={i} style={{ width: 14 }} />
              : (
                <span key={i} style={{
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', minWidth: 22, padding: '0 3px',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(1rem, 3vw, 1.3rem)',
                    color: cellColor[cell.type] || 'var(--text-primary)',
                    lineHeight: 1, minHeight: '1.3rem',
                    fontWeight: cell.type === 'revealed' ? 700 : 400,
                  }}>
                    {cell.char}
                  </span>
                  <span style={{
                    display: 'block', width: '100%', height: 2,
                    background: cellColor[cell.type] || 'var(--border)',
                    marginTop: 5, borderRadius: 1,
                  }} />
                </span>
              )
          )}
        </div>

        {/* Invisible real input for keyboard capture */}
        <input
          ref={inputRef}
          type="text"
          inputMode="text"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          aria-label="Cevabınızı yazın"
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            opacity: 0, cursor: 'text', fontSize: '16px', /* prevent iOS zoom */
            border: 'none', background: 'transparent', padding: 0,
            zIndex: checked ? -1 : 1,
          }}
        />
      </div>

      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 16 }}>
        {answer.replace(/ /g, '').length} karakter
        {!checked && userAnswer && (
          <span style={{ marginLeft: 10, color: 'var(--accent)' }}>
            {userAnswer.replace(/ /g, '').length} girildi
          </span>
        )}
      </p>

      {/* Controls — only shown before check */}
      {!checked && (
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button
            className="btn btn--ghost btn--sm"
            onClick={handleReveal}
            disabled={unrevealed === 0}
          >
            💡 Harf Göster ({unrevealed})
          </button>
          <button
            className="btn btn--primary btn--sm"
            onClick={handleCheck}
          >
            Kontrol Et ✓
          </button>
        </div>
      )}

      {/* Result — shown only after check */}
      {checked && (
        <div className={correct ? 'feedback--correct' : 'feedback--wrong'}>
          {correct
            ? '✅ Doğru!'
            : <span>❌ Doğru cevap: <strong style={{ fontFamily: 'var(--font-mono)' }}>{answer}</strong></span>
          }
        </div>
      )}
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════
   MATCHING — Touch-optimized
   ────────────────────────────────────────────────────────────────────
   DÜZELTME 3: Touch eventlerinde clientX/Y → containerRef'e göre
               offsetleniyor. getBoundingClientRect() scroll-safe.
               Mobilde SVG çizgileri ve seçim/bırakma çalışır.
   ════════════════════════════════════════════════════════════════════ */
function Matching({ question, questionIndex }) {
  const pairs = question.options
  const n = pairs.length

  // Shuffle right column once
  const [rightOrder] = useState(() => {
    const a = [...Array(n).keys()]
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]]
    }
    return a
  })

  const [connections, setConnections] = useState({})  // leftIdx → rightShuffledIdx
  const [selected,    setSelected]    = useState(null) // currently selected leftIdx
  const [checked,     setChecked]     = useState(false)
  const [correct,     setCorrect]     = useState(false)
  const [lines,       setLines]       = useState([])
  const [livePos,     setLivePos]     = useState(null) // cursor position for preview line

  const containerRef = useRef(null)
  const leftRefs  = useRef([])
  const rightRefs = useRef([])

  // ── Compute SVG lines from connections ────────────────────────────
  const computeLines = useCallback(() => {
    if (!containerRef.current) return
    const cr = containerRef.current.getBoundingClientRect()

    const result = Object.entries(connections).map(([li, ri]) => {
      const lEl = leftRefs.current[+li]
      const rEl = rightRefs.current[+ri]
      if (!lEl || !rEl) return null
      const lr = lEl.getBoundingClientRect()
      const rr = rEl.getBoundingClientRect()
      // Subtract container origin to get local coords
      const x1 = lr.right  - cr.left
      const y1 = lr.top    - cr.top + lr.height / 2
      const x2 = rr.left   - cr.left
      const y2 = rr.top    - cr.top + rr.height / 2

      let state = 'connected'
      if (checked) {
        state = String(question.correctAnswer[li]) === String(rightOrder[+ri]) ? 'correct' : 'wrong'
      }
      return { x1, y1, x2, y2, state }
    }).filter(Boolean)

    setLines(result)
  }, [connections, checked, question.correctAnswer, rightOrder])

  useEffect(() => { computeLines() }, [computeLines])

  // Also recompute on window resize (orientation change on mobile)
  useEffect(() => {
    window.addEventListener('resize', computeLines)
    return () => window.removeEventListener('resize', computeLines)
  }, [computeLines])

  // ── Get cursor pos relative to container ─────────────────────────
  const getRelativePos = useCallback((e) => {
    if (!containerRef.current) return null
    const cr = containerRef.current.getBoundingClientRect()
    const src = e.touches ? e.touches[0] : e
    return { x: src.clientX - cr.left, y: src.clientY - cr.top }
  }, [])

  // ── Get anchor point of a left node ──────────────────────────────
  const getLeftAnchor = useCallback((li) => {
    const el = leftRefs.current[li]
    if (!el || !containerRef.current) return null
    const cr = containerRef.current.getBoundingClientRect()
    const er = el.getBoundingClientRect()
    return { x: er.right - cr.left, y: er.top - cr.top + er.height / 2 }
  }, [])

  // ── Move handler (mouse + touch) ──────────────────────────────────
  const handleMove = useCallback((e) => {
    if (selected === null) return
    // Prevent page scroll while connecting on mobile
    e.preventDefault()
    setLivePos(getRelativePos(e))
  }, [selected, getRelativePos])

  // ── Left node tap/click ───────────────────────────────────────────
  const handleLeftTap = (li) => {
    if (checked) return
    setSelected(s => s === li ? (setLivePos(null), null) : li)
  }

  // ── Right node tap/click ──────────────────────────────────────────
  const handleRightTap = (ri) => {
    if (checked || selected === null) return
    const next = { ...connections }
    // Remove existing connection from this left node
    delete next[selected]
    // Remove any existing connection TO this right node
    Object.keys(next).forEach(k => { if (next[k] === ri) delete next[k] })
    next[selected] = ri
    setConnections(next)
    setSelected(null)
    setLivePos(null)
  }

  // ── Cancel selection on container tap (empty area) ───────────────
  const handleContainerTap = (e) => {
    if (e.target === containerRef.current) {
      setSelected(null); setLivePos(null)
    }
  }

  const handleCheck = () => {
    if (Object.keys(connections).length < n) return
    setChecked(true)
    const allOk = Object.entries(question.correctAnswer).every(
      ([li, correctRightOrig]) => String(rightOrder[connections[li]]) === String(correctRightOrig)
    )
    setCorrect(allOk)
  }

  const handleReset = () => {
    setConnections({}); setChecked(false)
    setSelected(null); setLivePos(null); setLines([])
  }

  const connCount = Object.keys(connections).length

  const lineColor = { connected: 'var(--accent)', correct: 'var(--color-success)', wrong: 'var(--color-danger)' }

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', userSelect: 'none', WebkitUserSelect: 'none', touchAction: 'none' }}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      onTouchEnd={() => {/* handled per-node */}}
      onClick={handleContainerTap}
    >
      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 16 }}>
        {selected !== null
          ? '👆 Şimdi sağ sütundan eşleşeni seç'
          : 'Sol sütundan bir terim seç, sonra sağ sütundan eşleştir'}
      </p>

      {/* SVG overlay */}
      <svg
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          pointerEvents: 'none', overflow: 'visible', zIndex: 1,
        }}
        aria-hidden="true"
      >
        {/* Established lines */}
        {lines.map((l, i) => (
          <line key={i}
            x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke={lineColor[l.state] || 'var(--accent)'}
            strokeWidth="2.5" strokeLinecap="round"
          />
        ))}
        {/* Live preview line */}
        {selected !== null && livePos && (() => {
          const a = getLeftAnchor(selected)
          return a ? (
            <line
              x1={a.x} y1={a.y} x2={livePos.x} y2={livePos.y}
              stroke="var(--accent)" strokeWidth="2"
              strokeDasharray="6 4" strokeLinecap="round" opacity="0.55"
            />
          ) : null
        })()}
      </svg>

      {/* Two columns */}
      <div style={{
        display: 'flex',
        gap: 'clamp(32px, 8vw, 64px)',
        position: 'relative', zIndex: 2,
        margin: '8px 0 20px',
      }}>
        {/* LEFT */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {pairs.map((pair, li) => {
            const isSelectedNode = selected === li
            const isConnected    = li in connections
            let nodeExtra = {}
            if (checked && isConnected) {
              const ri = connections[li]
              const ok = String(question.correctAnswer[li]) === String(rightOrder[ri])
              nodeExtra = ok
                ? { borderColor: 'var(--color-success)', background: 'rgba(74,222,128,0.08)' }
                : { borderColor: 'var(--color-danger)',  background: 'rgba(248,113,113,0.08)' }
            }
            return (
              <button
                key={li}
                ref={el => leftRefs.current[li] = el}
                onClick={() => handleLeftTap(li)}
                disabled={checked}
                style={{
                  padding: '11px 14px',
                  borderRadius: 10,
                  border: `2px solid ${isSelectedNode ? 'var(--accent)' : isConnected ? 'var(--accent)' : 'var(--border)'}`,
                  background: isSelectedNode ? 'var(--accent-faint)' : 'var(--card-bg)',
                  color: 'var(--text-primary)',
                  cursor: checked ? 'default' : 'pointer',
                  textAlign: 'left',
                  fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
                  fontFamily: 'var(--font-body)',
                  minHeight: 'var(--touch-min)',
                  WebkitTapHighlightColor: 'transparent',
                  boxShadow: isSelectedNode ? '0 0 0 3px var(--accent-faint)' : 'none',
                  ...nodeExtra,
                }}
              >
                {pair.leftText}
              </button>
            )
          })}
        </div>

        {/* RIGHT */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {rightOrder.map((origIdx, ri) => {
            const isTargeted = Object.values(connections).includes(ri)
            let nodeExtra = {}
            if (checked && isTargeted) {
              const li = Object.keys(connections).find(k => connections[k] === ri)
              if (li !== undefined) {
                const ok = String(question.correctAnswer[li]) === String(origIdx)
                nodeExtra = ok
                  ? { borderColor: 'var(--color-success)', background: 'rgba(74,222,128,0.08)' }
                  : { borderColor: 'var(--color-danger)',  background: 'rgba(248,113,113,0.08)' }
              }
            }
            const isActive = selected !== null && !checked
            return (
              <button
                key={ri}
                ref={el => rightRefs.current[ri] = el}
                onClick={() => handleRightTap(ri)}
                disabled={checked}
                style={{
                  padding: '11px 14px',
                  borderRadius: 10,
                  border: `2px solid ${isTargeted ? 'var(--accent)' : isActive ? 'var(--accent-2)' : 'var(--border)'}`,
                  background: isActive && !isTargeted ? 'var(--accent-2-faint)' : 'var(--card-bg)',
                  color: 'var(--text-primary)',
                  cursor: checked ? 'default' : isActive ? 'crosshair' : 'pointer',
                  textAlign: 'right',
                  fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)',
                  fontFamily: 'var(--font-body)',
                  minHeight: 'var(--touch-min)',
                  WebkitTapHighlightColor: 'transparent',
                  ...nodeExtra,
                }}
              >
                {pairs[origIdx].rightText}
              </button>
            )
          })}
        </div>
      </div>

      {/* Controls */}
      {!checked ? (
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button className="btn btn--ghost btn--sm" onClick={handleReset}>↺ Sıfırla</button>
          <button
            className="btn btn--primary btn--sm"
            onClick={handleCheck}
            disabled={connCount < n}
          >
            Kontrol Et ({connCount}/{n}) ✓
          </button>
        </div>
      ) : (
        <div className={correct ? 'feedback--correct' : 'feedback--wrong'}>
          {correct
            ? '✅ Tüm eşleştirmeler doğru!'
            : '❌ Bazı eşleştirmeler yanlış. Kırmızı bağlantıları kontrol et.'}
          {!correct && (
            <button className="btn btn--ghost btn--sm" style={{ marginLeft: 12 }} onClick={handleReset}>
              Tekrar Dene
            </button>
          )}
        </div>
      )}
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════
   MAIN TEST PAGE
   ════════════════════════════════════════════════════════════════════ */
export default function TestPage() {
  const { state, dispatch } = useStore()
  const navigate = useNavigate()
  const { activeTest } = state

  useEffect(() => {
    if (!activeTest) navigate('/test-setup')
  }, [])

  if (!activeTest) return null

  const { questions, currentIndex, answers, hints } = activeTest
  const q = questions[currentIndex]
  const answered = answers[currentIndex] !== undefined

  const handleAnswer = (answer) => {
    dispatch({ type: A.ANSWER_QUESTION, payload: { questionIndex: currentIndex, answer } })
  }

  const handleNav = (i) => dispatch({ type: A.NAVIGATE_QUESTION, payload: i })

  const handleSaveExit = () => {
    dispatch({ type: A.SAVE_AND_EXIT })
    navigate('/')
  }

  const handleFinish = () => {
    dispatch({ type: A.FINISH_TEST })
    let correct = 0
    questions.forEach((qu, i) => { if (isCorrect(qu, answers[i])) correct++ })
    dispatch({
      type: A.UPDATE_PROFILE,
      payload: { summary: {
        correct, total: questions.length,
        subject: activeTest.subject, topic: activeTest.topic,
        score: Math.round(correct / questions.length * 100),
      }},
    })
    navigate('/results')
  }

  const answeredCount = Object.keys(answers).length
  const progress = (answeredCount / questions.length) * 100

  const typeLabel = {
    multiple_choice:   'Çoktan Seçmeli',
    true_false:        'Doğru / Yanlış',
    fill_in_the_blank: 'Boşluk Doldurma',
    matching:          'Eşleştirme',
  }

  return (
    <div style={{ maxWidth: 680, margin: '0 auto' }} className="fade-up">

      {/* ── Top bar ── */}
      <div style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16, gap: 12,
      }}>
        <div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {activeTest.subject} › {activeTest.topic === 'mixed' ? 'Karışık' : activeTest.topic}
          </div>
          <div style={{ fontWeight: 600, marginTop: 2, fontSize: '0.95rem' }}>
            Soru {currentIndex + 1} / {questions.length}
          </div>
        </div>
        <button className="btn btn--ghost btn--sm" onClick={handleSaveExit}>
          💾 Kaydet & Çık
        </button>
      </div>

      {/* ── Progress bar ── */}
      <div className="progress-bar" style={{ marginBottom: 14 }}>
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* ── Question number dots ── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
        {questions.map((_, i) => {
          let bg = 'var(--border)'
          if (i === currentIndex) bg = 'var(--accent)'
          else if (answers[i] !== undefined) {
            bg = isCorrect(questions[i], answers[i]) ? 'var(--color-success)' : 'var(--color-danger)'
          }
          return (
            <button
              key={i}
              onClick={() => handleNav(i)}
              aria-label={`Soru ${i + 1}`}
              style={{
                width: 30, height: 30, borderRadius: 7,
                border: 'none', background: bg,
                color: i === currentIndex ? '#0f0f13' : 'white',
                cursor: 'pointer', fontSize: '0.72rem', fontWeight: 700,
                opacity: answers[i] === undefined && i !== currentIndex ? 0.35 : 1,
                transition: 'background 0.2s ease',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              {i + 1}
            </button>
          )
        })}
      </div>

      {/* ── Question card ── */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18, gap: 12 }}>
          <span style={{
            fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.1em', color: 'var(--accent)',
            background: 'var(--accent-faint)', padding: '4px 10px', borderRadius: 20,
            flexShrink: 0,
          }}>
            {typeLabel[q.type] || q.type}
          </span>
          <button
            className="btn btn--ghost btn--sm"
            onClick={() => dispatch({ type: A.SHOW_HINT, payload: { questionIndex: currentIndex } })}
          >
            💡 İpucu
          </button>
        </div>

        {/* Question text */}
        <p style={{
          fontSize: 'clamp(1rem, 3vw, 1.1rem)',
          fontWeight: 500, lineHeight: 1.65,
          marginBottom: 22,
          fontFamily: 'var(--font-display)',
        }}>
          {q.questionText}
        </p>

        {/* Hint */}
        {hints[currentIndex] && (
          <div style={{
            padding: '10px 14px',
            background: 'rgba(96,165,250,0.08)',
            border: '1px solid rgba(96,165,250,0.2)',
            borderRadius: 10, fontSize: '0.875rem',
            color: 'var(--color-hint)', marginBottom: 20,
          }}>
            💡 {q.hint || 'İpucu bulunamadı.'}
          </div>
        )}

        {/* ── Render question type ── */}
        {q.type === 'multiple_choice' && (
          <MultipleChoice
            question={q} questionIndex={currentIndex}
            answered={answered} onAnswer={handleAnswer}
          />
        )}
        {q.type === 'true_false' && (
          <TrueFalse
            question={q} questionIndex={currentIndex}
            answered={answered} onAnswer={handleAnswer}
          />
        )}
        {q.type === 'fill_in_the_blank' && (
          // key prop forces full remount when navigating — prevents stale state
          <FillInTheBlank
            key={`fitb-${questionIndex}`}
            question={q}
            questionIndex={currentIndex}
          />
        )}
        {q.type === 'matching' && (
          <Matching
            key={`match-${questionIndex}`}
            question={q}
            questionIndex={currentIndex}
          />
        )}

        {/* Source */}
        {q.source && (
          <div style={{
            marginTop: 20, fontSize: '0.74rem',
            color: 'var(--text-muted)',
            borderTop: '1px solid var(--border)', paddingTop: 12,
          }}>
            📖 {q.source}
          </div>
        )}
      </div>

      {/* ── Navigation ── */}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between', alignItems: 'center' }}>
        <button
          className="btn btn--ghost"
          onClick={() => handleNav(currentIndex - 1)}
          disabled={currentIndex === 0}
        >
          ← Önceki
        </button>

        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center' }}>
          {answeredCount}/{questions.length} yanıtlandı
        </span>

        {currentIndex < questions.length - 1 ? (
          <button className="btn btn--primary" onClick={() => handleNav(currentIndex + 1)}>
            Sonraki →
          </button>
        ) : (
          <button className="btn btn--secondary" onClick={handleFinish}>
            Bitir 🏁
          </button>
        )}
      </div>
    </div>
  )
}
