// ═══════════════════════════════════════════════════════════
// 🔧 StudyDeck — ORTAK ARAÇLAR
// ═══════════════════════════════════════════════════════════

const SD = {
  // ── LocalStorage ──────────────────────────────────────────
  get: (k, def = null) => {
    try { const v = localStorage.getItem(k); return v !== null ? JSON.parse(v) : def; }
    catch { return def; }
  },
  set: (k, v) => localStorage.setItem(k, JSON.stringify(v)),
  del: (k) => localStorage.removeItem(k),

  // ── User ──────────────────────────────────────────────────
  getUser: () => SD.get('sd_user', null),
  setUser: (u) => SD.set('sd_user', u),

  // ── Wrong answers: { subjectId: [questionId, ...] } ───────
  getWrong: () => SD.get('sd_wrong', {}),
  getWrongForSubject: (sid) => (SD.getWrong()[sid] || []),
  saveWrongForSubject: (sid, ids) => {
    const w = SD.getWrong();
    if (ids.length === 0) delete w[sid]; else w[sid] = ids;
    SD.set('sd_wrong', w);
  },

  // ── Flashcard state: { fc_known: [], fc_unknown: [] } ─────
  getFCState: () => SD.get('sd_fc', { known: [], unknown: [] }),
  setFCState: (s) => SD.set('sd_fc', s),
  resetFC: () => SD.del('sd_fc'),

  // ── Stats ─────────────────────────────────────────────────
  getStats: () => SD.get('sd_stats', {}),
  addStat: (sid, total, correct) => {
    const s = SD.getStats();
    if (!s[sid]) s[sid] = { attempts: 0, totalQ: 0, totalCorrect: 0 };
    s[sid].attempts++; s[sid].totalQ += total; s[sid].totalCorrect += correct;
    SD.set('sd_stats', s);
  },

  // ── Test session (passed between pages) ───────────────────
  getSession: () => SD.get('sd_session', null),
  setSession: (s) => SD.set('sd_session', s),
  clearSession: () => SD.del('sd_session'),

  // ── Helpers ───────────────────────────────────────────────
  shuffle: (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  },
  totalWrongCount: () => Object.values(SD.getWrong()).flat().length,
  initials: (name) => name ? name.charAt(0).toUpperCase() : '?',
  
  // Redirect if not logged in
  requireUser: () => {
    if (!SD.getUser()) { window.location.href = 'index.html'; return false; }
    return true;
  }
};

// ── Toast ──────────────────────────────────────────────────
function showToast(msg, type = 'default') {
  let toast = document.getElementById('sd-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'sd-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.className = 'sd-toast show ' + type;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 2800);
}

// ── Common CSS injected into every page ───────────────────
const COMMON_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Sora:wght@300;400;600;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --mint: #7ecec4;
  --mint2: #5ab8ac;
  --peach: #f4a47c;
  --lav: #b5a8e0;
  --cream: #fdf9f4;
  --dark: #1e1e2a;
  --mid: #7a7a92;
  --light: #f0ece6;
  --border: #e5e0d8;
  --card: #ffffff;
  --correct: #6bcb8b;
  --wrong: #f47c7c;
  --shadow: 0 2px 16px rgba(30,30,42,0.07);
  --shadow-lg: 0 8px 40px rgba(30,30,42,0.13);
  --r: 20px;
}

body {
  font-family: 'Sora', sans-serif;
  background: var(--cream);
  color: var(--dark);
  min-height: 100vh;
  overflow-x: hidden;
}

body::before {
  content: '';
  position: fixed;
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(126,206,196,0.14) 0%, transparent 70%);
  top: -200px; right: -200px;
  pointer-events: none;
  z-index: 0;
}

.page { max-width: 480px; margin: 0 auto; padding: 32px 20px 80px; position: relative; z-index: 1; }

/* Navbar */
.navbar {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 28px;
}
.logo {
  font-family: 'Nunito', sans-serif; font-weight: 900; font-size: 1.25rem; color: var(--dark);
  text-decoration: none;
}
.logo em { color: var(--mint); font-style: normal; }
.nav-avatar {
  width: 40px; height: 40px; border-radius: 50%;
  background: linear-gradient(135deg, var(--lav), var(--mint));
  display: flex; align-items: center; justify-content: center;
  font-family: 'Nunito', sans-serif; font-weight: 900; color: white; font-size: 1rem;
  cursor: pointer; text-decoration: none; border: 2px solid var(--border);
  transition: transform 0.2s;
}
.nav-avatar:hover { transform: scale(1.08); }

