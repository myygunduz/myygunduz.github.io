// src/pages/FlashcardsPage.jsx
import { useState, useRef, useEffect, useCallback } from 'react'
import { useStore, selectors, shuffle } from '../store/store'

const SWIPE_THRESHOLD = 80

function FlashCard({ card, onKnow, onReview, total, remaining }) {
  const [flipped,  setFlipped]  = useState(false)
  const [dragX,    setDragX]    = useState(0)
  const [dragging, setDragging] = useState(false)
  const [leaving,  setLeaving]  = useState(null)
  const startX = useRef(null)

  useEffect(() => { setFlipped(false); setDragX(0); setLeaving(null) }, [card])

  const getX = e => e.touches ? e.touches[0].clientX : e.clientX

  const onDown  = (e) => { startX.current = getX(e); setDragging(true) }
  const onMove  = (e) => { if (!dragging || startX.current === null) return; setDragX(getX(e) - startX.current) }
  const onUp    = useCallback(() => {
    if (!dragging) return; setDragging(false)
    if      (dragX >  SWIPE_THRESHOLD) { setLeaving('right'); setTimeout(onKnow,   350) }
    else if (dragX < -SWIPE_THRESHOLD) { setLeaving('left');  setTimeout(onReview, 350) }
    else setDragX(0)
    startX.current = null
  }, [dragging, dragX, onKnow, onReview])

  const rot  = dragging ? dragX * 0.12 : 0
  const tx   = leaving === 'right' ? 600 : leaving === 'left' ? -600 : dragX
  const opa  = leaving ? 0 : Math.max(0, 1 - Math.abs(dragX) / 300)
  const olop = Math.min(1, Math.abs(dragX) / SWIPE_THRESHOLD)

  return (
    <div
      onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}
      onTouchStart={onDown} onTouchMove={onMove} onTouchEnd={onUp}
      onClick={() => { if (Math.abs(dragX) < 5) setFlipped(f => !f) }}
      style={{
        position: 'absolute', width: '100%', height: '100%',
        transform: `translateX(${tx}px) rotate(${rot}deg)`,
        opacity: opa,
        transition: dragging ? 'none' : 'transform 0.35s cubic-bezier(.25,.8,.25,1), opacity 0.35s ease',
        cursor: dragging ? 'grabbing' : 'grab', userSelect: 'none',
      }}
    >
      {/* Overlays */}
      {dragX > 20 && <div style={{ position:'absolute', inset:0, borderRadius:20, background:'rgba(74,222,128,0.12)', border:'2px solid #4ade80', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.4rem', fontWeight:700, color:'#4ade80', opacity:olop, zIndex:10, pointerEvents:'none' }}>✓ Biliyorum</div>}
      {dragX < -20 && <div style={{ position:'absolute', inset:0, borderRadius:20, background:'rgba(248,113,113,0.12)', border:'2px solid #f87171', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.4rem', fontWeight:700, color:'#f87171', opacity:olop, zIndex:10, pointerEvents:'none' }}>↻ Tekrar</div>}

      {/* 3D card */}
      <div style={{ width:'100%', height:'100%', position:'relative', transformStyle:'preserve-3d', transition:'transform 0.5s cubic-bezier(.25,.8,.25,1)', transform: flipped ? 'rotateY(180deg)' : 'none' }}>
        {/* Front */}
        <div style={{ position:'absolute', inset:0, backfaceVisibility:'hidden', WebkitBackfaceVisibility:'hidden', borderRadius:20, padding:'28px 24px', background:'var(--card-bg)', border:'1px solid var(--border)', boxShadow:'0 12px 48px rgba(0,0,0,0.4)', display:'flex', flexDirection:'column' }}>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.7rem', opacity:0.45, marginBottom:16 }}>
            <span>{card.subject} › {card.topic}</span>
            <span>{total - remaining + 1} / {total}</span>
          </div>
          <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center' }}>
            <div style={{ fontSize:'0.65rem', letterSpacing:'0.12em', fontWeight:700, opacity:0.35, marginBottom:12 }}>SORU</div>
            <p style={{ fontSize:'1.15rem', lineHeight:1.6, fontWeight:500, fontFamily:'var(--font-display)' }}>{card.questionText}</p>
          </div>
          {card.hint && <details style={{ marginTop:12, fontSize:'0.82rem', color:'var(--color-hint)' }}><summary style={{ cursor:'pointer', opacity:0.7 }}>💡 İpucu</summary><p style={{ marginTop:6, opacity:0.8 }}>{card.hint}</p></details>}
          <p style={{ fontSize:'0.7rem', opacity:0.3, textAlign:'center', marginTop:12 }}>Cevabı görmek için tıkla</p>
        </div>
        {/* Back */}
        <div style={{ position:'absolute', inset:0, backfaceVisibility:'hidden', WebkitBackfaceVisibility:'hidden', transform:'rotateY(180deg)', borderRadius:20, padding:'28px 24px', background:'var(--bg-3)', border:'1px solid var(--border-light)', boxShadow:'0 12px 48px rgba(0,0,0,0.4)', display:'flex', flexDirection:'column' }}>
          <div style={{ fontSize:'0.7rem', opacity:0.45, marginBottom:16 }}>{card.subject} › {card.topic}</div>
          <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center' }}>
            <div style={{ fontSize:'0.65rem', letterSpacing:'0.12em', fontWeight:700, color:'var(--accent)', opacity:0.7, marginBottom:12 }}>CEVAP</div>
            <p style={{ fontSize:'1.15rem', lineHeight:1.6, fontWeight:500, fontFamily:'var(--font-display)' }}>{String(card.correctAnswer)}</p>
          </div>
          {card.source && <p style={{ fontSize:'0.72rem', opacity:0.4, marginTop:12 }}>📖 {card.source}</p>}
          <p style={{ fontSize:'0.7rem', opacity:0.3, textAlign:'center', marginTop:12 }}>Soruya dönmek için tıkla</p>
        </div>
      </div>
    </div>
  )
}

export default function FlashcardsPage() {
  const { state } = useStore()
  const { dataset } = state

  const [subject, setSubject] = useState('mixed')
  const [topic,   setTopic]   = useState('mixed')
  const [deck,    setDeck]    = useState(null)
  const [known,   setKnown]   = useState([])
  const [review,  setReview]  = useState([])
  const [done,    setDone]    = useState(false)

  const subjects = ['mixed', ...selectors.subjects(dataset)]
  const topics   = subject === 'mixed' ? ['mixed'] : ['mixed', ...selectors.topicsForSubject(dataset, subject)]

  const startDeck = () => {
    const cards = shuffle(selectors.getFlashcards(dataset, subject, topic))
    setDeck(cards); setKnown([]); setReview([]); setDone(false)
  }

  const handleKnow = useCallback(() => {
    if (!deck || deck.length === 0) return
    const [top, ...rest] = deck
    const nk = [top, ...known]
    setKnown(nk)
    if (rest.length === 0) { setDone(true); setDeck([]) }
    else setDeck(rest)
  }, [deck, known])

  const handleReview = useCallback(() => {
    if (!deck || deck.length === 0) return
    const [top, ...rest] = deck
    const nr = [top, ...review]
    setReview(nr)
    if (rest.length === 0) { setDone(true); setDeck([]) }
    else setDeck(rest)
  }, [deck, review])

  const handleReviewMissed = () => {
    const cards = shuffle(review)
    setDeck(cards); setKnown([]); setReview([]); setDone(false)
  }

  if (!deck) {
    return (
      <div className="fade-up">
        <h1 className="page-title">Flashcard Modu</h1>
        <p className="page-subtitle">Kartları çevir, sağa kaydır biliyorsan — sola kaydır tekrar edeceksen.</p>
        <div style={{ display: 'grid', gap: 16, maxWidth: 400 }}>
          <div><label>Ders</label>
            <select value={subject} onChange={e => { setSubject(e.target.value); setTopic('mixed') }}>
              {subjects.map(s => <option key={s} value={s}>{s === 'mixed' ? '🔀 Karışık' : s}</option>)}
            </select>
          </div>
          <div><label>Konu</label>
            <select value={topic} onChange={e => setTopic(e.target.value)} disabled={subject === 'mixed'}>
              {topics.map(t => <option key={t} value={t}>{t === 'mixed' ? '🔀 Karışık' : t}</option>)}
            </select>
          </div>
          <button className="btn btn--primary btn--lg" onClick={startDeck}
            disabled={selectors.getFlashcards(dataset, subject, topic).length === 0}>
            🃏 Kartları Başlat
          </button>
        </div>
      </div>
    )
  }

  if (done) {
    const total = known.length + review.length
    return (
      <div className="fade-up" style={{ textAlign: 'center', maxWidth: 400, margin: '40px auto' }}>
        <div style={{ fontSize: '3rem', marginBottom: 16 }}>🎉</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: 8 }}>Tebrikler!</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 32 }}>Tüm kartları tamamladın.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginBottom: 32 }}>
          <div><div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-success)', fontFamily: 'var(--font-display)' }}>{known.length}</div><div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Biliyorum</div></div>
          <div><div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-danger)', fontFamily: 'var(--font-display)' }}>{review.length}</div><div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Tekrar</div></div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {review.length > 0 && <button className="btn btn--danger btn--lg" onClick={handleReviewMissed}>↻ Tekrar Edilecekleri Tekrar Et ({review.length})</button>}
          <button className="btn btn--primary btn--lg" onClick={() => setDeck(null)}>Yeni Deste</button>
        </div>
      </div>
    )
  }

  const total = deck.length + known.length + review.length
  const progress = ((known.length + review.length) / total) * 100
  const card = deck[0]

  return (
    <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="progress-bar" style={{ width: '100%', maxWidth: 400, marginBottom: 8 }}>
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 28 }}>
        ✓ {known.length} · ↻ {review.length} · Kalan: {deck.length}
      </p>

      {/* Card stack */}
      <div style={{ position: 'relative', width: 340, height: 440, marginBottom: 28 }}>
        {deck.slice(1, 3).reverse().map((_, i) => (
          <div key={i} style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: 20, background: 'var(--card-bg)', border: '1px solid var(--border)', transform: `translateY(${(2-i)*6}px) scale(${1-(2-i)*0.03})`, zIndex: i }} />
        ))}
        <FlashCard card={card} onKnow={handleKnow} onReview={handleReview} total={total} remaining={deck.length} />
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: 16 }}>
        <button className="btn btn--ghost" onClick={handleReview} style={{ borderColor: '#f87171', color: '#f87171', minWidth: 120 }}>← Tekrar</button>
        <button className="btn btn--ghost" onClick={handleKnow}   style={{ borderColor: '#4ade80', color: '#4ade80', minWidth: 120 }}>Biliyorum →</button>
      </div>
      <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 12 }}>veya kaydır · tıklayarak çevir</p>
    </div>
  )
}
