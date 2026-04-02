// src/pages/ResultsPage.jsx
import { useNavigate } from 'react-router-dom'
import { useStore, isCorrect, A, selectors } from '../store/store'

export default function ResultsPage() {
  const { state, dispatch } = useStore()
  const navigate = useNavigate()
  const { activeTest, mistakes } = state

  if (!activeTest?.finished) {
    navigate('/'); return null
  }

  const { questions, answers, subject, topic } = activeTest
  let correct = 0
  questions.forEach((q, i) => { if (isCorrect(q, answers[i])) correct++ })
  const total   = questions.length
  const score   = Math.round(correct / total * 100)
  const wrong   = total - correct
  const skipped = questions.filter((_, i) => answers[i] === undefined || answers[i] === null || answers[i] === '').length

  const grade = score >= 90 ? { label: 'Mükemmel! 🏆', color: '#fbbf24' }
              : score >= 75 ? { label: 'Harika! ⭐',   color: 'var(--color-success)' }
              : score >= 50 ? { label: 'İyi! 👍',       color: 'var(--accent)' }
                            : { label: 'Daha çalış 📚', color: 'var(--color-danger)' }

  const wrongQuestions = questions.filter((q, i) => !isCorrect(q, answers[i]) && answers[i] !== undefined)

  const handleCorrectionTest = () => {
    if (wrongQuestions.length === 0) return
    const corrQuestions = wrongQuestions.map(q => ({ ...q }))
    dispatch({ type: A.START_TEST, payload: { questions: corrQuestions, subject: subject || 'mixed', topic: topic || 'mixed' } })
    navigate('/test/correction')
  }

  return (
    <div className="fade-up" style={{ maxWidth: 640, margin: '0 auto' }}>
      {/* Score Card */}
      <div className="card" style={{ textAlign: 'center', padding: '40px 32px', marginBottom: 24, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 0%, ${grade.color}15, transparent 60%)`, pointerEvents: 'none' }} />
        <div style={{ fontSize: '4rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: grade.color, lineHeight: 1, marginBottom: 8 }}>
          %{score}
        </div>
        <div style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', marginBottom: 24, fontFamily: 'var(--font-display)' }}>
          {grade.label}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 32 }}>
          <Stat label="Doğru" value={correct} color="var(--color-success)" />
          <Stat label="Yanlış" value={wrong} color="var(--color-danger)" />
          <Stat label="Boş" value={skipped} color="var(--text-muted)" />
          <Stat label="Toplam" value={total} />
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
        <button className="btn btn--primary" onClick={() => navigate('/test-setup')} style={{ flex: 1 }}>
          ⚡ Yeni Test
        </button>
        {wrongQuestions.length > 0 && (
          <button className="btn btn--danger" onClick={handleCorrectionTest} style={{ flex: 1 }}>
            ❌ Düzeltme Testi ({wrongQuestions.length} soru)
          </button>
        )}
        <button className="btn btn--ghost" onClick={() => navigate('/')} style={{ flex: 1 }}>
          🏠 Ana Sayfa
        </button>
      </div>

      {/* Question Review */}
      <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
        Soru Özeti
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {questions.map((q, i) => {
          const userAns = answers[i]
          const ok = isCorrect(q, userAns)
          const skp = userAns === undefined || userAns === null || userAns === ''
          return (
            <div key={i} className="card" style={{ padding: '14px 18px', borderColor: ok ? 'rgba(74,222,128,0.2)' : skp ? 'var(--border)' : 'rgba(248,113,113,0.2)', background: ok ? 'rgba(74,222,128,0.04)' : skp ? 'var(--card-bg)' : 'rgba(248,113,113,0.04)' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: 2 }}>{ok ? '✅' : skp ? '⬜' : '❌'}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 500, marginBottom: 4 }}>{q.questionText}</div>
                  {!ok && !skp && (
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      Doğru: <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>
                        {q.type === 'multiple_choice' ? q.options[q.correctAnswer]?.optionText
                         : q.type === 'true_false' ? (q.correctAnswer ? 'Doğru' : 'Yanlış')
                         : String(q.correctAnswer)}
                      </span>
                    </div>
                  )}
                </div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', flexShrink: 0 }}>S.{i+1}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Stat({ label, value, color }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '1.8rem', fontWeight: 700, color: color || 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>{value}</div>
      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 2 }}>{label}</div>
    </div>
  )
}