/* Bottom nav */
.bottom-nav {
  position: fixed; bottom: 0; left: 0; right: 0;
  background: rgba(253,249,244,0.95);
  backdrop-filter: blur(12px);
  border-top: 1px solid var(--border);
  display: flex; align-items: stretch;
  padding: 0; z-index: 100;
  max-width: 480px; margin: 0 auto;
}
.bottom-nav a {
  flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 10px 4px; text-decoration: none; color: var(--mid); font-size: 0.65rem;
  font-family: 'Nunito', sans-serif; font-weight: 700; gap: 3px;
  transition: color 0.2s;
}
.bottom-nav a .nav-icon { font-size: 1.3rem; }
.bottom-nav a.active { color: var(--mint2); }

/* Card */
.card {
  background: var(--card); border-radius: var(--r);
  border: 1.5px solid var(--border); box-shadow: var(--shadow);
  padding: 20px; margin-bottom: 14px;
  position: relative; overflow: hidden;
}
.card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: linear-gradient(90deg, var(--mint), var(--lav));
}
.card.accent-peach::before { background: linear-gradient(90deg, var(--peach), #f4d07c); }
.card.accent-lav::before { background: linear-gradient(90deg, var(--lav), #e0b5d8); }

/* Buttons */
.btn {
  display: flex; align-items: center; justify-content: center; gap: 8px;
  width: 100%; padding: 15px 20px; border: none; border-radius: 14px;
  font-family: 'Nunito', sans-serif; font-weight: 800; font-size: 0.95rem;
  cursor: pointer; transition: all 0.18s; letter-spacing: 0.2px;
}
.btn-dark { background: var(--dark); color: white; }
.btn-dark:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(30,30,42,0.22); }
.btn-mint { background: var(--mint); color: white; }
.btn-mint:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(126,206,196,0.4); }
.btn-peach { background: var(--peach); color: white; }
.btn-ghost { background: var(--light); color: var(--dark); border: 1.5px solid var(--border); }
.btn-ghost:hover { background: var(--border); }
.btn-sm { width: auto; padding: 9px 18px; font-size: 0.82rem; }
.btn + .btn { margin-top: 10px; }

/* Inputs */
.field { margin-bottom: 18px; }
.field label {
  display: block; font-family: 'Nunito', sans-serif; font-weight: 700;
  font-size: 0.72rem; color: var(--mid); margin-bottom: 5px;
  text-transform: uppercase; letter-spacing: 0.6px;
}
.field input {
  width: 100%; padding: 13px 16px;
  border: 1.5px solid var(--border); border-radius: 12px;
  font-family: 'Sora', sans-serif; font-size: 0.9rem;
  color: var(--dark); background: var(--cream); outline: none;
  transition: border-color 0.2s;
}
.field input:focus { border-color: var(--mint); background: white; }

/* Toast */
.sd-toast {
  position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%) translateY(12px);
  background: var(--dark); color: white; padding: 11px 22px;
  border-radius: 99px; font-family: 'Nunito', sans-serif; font-weight: 700;
  font-size: 0.82rem; opacity: 0; transition: all 0.28s;
  pointer-events: none; z-index: 999; white-space: nowrap;
  box-shadow: 0 4px 20px rgba(30,30,42,0.25);
}
.sd-toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
.sd-toast.correct { background: var(--correct); }
.sd-toast.wrong { background: var(--wrong); }

/* Section heading */
.sec-title { font-family: 'Nunito', sans-serif; font-weight: 900; font-size: 1.3rem; margin-bottom: 2px; }
.sec-sub { font-size: 0.8rem; color: var(--mid); margin-bottom: 20px; }

/* Back button */
.back-btn {
  width: 38px; height: 38px; border-radius: 11px;
  background: white; border: 1.5px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: background 0.15s; font-size: 1rem;
  color: var(--dark); text-decoration: none;
}
.back-btn:hover { background: var(--light); }

/* Chip */
.chip {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 3px 11px; border-radius: 99px;
  font-family: 'Nunito', sans-serif; font-weight: 700; font-size: 0.72rem;
}
.chip-mint { background: rgba(126,206,196,0.15); color: var(--mint2); }
.chip-peach { background: rgba(244,164,124,0.15); color: #c45e25; }
.chip-lav { background: rgba(181,168,224,0.15); color: #6a5db0; }
.chip-wrong { background: rgba(244,124,124,0.15); color: #c42525; }

/* Stat ring util */
.ring-wrap { position: relative; width: 56px; height: 56px; flex-shrink: 0; }
.ring-wrap svg { transform: rotate(-90deg); }
.ring-val {
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%,-50%);
  font-family: 'Nunito', sans-serif; font-weight: 900; font-size: 0.72rem; color: var(--dark);
}

/* Animate in */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}
.fade-up { animation: fadeUp 0.35s cubic-bezier(.4,0,.2,1) both; }
`;

// Inject CSS once DOM is ready
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = COMMON_CSS;
  document.head.appendChild(style);
}
