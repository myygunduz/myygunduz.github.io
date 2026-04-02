// src/pages/MistakesPage.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore, selectors, A } from '../store/store'

export default function MistakesPage() {
  const { state, dispatch } = useStore()
  const navigate = useNavigate()
  const { mistakes, dataset } = state

  const [subjectFilter, setSubjectFilter] = useState('all')
  const [showCorrected, setShowCorrected] = useState(false)

  const subjects = ['all', ...new Set(mistakes.map(m => m.subject))]

  const filtered = mistakes.filter(m => {
    if (!showCorrected && m.corrected) return false
    if (subjectFilter !== 'all' && m.subject !== subjectFilter) return false
    return true
  })

  const activeMistakes  = mistakes.filter(m => !m.corrected)
  const correctedCount  = mistakes.filter(m => m.corrected).length

  const handleCorrectionTest = () => {
    const questions = activeMistakes
      .filter(m => subjectFilter === 'all' || m.subject === subjectFilter)
      .map(m => ({
        type:          m.type,
        questionText:  m.questionText,
        options:       m.options,
        correctAnswer: m.correctAnswer,
        hint:          m.hint,
        source:        m.source,
        _mistakeId:    m.id,
      }))
    if (questions.length === 0) return
    dispatch({ type: A.START_TEST, payload: { questions, subject: subjectFilter === 'all' ? 'mixed' : subjectFilter, topic: 'mixed' } })
    navigate('/test/correction')
  }

  const typeLabel = { multiple_choice: 'Çoktan Seçmeli', true_false: 'D/Y', fill_in_the_blank: 'Boşluk', matching: 'Eşleştirme' }

  return (
    <div className="fade-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <div>
          <h1 className="page-title">Hatalar</h1>
          <p className="page-subtitle">{activeMistakes.length} aktif · {correctedCount} düzeltildi</p>
        </div>
        {activeMistakes.length > 0 && (
          <button className="btn btn--danger" onClick={handleCorrectionTest}>
            ❌ Düzeltme Testi ({activeMistakes.filter(m => subjectFilter === 'all' || m.subject === subjectFilter).length})
          </button>
        )}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
        <select value={subjectFilter} onChange={e => setSubjectFilter(e.target.value)} style={{ width: 'auto' }}>
          {subjects.map(s => <option key={s} value={s}>{s === 'all' ? '📚 Tüm Dersler' : s}</option>)}
        </select>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', textTransform: 'none', letterSpacing: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <input type="checkbox" checked={showCorrected} onChange={e => setShowCorrected(e.target.checked)} style={{ width: 16, height: 16, accentColor: 'var(--accent)' }} />
          Düzeltilenleri de göster
        </label>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: '48px 24px' }}>
          <div style={{ fontSize: '3rem', marginBottom: 12 }}>🎉</div>
          <div style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 8 }}>
            {activeMistakes.length === 0 ? 'Hiç hata yok!' : 'Filtreye uygun hata bulunamadı.'}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {activeMistakes.length === 0 ? 'Tüm sorularda başarılısın.' : 'Filtreyi değiştirmeyi dene.'}
          </div>
        </div>
      )}

      {/* Mistake list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map(m => (
          <MistakeCard key={m.id} mistake={m} />
        ))}
      </div>
    </div>
  )
}

function MistakeCard({ mistake: m }) {
  const [expanded, setExpanded] = useState(false)
  const { dispatch } = useStore()

  const typeLabel = { multiple_choice: 'Çoktan Seçmeli', true_false: 'D/Y', fill_in_the_blank: 'Boşluk Doldurma', matching: 'Eşleştirme' }

  const formatAnswer = (type, answer, options) => {
    if (answer === undefined || answer === null || answer === '') return '—'
    if (type === 'multiple_choice' && options) return options[answer]?.optionText || String(answer)
    if (type === 'true_false') return answer ? 'Doğru' : 'Yanlış'
    return String(answer)
  }

  const formatCorrect = (type, answer, options) => {
    if (type === 'multiple_choice' && options) return options[answer]?.optionText || String(answer)
    if (type === 'true_false') return answer ? 'Doğru' : 'Yanlış'
    return String(answer)
  }

  return (
    <div className="card" style={{ opacity: m.corrected ? 0.5 : 1, borderColor: m.corrected ? 'var(--border)' : 'rgba(248,113,113,0.2)', background: m.corrected ? 'var(--card-bg)' : 'rgba(248,113,113,0.03)' }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', cursor: 'pointer' }} onClick={() => setExpanded(e => !e)}>
        <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: 2 }}>{m.corrected ? '✅' : '❌'}</span>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.7rem', background: 'var(--bg-3)', padding: '2px 8px', borderRadius: 20, color: 'var(--text-muted)' }}>{m.subject}</span>
            <span style={{ fontSize: '0.7rem', background: 'var(--bg-3)', padding: '2px 8px', borderRadius: 20, color: 'var(--text-muted)' }}>{m.topic}</span>
            <span style={{ fontSize: '0.7rem', background: 'var(--bg-3)', padding: '2px 8px', borderRadius: 20, color: 'var(--text-muted)' }}>{typeLabel[m.type] || m.type}</span>
          </div>
          <p style={{ fontSize: '0.9rem', fontWeight: 500, lineHeight: 1.5 }}>{m.questionText}</p>
        </div>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', flexShrink: 0 }}>{expanded ? '▲' : '▼'}</span>
      </div>

      {expanded && (
        <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', gap: 20 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Senin Cevabın</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--color-danger)', fontWeight: 500 }}>{formatAnswer(m.type, m.userAnswer, m.options)}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Doğru Cevap</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--color-success)', fontWeight: 500 }}>{formatCorrect(m.type, m.correctAnswer, m.options)}</div>
            </div>
          </div>
          {m.hint && (
            <div style={{ fontSize: '0.82rem', color: 'var(--color-hint)', background: 'rgba(96,165,250,0.06)', padding: '8px 12px', borderRadius: 8 }}>
              💡 {m.hint}
            </div>
          )}
          {m.source && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>📖 {m.source}</div>}
          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            {!m.corrected && (
              <button className="btn btn--ghost btn--sm" style={{ color: 'var(--color-success)', borderColor: 'rgba(74,222,128,0.3)' }}
                onClick={() => dispatch({ type: A.CLEAR_MISTAKE, payload: m.id })}>
                ✓ Düzeltildi Say
              </button>
            )}
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', alignSelf: 'center', marginLeft: 'auto' }}>
              {new Date(m.timestamp).toLocaleDateString('tr-TR')}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
