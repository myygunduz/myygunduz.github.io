// src/pages/HomePage.jsx
import { useNavigate } from 'react-router-dom'
import { useStore, selectors } from '../store/store'

export default function HomePage() {
  const { state } = useStore()
  const navigate = useNavigate()
  const { profile, mistakes, savedTests, dataset } = state

  const activeMistakes = mistakes.filter(m => !m.corrected).length
  const accuracy = profile.totalQuestions > 0
    ? Math.round((profile.totalCorrect / profile.totalQuestions) * 100)
    : 0

  return (
    <div className="fade-up">
      {/* Hero */}
      <div style={{ marginBottom: 40 }}>
        <h1 className="page-title" style={{ fontSize: '2.4rem', marginBottom: 12 }}>
          Merhaba 👋
        </h1>
        <p className="page-subtitle" style={{ fontSize: '1.05rem' }}>
          Bugün ne çalışmak istersin?
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid-3" style={{ marginBottom: 32 }}>
        <StatCard icon="📝" label="Toplam Test" value={profile.totalTestsTaken} />
        <StatCard icon="🎯" label="Doğruluk" value={`%${accuracy}`} color="var(--accent)" />
        <StatCard icon="🔥" label="Seri" value={`${profile.streak} gün`} color="#f97316" />
      </div>

      {/* Action Cards */}
      <div className="grid-2" style={{ marginBottom: 24 }}>
        <ActionCard
          icon="⚡"
          title="Yeni Test"
          desc="Konu seç, soruları karıştır ve başla."
          color="var(--accent)"
          onClick={() => navigate('/test-setup')}
        />
        <ActionCard
          icon="🃏"
          title="Kartlar"
          desc="Flashcard modunda çalış."
          color="var(--accent-2)"
          onClick={() => navigate('/flashcards')}
        />
      </div>

      <div className="grid-2">
        <ActionCard
          icon="❌"
          title={`Hatalar ${activeMistakes > 0 ? `(${activeMistakes})` : ''}`}
          desc="Yanlış yaptığın soruları tekrar çöz."
          color="var(--color-danger)"
          onClick={() => navigate('/mistakes')}
          faint="rgba(248,113,113,0.06)"
        />
        <ActionCard
          icon="📊"
          title="Profil"
          desc="İstatistiklerini ve ilerleme grafiğini gör."
          color="var(--color-hint)"
          onClick={() => navigate('/profile')}
          faint="rgba(96,165,250,0.06)"
        />
      </div>

      {/* Saved Tests */}
      {savedTests.length > 0 && (
        <div style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 16, color: 'var(--text-secondary)' }}>
            📌 Kaldığın Yerden Devam Et
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {savedTests.slice(0, 3).map(t => (
              <SavedTestRow key={t.id} test={t} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function StatCard({ icon, label, value, color }) {
  return (
    <div className="card" style={{ textAlign: 'center', padding: '20px 16px' }}>
      <div style={{ fontSize: '1.6rem', marginBottom: 8 }}>{icon}</div>
      <div style={{ fontSize: '1.6rem', fontWeight: 700, color: color || 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
        {value}
      </div>
      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {label}
      </div>
    </div>
  )
}

function ActionCard({ icon, title, desc, color, onClick, faint }) {
  return (
    <div
      className="card"
      onClick={onClick}
      style={{
        cursor: 'pointer',
        background: faint || 'var(--card-bg)',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = color}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
    >
      <div style={{ fontSize: '2rem', marginBottom: 12 }}>{icon}</div>
      <div style={{ fontSize: '1.05rem', fontWeight: 700, color, marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{desc}</div>
    </div>
  )
}

function SavedTestRow({ test }) {
  const navigate = useNavigate()
  const { dispatch } = useStore()
  const progress = Object.keys(test.answers).length

  const handleResume = () => {
    dispatch({ type: 'RESUME_TEST', payload: test.id })
    navigate(`/test/${test.id}`)
  }

  return (
    <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px' }}>
      <div>
        <div style={{ fontWeight: 600, marginBottom: 2 }}>
          {test.subject} › {test.topic === 'mixed' ? 'Karışık' : test.topic}
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {progress} / {test.questions.length} soru yanıtlandı
        </div>
      </div>
      <button className="btn btn--primary btn--sm" onClick={handleResume}>
        Devam Et →
      </button>
    </div>
  )
}
