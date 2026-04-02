// src/pages/TestSetupPage.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore, selectors, buildTestSession, A } from '../store/store'

export default function TestSetupPage() {
  const { state, dispatch } = useStore()
  const navigate = useNavigate()
  const { dataset, settings } = state

  const [subject, setSubject]       = useState('mixed')
  const [topic, setTopic]           = useState('mixed')
  const [questionCount, setCount]   = useState(10)
  const [types, setTypes] = useState({
    multiple_choice:  true,
    true_false:       true,
    fill_in_the_blank:true,
    matching:         true,
  })

  const subjects = ['mixed', ...selectors.subjects(dataset)]
  const topics   = subject === 'mixed'
    ? ['mixed']
    : ['mixed', ...selectors.topicsForSubject(dataset, subject)]

  const handleSubjectChange = (v) => {
    setSubject(v)
    setTopic('mixed')
  }

  const toggleType = (t) => setTypes(prev => ({ ...prev, [t]: !prev[t] }))

  const allQuestions = selectors.getTestQuestions(dataset, subject, topic)
    .filter(q => types[q.type])

  const handleStart = () => {
    if (allQuestions.length === 0) return
    const selected = allQuestions.slice(0, Math.min(questionCount, allQuestions.length))
    const session = buildTestSession(selected, subject, topic, settings)
    dispatch({ type: A.START_TEST, payload: { questions: selected, subject, topic } })
    navigate(`/test/${session.id}`)
  }

  // Also handle correction test from mistakes
  const activeMistakes = selectors.activeMistakes(state.mistakes, subject, topic)

  const handleCorrectionTest = () => {
    if (activeMistakes.length === 0) return
    const questions = activeMistakes.map(m => ({
      type:          m.type,
      questionText:  m.questionText,
      options:       m.options,
      correctAnswer: m.correctAnswer,
      hint:          m.hint,
      source:        m.source,
      _mistakeId:    m.id,
    }))
    dispatch({ type: A.START_TEST, payload: { questions, subject, topic } })
    navigate(`/test/correction`)
  }

  return (
    <div className="fade-up">
      <h1 className="page-title">Test Oluştur</h1>
      <p className="page-subtitle">Konu, tür ve soru sayısını seç.</p>

      <div style={{ display: 'grid', gap: 20, maxWidth: 520 }}>
        {/* Subject */}
        <div>
          <label>Ders</label>
          <select value={subject} onChange={e => handleSubjectChange(e.target.value)}>
            {subjects.map(s => (
              <option key={s} value={s}>{s === 'mixed' ? '🔀 Karışık (Tüm Dersler)' : s}</option>
            ))}
          </select>
        </div>

        {/* Topic */}
        <div>
          <label>Konu</label>
          <select value={topic} onChange={e => setTopic(e.target.value)} disabled={subject === 'mixed'}>
            {topics.map(t => (
              <option key={t} value={t}>{t === 'mixed' ? '🔀 Karışık (Tüm Konular)' : t}</option>
            ))}
          </select>
        </div>

        {/* Question types */}
        <div>
          <label>Soru Türleri</label>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 4 }}>
            {[
              { key: 'multiple_choice',   label: 'Çoktan Seçmeli' },
              { key: 'true_false',        label: 'Doğru / Yanlış' },
              { key: 'fill_in_the_blank', label: 'Boşluk Doldurma' },
              { key: 'matching',          label: 'Eşleştirme' },
            ].map(({ key, label }) => (
              <button
                key={key}
                className={`btn btn--sm ${types[key] ? 'btn--primary' : 'btn--ghost'}`}
                onClick={() => toggleType(key)}
                type="button"
              >
                {types[key] ? '✓ ' : ''}{label}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <div>
          <label>Soru Sayısı (Mevcut: {allQuestions.length})</label>
          <input
            type="number"
            min={1}
            max={allQuestions.length || 1}
            value={questionCount}
            onChange={e => setCount(Number(e.target.value))}
          />
        </div>

        {/* Settings */}
        <div style={{ display: 'flex', gap: 16 }}>
          <ToggleSwitch
            label="Soruları Karıştır"
            checked={settings.shuffleQuestions}
            onChange={v => dispatch({ type: A.UPDATE_SETTINGS, payload: { shuffleQuestions: v } })}
          />
          <ToggleSwitch
            label="Seçenekleri Karıştır"
            checked={settings.shuffleOptions}
            onChange={v => dispatch({ type: A.UPDATE_SETTINGS, payload: { shuffleOptions: v } })}
          />
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <button
            className="btn btn--primary btn--lg"
            onClick={handleStart}
            disabled={allQuestions.length === 0}
            style={{ flex: 1 }}
          >
            ⚡ Testi Başlat
          </button>
          {activeMistakes.length > 0 && (
            <button
              className="btn btn--danger btn--lg"
              onClick={handleCorrectionTest}
            >
              ❌ Hata Testi ({activeMistakes.length})
            </button>
          )}
        </div>

        {allQuestions.length === 0 && (
          <p style={{ color: 'var(--color-warning)', fontSize: '0.85rem' }}>
            ⚠️ Seçilen kriterlere uygun soru bulunamadı.
          </p>
        )}
      </div>
    </div>
  )
}

function ToggleSwitch({ label, checked, onChange }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', userSelect: 'none' }}>
      <div
        onClick={() => onChange(!checked)}
        style={{
          width: 40, height: 22, borderRadius: 11,
          background: checked ? 'var(--accent)' : 'var(--border)',
          position: 'relative', transition: 'background 0.2s',
          flexShrink: 0,
        }}
      >
        <div style={{
          width: 16, height: 16, borderRadius: '50%', background: 'white',
          position: 'absolute', top: 3, left: checked ? 21 : 3,
          transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
        }} />
      </div>
      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{label}</span>
    </label>
  )
}
