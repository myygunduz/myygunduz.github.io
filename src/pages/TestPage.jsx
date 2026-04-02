// src/pages/TestPage.jsx
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore, A, isCorrect, selectors } from '../store/store'

// ─── Question type components ─────────────────────────────────────────────────

function MultipleChoice({ question, questionIndex, answered, onAnswer }) {
  const { state } = useStore()
  const userAnswer = state.activeTest?.answers[questionIndex]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {question.options.map((opt, i) => {
        let style = {}
        let icon  = null
        if (answered) {
          if (i === question.correctAnswer) {
            style = { borderColor: 'var(--color-success)', background: 'rgba(74,222,128,0.08)' }
            icon  = '✅'
          } else if (i === userAnswer) {
            style = { borderColor: 'var(--color-danger)', background: 'rgba(248,113,113,0.08)' }
            icon  = '❌'
          }
        }
        const isSelected = userAnswer === i
        return (
          <button
            key={i}
            disabled={answered}
            onClick={() => onAnswer(i)}
            style={{
              width: '100%', textAlign: 'left', padding: '14px 18px',
              borderRadius: 12, border: `2px solid ${isSelected && !answered ? 'var(--accent)' : 'var(--border)'}`,
              background: isSelected && !answered ? 'var(--accent-faint)' : 'var(--card-bg)',
              color: 'var(--text-primary)', cursor: answered ? 'default' : 'pointer',
              fontFamily: 'var(--font-body)', fontSize: '0.95rem',
              transition: 'all 0.15s ease', display: 'flex', justifyContent: 'space-between',
              ...style,
            }}
            onMouseEnter={e => { if (!answered) e.currentTarget.style.borderColor = 'var(--accent)' }}
            onMouseLeave={e => { if (!answered && !isSelected) e.currentTarget.style.borderColor = 'var(--border)' }}
          >
            <span><strong style={{ marginRight: 10, opacity: 0.5 }}>{String.fromCharCode(65+i)}.</strong>{opt.optionText}</span>
            {icon && <span>{icon}</span>}
          </button>
        )
      })}
      {answered && (
        <div className="feedback--correct" style={{ borderColor: 'transparent', background: 'var(--bg-3)' }}>
          💬 {question.options[question.correctAnswer]?.explanation}
        </div>
      )}
    </div>
  )
}

