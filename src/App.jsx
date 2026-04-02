// src/App.jsx
import { HashRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom'
import { StoreProvider, useStore, A } from './store/store'
import HomePage       from './pages/HomePage'
import TestSetupPage  from './pages/TestSetupPage'
import TestPage       from './pages/TestPage'
import ResultsPage    from './pages/ResultsPage'
import FlashcardsPage from './pages/FlashcardsPage'
import MistakesPage   from './pages/MistakesPage'
import ProfilePage    from './pages/ProfilePage'
import './styles/global.css'

function NavBar() {
  const { state, dispatch } = useStore()
  const mistakeCount = state.mistakes.filter(m => !m.corrected).length
  const isDark = state.settings.theme === 'dark'

  const toggleTheme = () => {
    dispatch({ type: A.SET_THEME, payload: isDark ? 'light' : 'dark' })
  }

  return (
    <nav className="navbar">
      {/* Brand */}
      <div className="navbar-brand">
        <span className="navbar-logo">⚡</span>
        <span className="navbar-title">ExamPrep</span>
      </div>

      {/* Links */}
      <div className="navbar-links">
        <NavLink to="/"           className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'} end>
          Ana Sayfa
        </NavLink>
        <NavLink to="/test-setup" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
          Test
        </NavLink>
        <NavLink to="/flashcards" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
          Kartlar
        </NavLink>
        <NavLink to="/mistakes"   className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
          Hatalar
          {mistakeCount > 0 && <span className="badge">{mistakeCount}</span>}
        </NavLink>
        <NavLink to="/profile"    className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
          Profil
        </NavLink>
      </div>

      {/* Right side: theme toggle */}
      <div className="navbar-right">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={isDark ? 'Aydınlık moda geç' : 'Karanlık moda geç'}
          title={isDark ? 'Aydınlık Mod' : 'Karanlık Mod'}
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  )
}

function AppInner() {
  const location = useLocation()
  // Hide navbar during active test for more screen space
  const hideNav = location.pathname.startsWith('/test/')

  return (
    <div className="app">
      {!hideNav && <NavBar />}
      <main className="main-content">
        <Routes>
          <Route path="/"              element={<HomePage />} />
          <Route path="/test-setup"    element={<TestSetupPage />} />
          <Route path="/test/:testId"  element={<TestPage />} />
          <Route path="/results"       element={<ResultsPage />} />
          <Route path="/flashcards"    element={<FlashcardsPage />} />
          <Route path="/mistakes"      element={<MistakesPage />} />
          <Route path="/profile"       element={<ProfilePage />} />
        </Routes>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <StoreProvider>
      <HashRouter>
        <AppInner />
      </HashRouter>
    </StoreProvider>
  )
}
