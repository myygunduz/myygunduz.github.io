// src/pages/ProfilePage.jsx
import { useStore, A } from '../store/store'

export default function ProfilePage() {
  const { state, dispatch } = useStore()
  const { profile, mistakes } = state

  const accuracy = profile.totalQuestions > 0
    ? Math.round((profile.totalCorrect / profile.totalQuestions) * 100)
    : 0

  const activeMistakes  = mistakes.filter(m => !m.corrected).length
  const correctedCount  = mistakes.filter(m => m.corrected).length

  // Build topic performance list
  const topicList = Object.entries(profile.topicStats)
    .map(([key, { correct, total }]) => ({
      key,
      correct, total,
      pct: Math.round(correct / total * 100),
    }))
    .sort((a, b) => b.total - a.total)

  // Last 10 test scores for mini chart
  const recentTests = profile.testHistory.slice(0, 10).reverse()

  return (
    <div className="fade-up">
      <h1 className="page-title">Profilim</h1>
      <p className="page-subtitle">Tüm öğrenme istatistiklerin burada.</p>

      {/* Overview Stats */}
      <div className="grid-3" style={{ marginBottom: 32 }}>
        <BigStat icon="📝" label="Toplam Test" value={profile.totalTestsTaken} />
        <BigStat icon="🎯" label="Doğruluk" value={`%${accuracy}`} color="var(--accent)" />
        <BigStat icon="🔥" label="Günlük Seri" value={`${profile.streak}`} color="#f97316" sub="gün" />
        <BigStat icon="✅" label="Doğru Cevap" value={profile.totalCorrect} color="var(--color-success)" />
        <BigStat icon="📚" label="Toplam Soru" value={profile.totalQuestions} />
        <BigStat icon="❌" label="Aktif Hata" value={activeMistakes} color={activeMistakes > 0 ? 'var(--color-danger)' : 'var(--text-muted)'} />
      </div>

      {/* Score History Chart */}
      {recentTests.length > 0 && (
        <div className="card" style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-secondary)', marginBottom: 20 }}>
            Son Testler
          </h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 80 }}>
            {recentTests.map((t, i) => {
              const h = Math.max(8, (t.score / 100) * 80)
              const color = t.score >= 75 ? 'var(--color-success)' : t.score >= 50 ? 'var(--accent)' : 'var(--color-danger)'
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }} title={`${t.subject} - %${t.score}`}>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>%{t.score}</span>
                  <div style={{ width: '100%', height: h, background: color, borderRadius: '4px 4px 0 0', opacity: 0.8 + (i / recentTests.length) * 0.2 }} />
                </div>
              )
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: '0.65rem', color: 'var(--text-muted)' }}>
            <span>← En Eski</span>
            <span>En Yeni →</span>
          </div>
        </div>
      )}

      {/* Topic Breakdown */}
      {topicList.length > 0 && (
        <div className="card" style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-secondary)', marginBottom: 20 }}>
            Konu Başarısı
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {topicList.map(({ key, correct, total, pct }) => {
              const color = pct >= 75 ? 'var(--color-success)' : pct >= 50 ? 'var(--accent)' : 'var(--color-danger)'
              return (
                <div key={key}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: '0.85rem' }}>
                    <span style={{ fontWeight: 500 }}>{key}</span>
                    <span style={{ color, fontWeight: 700 }}>%{pct} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({correct}/{total})</span></span>
                  </div>
                  <div className="progress-bar">
                    <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 2, transition: 'width 0.6s ease' }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Recent test history */}
      {profile.testHistory.length > 0 && (
        <div className="card" style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-secondary)', marginBottom: 16 }}>
            Test Geçmişi
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {profile.testHistory.slice(0, 15).map((t, i) => {
              const color = t.score >= 75 ? 'var(--color-success)' : t.score >= 50 ? 'var(--accent)' : 'var(--color-danger)'
              return (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'var(--bg-3)', borderRadius: 10 }}>
                  <div>
                    <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>{t.subject}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}> › {t.topic === 'mixed' ? 'Karışık' : t.topic}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{new Date(t.date).toLocaleDateString('tr-TR')}</span>
                    <span style={{ fontWeight: 700, color, fontFamily: 'var(--font-display)', fontSize: '1rem' }}>%{t.score}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Empty state */}
      {profile.totalTestsTaken === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: '48px 24px' }}>
          <div style={{ fontSize: '3rem', marginBottom: 12 }}>📊</div>
          <div style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 8 }}>Henüz test çözmedin</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>İlk testini çözdükten sonra istatistiklerin burada görünecek.</div>
        </div>
      )}

      {/* Reset */}
      <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
        <h3 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 12 }}>Tehlikeli Alan</h3>
        <button className="btn btn--danger btn--sm" onClick={() => {
          if (window.confirm('Tüm veriler silinecek. Emin misin?')) {
            localStorage.clear()
            window.location.reload()
          }
        }}>
          🗑️ Tüm Verileri Sil
        </button>
      </div>
    </div>
  )
}

function BigStat({ icon, label, value, color, sub }) {
  return (
    <div className="card" style={{ textAlign: 'center', padding: '20px 16px' }}>
      <div style={{ fontSize: '1.4rem', marginBottom: 6 }}>{icon}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.7rem', fontWeight: 700, color: color || 'var(--text-primary)', lineHeight: 1 }}>
        {value}{sub && <span style={{ fontSize: '0.9rem', marginLeft: 3, opacity: 0.6 }}>{sub}</span>}
      </div>
      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
    </div>
  )
}