function TrueFalse({ question, questionIndex, answered, onAnswer }) {
  const { state } = useStore()
  const userAnswer = state.activeTest?.answers[questionIndex]

  const opts = [
    { label: '✅ Doğru', value: true },
    { label: '❌ Yanlış', value: false },
  ]

  return (
    <div style={{ display: 'flex', gap: 16 }}>
      {opts.map(({ label, value }) => {
        let extra = {}
        if (answered) {
          if (value === question.correctAnswer) extra = { borderColor: 'var(--color-success)', background: 'rgba(74,222,128,0.08)' }
          else if (value === userAnswer)        extra = { borderColor: 'var(--color-danger)',  background: 'rgba(248,113,113,0.08)' }
        }
        return (
          <button
            key={String(value)}
            disabled={answered}
            onClick={() => onAnswer(value)}
            style={{
              flex: 1, padding: '18px 20px', borderRadius: 12,
              border: `2px solid ${userAnswer === value && !answered ? 'var(--accent)' : 'var(--border)'}`,
              background: userAnswer === value && !answered ? 'var(--accent-faint)' : 'var(--card-bg)',
              color: 'var(--text-primary)', cursor: answered ? 'default' : 'pointer',
              fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 600,
              transition: 'all 0.15s ease', ...extra,
            }}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}

function FillInTheBlank({ question, questionIndex }) {
  const { state, dispatch } = useStore()
  const answer     = String(question.correctAnswer)
  const userAnswer = state.activeTest?.answers[questionIndex] ?? ''
  const revealed   = state.activeTest?.revealed[questionIndex] ?? []
  const [checked, setChecked] = useState(false)
  const [correct,  setCorrect]  = useState(false)
  const inputRef = useRef(null)

  const unrevealed = answer.split('').filter((ch, i) => ch !== ' ' && !revealed.includes(i)).length

  const cells = answer.split('').map((ch, i) => {
    if (ch === ' ') return { type: 'space', char: ' ' }
    if (revealed.includes(i)) return { type: 'revealed', char: ch }
    const typed = (userAnswer || '')[i] || ''
    if (checked) return { type: typed.toLowerCase() === ch.toLowerCase() ? 'correct' : 'wrong', char: typed || '_' }
    return { type: typed ? 'typed' : 'blank', char: typed || '_' }
  })

  const handleKeyDown = (e) => {
    if (checked) return
    const current = [...(userAnswer || '').padEnd(answer.length, '')]
    if (e.key === 'Backspace') {
      let pos = current.length - 1
      while (pos >= 0 && (current[pos] === '' || revealed.includes(pos) || answer[pos] === ' ')) pos--
      if (pos >= 0) { current[pos] = ''; dispatch({ type: A.ANSWER_QUESTION, payload: { questionIndex, answer: current.join('') } }) }
      e.preventDefault()
    } else if (e.key.length === 1) {
      let pos = 0
      while (pos < answer.length && (current[pos] !== '' || revealed.includes(pos) || answer[pos] === ' ')) pos++
      if (pos < answer.length) { current[pos] = e.key; dispatch({ type: A.ANSWER_QUESTION, payload: { questionIndex, answer: current.join('') } }) }
      e.preventDefault()
    }
  }

  const handleCheck = () => {
    const given = (userAnswer || '').trim().toLowerCase()
    const corr  = answer.trim().toLowerCase()
    setCorrect(given === corr)
    setChecked(true)
  }

  const cellColors = { revealed: 'var(--color-hint)', correct: 'var(--color-success)', wrong: 'var(--color-danger)', typed: 'var(--accent)', blank: 'var(--text-muted)' }

  return (
    <div onClick={() => inputRef.current?.focus()} style={{ cursor: 'text' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 2px', margin: '24px 0', alignItems: 'flex-end' }}>
        {cells.map((cell, i) => (
          cell.type === 'space'
            ? <span key={i} style={{ width: 16 }} />
            : <span key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 24, padding: '0 3px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.3rem', color: cellColors[cell.type] || 'var(--text-primary)', lineHeight: 1, minHeight: '1.3rem' }}>
                  {cell.char}
                </span>
                <span style={{ display: 'block', width: '100%', height: 2, background: cellColors[cell.type] || 'var(--border)', marginTop: 4, borderRadius: 1 }} />
              </span>
        ))}
      </div>
      <input ref={inputRef} onKeyDown={handleKeyDown} readOnly value="" style={{ position: 'absolute', opacity: 0, width: 1, height: 1, pointerEvents: 'none' }} />
      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 16 }}>{answer.replace(/ /g,'').length} karakter</p>
      {!checked && (
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn btn--ghost btn--sm" onClick={() => dispatch({ type: A.REVEAL_LETTER, payload: { questionIndex } })} disabled={unrevealed === 0}>
            💡 Harf Göster ({unrevealed})
          </button>
          <button className="btn btn--primary btn--sm" onClick={handleCheck}>Kontrol Et ✓</button>
        </div>
      )}
      {checked && (
        <div className={correct ? 'feedback--correct' : 'feedback--wrong'}>
          {correct ? '✅ Doğru!' : <>❌ Doğru cevap: <strong>{answer}</strong></>}
        </div>
      )}
    </div>
  )
}

function Matching({ question, questionIndex }) {
  const pairs = question.options
  const n = pairs.length
  const [rightOrder] = useState(() => {
    const a = [...pairs.map((_, i) => i)]
    for (let i = a.length-1; i>0; i--) { const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]] }
    return a
  })
  const [connections, setConnections] = useState({})
  const [selected, setSelected]       = useState(null)
  const [checked,  setChecked]         = useState(false)
  const [correct,  setCorrect]         = useState(false)
  const leftRefs  = useRef([])
  const rightRefs = useRef([])
  const containerRef = useRef(null)
  const [lines, setLines] = useState([])
  const [mouse, setMouse] = useState(null)

  const computeLines = () => {
    if (!containerRef.current) return
    const cr = containerRef.current.getBoundingClientRect()
    const computed = Object.entries(connections).map(([li, ri]) => {
      const lEl = leftRefs.current[+li], rEl = rightRefs.current[+ri]
      if (!lEl || !rEl) return null
      const lr = lEl.getBoundingClientRect(), rr = rEl.getBoundingClientRect()
      let state = 'connected'
      if (checked) state = String(question.correctAnswer[li]) === String(rightOrder[+ri]) ? 'correct' : 'wrong'
      return { x1: lr.right-cr.left, y1: lr.top-cr.top+lr.height/2, x2: rr.left-cr.left, y2: rr.top-cr.top+rr.height/2, state }
    }).filter(Boolean)
    setLines(computed)
  }

  useEffect(computeLines, [connections, checked])

  const handleMouseMove = (e) => {
    if (selected === null || !containerRef.current) return
    const cr = containerRef.current.getBoundingClientRect()
    const cx = e.touches ? e.touches[0].clientX : e.clientX
    const cy = e.touches ? e.touches[0].clientY : e.clientY
    setMouse({ x: cx-cr.left, y: cy-cr.top })
  }

  const getAnchor = (li) => {
    const el = leftRefs.current[li]
    if (!el || !containerRef.current) return null
    const cr = containerRef.current.getBoundingClientRect(), er = el.getBoundingClientRect()
    return { x: er.right-cr.left, y: er.top-cr.top+er.height/2 }
  }

  const leftClick = (li) => { if (checked) return; setSelected(s => s===li ? null : li); setMouse(null) }
  const rightClick = (ri) => {
    if (checked || selected === null) return
    const next = { ...connections }
    delete next[selected]
    Object.keys(next).forEach(k => { if (next[k] === ri) delete next[k] })
    next[selected] = ri
    setConnections(next); setSelected(null); setMouse(null)
  }

  const handleCheck = () => {
    setChecked(true)
    const allOk = Object.entries(question.correctAnswer).every(([li, ci]) => String(rightOrder[connections[li]]) === String(ci))
    setCorrect(allOk)
  }

  const lc = { connected: 'var(--accent)', correct: 'var(--color-success)', wrong: 'var(--color-danger)' }

  return (
    <div ref={containerRef} style={{ position: 'relative', userSelect: 'none' }}
      onMouseMove={handleMouseMove} onTouchMove={handleMouseMove}
      onMouseLeave={() => { setSelected(null); setMouse(null) }}>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible', zIndex: 1 }}>
        {lines.map((l, i) => <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={lc[l.state]||'var(--accent)'} strokeWidth="2.5" strokeLinecap="round" />)}
        {selected !== null && mouse && (() => { const a=getAnchor(selected); return a ? <line x1={a.x} y1={a.y} x2={mouse.x} y2={mouse.y} stroke="var(--accent)" strokeWidth="2" strokeDasharray="6 4" strokeLinecap="round" opacity="0.5" /> : null })()}
      </svg>
      <div style={{ display: 'flex', gap: 60, margin: '24px 0', position: 'relative', zIndex: 2 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {pairs.map((pair, li) => (
            <button key={li} ref={el => leftRefs.current[li]=el}
              onClick={() => leftClick(li)} disabled={checked}
              style={{ padding: '12px 16px', borderRadius: 10, border: `2px solid ${selected===li ? 'var(--accent)' : li in connections ? 'var(--accent)' : 'var(--border)'}`, background: selected===li ? 'var(--accent-faint)' : 'var(--card-bg)', color: 'var(--text-primary)', cursor: checked?'default':'pointer', textAlign: 'left', fontSize: '0.9rem', fontFamily: 'var(--font-body)', transition: 'all 0.15s' }}>
              {pair.leftText}
            </button>
          ))}
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {rightOrder.map((origIdx, ri) => (
            <button key={ri} ref={el => rightRefs.current[ri]=el}
              onClick={() => rightClick(ri)} disabled={checked}
              style={{ padding: '12px 16px', borderRadius: 10, border: `2px solid ${Object.values(connections).includes(ri) ? 'var(--accent)' : 'var(--border)'}`, background: 'var(--card-bg)', color: 'var(--text-primary)', cursor: checked?'default':'pointer', textAlign: 'right', fontSize: '0.9rem', fontFamily: 'var(--font-body)', transition: 'all 0.15s' }}>
              {pairs[origIdx].rightText}
            </button>
          ))}
        </div>
      </div>
      {!checked ? (
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn btn--ghost btn--sm" onClick={() => { setConnections({}); setSelected(null) }}>↺ Sıfırla</button>
          <button className="btn btn--primary btn--sm" onClick={handleCheck} disabled={Object.keys(connections).length < n}>
            Kontrol Et ({Object.keys(connections).length}/{n}) ✓
          </button>
        </div>
      ) : (
        <div className={correct ? 'feedback--correct' : 'feedback--wrong'}>
          {correct ? '✅ Tüm eşleştirmeler doğru!' : '❌ Bazı eşleştirmeler yanlış. Kırmızı çizgileri kontrol et.'}
        </div>
      )}
    </div>
  )
}

// ─── Main TestPage ─────────────────────────────────────────────────────────────
export default function TestPage() {
  const { state, dispatch } = useStore()
  const navigate = useNavigate()
  const { activeTest } = state

  useEffect(() => {
    if (!activeTest) navigate('/test-setup')
  }, [])

  if (!activeTest) return null

  const { questions, currentIndex, answers, hints, finished } = activeTest
  const q = questions[currentIndex]

  const handleAnswer = (answer) => {
    dispatch({ type: A.ANSWER_QUESTION, payload: { questionIndex: currentIndex, answer } })
  }

  const answered = answers[currentIndex] !== undefined

  const handleHint = () => dispatch({ type: A.SHOW_HINT, payload: { questionIndex: currentIndex } })

  const handleNav = (i) => dispatch({ type: A.NAVIGATE_QUESTION, payload: i })

  const handleSaveExit = () => {
    dispatch({ type: A.SAVE_AND_EXIT })
    navigate('/')
  }

  const handleFinish = () => {
    // Score and log
    dispatch({ type: A.FINISH_TEST })
    let correct = 0
    questions.forEach((qu, i) => { if (isCorrect(qu, answers[i])) correct++ })
    dispatch({
      type: A.UPDATE_PROFILE,
      payload: { summary: { correct, total: questions.length, subject: activeTest.subject, topic: activeTest.topic, score: Math.round(correct/questions.length*100) } }
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
    <div style={{ maxWidth: 700, margin: '0 auto' }} className="fade-up">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {activeTest.subject} › {activeTest.topic === 'mixed' ? 'Karışık' : activeTest.topic}
          </div>
          <div style={{ fontWeight: 600, marginTop: 2 }}>
            Soru {currentIndex + 1} / {questions.length}
          </div>
        </div>
        <button className="btn btn--ghost btn--sm" onClick={handleSaveExit}>
          💾 Kaydet & Çık
        </button>
      </div>

      {/* Progress bar */}
      <div className="progress-bar" style={{ marginBottom: 16 }}>
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* Question number dots */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 28 }}>
        {questions.map((_, i) => {
          let bg = 'var(--border)'
          if (i === currentIndex) bg = 'var(--accent)'
          else if (answers[i] !== undefined) {
            bg = isCorrect(questions[i], answers[i]) ? 'var(--color-success)' : 'var(--color-danger)'
          }
          return (
            <button key={i} onClick={() => handleNav(i)}
              style={{ width: 28, height: 28, borderRadius: 6, border: 'none', background: bg, color: i === currentIndex ? '#0f0f13' : 'white', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, opacity: answers[i] === undefined && i !== currentIndex ? 0.4 : 1 }}>
              {i+1}
            </button>
          )
        })}
      </div>

      {/* Question Card */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)', background: 'var(--accent-faint)', padding: '4px 10px', borderRadius: 20 }}>
            {typeLabel[q.type] || q.type}
          </span>
          <button className="btn btn--ghost btn--sm" onClick={handleHint} title="İpucu göster">
            💡 İpucu
          </button>
        </div>

        <p style={{ fontSize: '1.1rem', fontWeight: 500, lineHeight: 1.6, marginBottom: 24, fontFamily: 'var(--font-display)' }}>
          {q.questionText}
        </p>

        {hints[currentIndex] && (
          <div style={{ padding: '10px 14px', background: 'rgba(96,165,250,0.08)', border: '1px solid rgba(96,165,250,0.2)', borderRadius: 10, fontSize: '0.875rem', color: 'var(--color-hint)', marginBottom: 20 }}>
            💡 {q.hint}
          </div>
        )}

        {/* Render question type */}
        {q.type === 'multiple_choice' && (
          <MultipleChoice question={q} questionIndex={currentIndex} answered={answered} onAnswer={handleAnswer} />
        )}
        {q.type === 'true_false' && (
          <TrueFalse question={q} questionIndex={currentIndex} answered={answered} onAnswer={handleAnswer} />
        )}
        {q.type === 'fill_in_the_blank' && (
          <FillInTheBlank question={q} questionIndex={currentIndex} />
        )}
        {q.type === 'matching' && (
          <Matching question={q} questionIndex={currentIndex} />
        )}

        {q.source && (
          <div style={{ marginTop: 20, fontSize: '0.75rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border)', paddingTop: 12 }}>
            📖 {q.source}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn btn--ghost" onClick={() => handleNav(currentIndex - 1)} disabled={currentIndex === 0}>
          ← Önceki
        </button>

        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {answeredCount} / {questions.length} yanıtlandı
        </span>

        {currentIndex < questions.length - 1 ? (
          <button className="btn btn--primary" onClick={() => handleNav(currentIndex + 1)}>
            Sonraki →
          </button>
        ) : (
          <button className="btn btn--secondary" onClick={handleFinish}>
            Testi Bitir 🏁
          </button>
        )}
      </div>
    </div>
  )
}
