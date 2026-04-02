// src/store/store.js
import { createContext, useContext, useReducer, useEffect } from 'react'

const KEYS = {
  MISTAKES:    'examprep:mistakes',
  SAVED_TESTS: 'examprep:saved_tests',
  PROFILE:     'examprep:profile',
  SETTINGS:    'examprep:settings',
}

const load = (key, fallback) => {
  try { const r = localStorage.getItem(key); return r ? JSON.parse(r) : fallback }
  catch { return fallback }
}
const save = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
}

// ─── initial state ────────────────────────────────────────────────
const initialState = {
  dataset:    [],
  activeTest: null,
  savedTests: load(KEYS.SAVED_TESTS, []),
  mistakes:   load(KEYS.MISTAKES, []),
  profile:    load(KEYS.PROFILE, {
    totalTestsTaken: 0, totalQuestions: 0, totalCorrect: 0,
    streak: 0, lastActiveDate: null, topicStats: {}, testHistory: [],
  }),
  settings: load(KEYS.SETTINGS, {
    shuffleQuestions: true,
    shuffleOptions:   true,
    theme:            'dark',   // 'dark' | 'light'
  }),
  ui: { loading: false, error: null },
}

// ─── action types ─────────────────────────────────────────────────
export const A = {
  SET_DATASET:       'SET_DATASET',
  START_TEST:        'START_TEST',
  ANSWER_QUESTION:   'ANSWER_QUESTION',
  REVEAL_LETTER:     'REVEAL_LETTER',
  SHOW_HINT:         'SHOW_HINT',
  NAVIGATE_QUESTION: 'NAVIGATE_QUESTION',
  SAVE_AND_EXIT:     'SAVE_AND_EXIT',
  RESUME_TEST:       'RESUME_TEST',
  FINISH_TEST:       'FINISH_TEST',
  LOG_MISTAKES:      'LOG_MISTAKES',
  CLEAR_MISTAKE:     'CLEAR_MISTAKE',
  UPDATE_PROFILE:    'UPDATE_PROFILE',
  UPDATE_SETTINGS:   'UPDATE_SETTINGS',
  SET_UI:            'SET_UI',
  SET_THEME:         'SET_THEME',
}

// ─── helpers ─────────────────────────────────────────────────────
export function isCorrect(question, userAnswer) {
  if (userAnswer === undefined || userAnswer === null || userAnswer === '') return false
  switch (question.type) {
    case 'multiple_choice': return userAnswer === question.correctAnswer
    case 'true_false':      return userAnswer === question.correctAnswer
    case 'fill_in_the_blank':
      return String(question.correctAnswer).trim().toLowerCase() === String(userAnswer).trim().toLowerCase()
    case 'matching':
      if (typeof userAnswer !== 'object') return false
      return Object.keys(question.correctAnswer).every(k => String(userAnswer[k]) === String(question.correctAnswer[k]))
    default: return false
  }
}

const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

export function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function buildTestSession(questions, subject, topic, settings) {
  const ordered = settings.shuffleQuestions ? shuffle(questions) : questions
  return {
    id: uid(), subject, topic,
    questions: ordered,
    answers: {}, revealed: {}, hints: {},
    startedAt: Date.now(), savedAt: null,
    finished: false, currentIndex: 0,
  }
}

// ─── reducer ──────────────────────────────────────────────────────
function reducer(state, { type, payload }) {
  switch (type) {
    case A.SET_DATASET:
      return { ...state, dataset: payload }

    case A.START_TEST: {
      const { questions, subject, topic } = payload
      const session = buildTestSession(questions, subject, topic, state.settings)
      return { ...state, activeTest: session }
    }

    case A.ANSWER_QUESTION: {
      const { questionIndex, answer } = payload
      if (!state.activeTest) return state
      return { ...state, activeTest: { ...state.activeTest, answers: { ...state.activeTest.answers, [questionIndex]: answer } } }
    }

    case A.REVEAL_LETTER: {
      const { questionIndex } = payload
      if (!state.activeTest) return state
      const q = state.activeTest.questions[questionIndex]
      const answer = String(q.correctAnswer)
      const already = state.activeTest.revealed[questionIndex] || []
      const unrevealed = answer.split('').reduce((acc, ch, i) => {
        if (ch !== ' ' && !already.includes(i)) acc.push(i)
        return acc
      }, [])
      if (unrevealed.length === 0) return state
      const pick = unrevealed[Math.floor(Math.random() * unrevealed.length)]
      const next = [...already, pick]
      // Patch user answer to include revealed char
      const curAnswer = (state.activeTest.answers[questionIndex] || '').padEnd(answer.length, '')
      const arr = curAnswer.split('')
      arr[pick] = answer[pick]
      return {
        ...state,
        activeTest: {
          ...state.activeTest,
          revealed: { ...state.activeTest.revealed, [questionIndex]: next },
          answers:  { ...state.activeTest.answers,  [questionIndex]: arr.join('') },
        },
      }
    }

    case A.SHOW_HINT: {
      if (!state.activeTest) return state
      return { ...state, activeTest: { ...state.activeTest, hints: { ...state.activeTest.hints, [payload.questionIndex]: true } } }
    }

    case A.NAVIGATE_QUESTION: {
      if (!state.activeTest) return state
      const idx = Math.max(0, Math.min(payload, state.activeTest.questions.length - 1))
      return { ...state, activeTest: { ...state.activeTest, currentIndex: idx } }
    }

    case A.SAVE_AND_EXIT: {
      if (!state.activeTest) return state
      const saved = { ...state.activeTest, savedAt: Date.now() }
      const savedTests = [saved, ...state.savedTests.filter(t => t.id !== saved.id)]
      save(KEYS.SAVED_TESTS, savedTests)
      return { ...state, activeTest: null, savedTests }
    }

    case A.RESUME_TEST: {
      const test = state.savedTests.find(t => t.id === payload)
      if (!test) return state
      const savedTests = state.savedTests.filter(t => t.id !== payload)
      save(KEYS.SAVED_TESTS, savedTests)
      return { ...state, activeTest: { ...test, savedAt: null }, savedTests }
    }

    case A.FINISH_TEST: {
      if (!state.activeTest) return state
      const test = { ...state.activeTest, finished: true }
      const newMistakes = []
      test.questions.forEach((q, i) => {
        const ua = test.answers[i]
        if (!isCorrect(q, ua)) {
          newMistakes.push({
            id: uid(), subject: test.subject, topic: test.topic,
            questionText: q.questionText, type: q.type,
            options: q.options || null,
            userAnswer: ua ?? null, correctAnswer: q.correctAnswer,
            hint: q.hint, source: q.source,
            timestamp: Date.now(), corrected: false,
          })
        }
      })
      const mistakes = [...newMistakes, ...state.mistakes].slice(0, 500)
      save(KEYS.MISTAKES, mistakes)
      return { ...state, activeTest: test, mistakes }
    }

    case A.CLEAR_MISTAKE: {
      const mistakes = state.mistakes.map(m => m.id === payload ? { ...m, corrected: true } : m)
      save(KEYS.MISTAKES, mistakes)
      return { ...state, mistakes }
    }

    case A.UPDATE_PROFILE: {
      const { summary } = payload
      const p = state.profile
      const key = `${summary.subject} › ${summary.topic}`
      const topicStats = { ...p.topicStats }
      if (!topicStats[key]) topicStats[key] = { correct: 0, total: 0 }
      topicStats[key].correct += summary.correct
      topicStats[key].total   += summary.total
      const today = new Date().toDateString()
      const streak = p.lastActiveDate === today ? p.streak
        : p.lastActiveDate === new Date(Date.now() - 86400000).toDateString() ? p.streak + 1 : 1
      const profile = {
        ...p,
        totalTestsTaken: p.totalTestsTaken + 1,
        totalQuestions:  p.totalQuestions  + summary.total,
        totalCorrect:    p.totalCorrect    + summary.correct,
        streak, lastActiveDate: today, topicStats,
        testHistory: [{ ...summary, date: Date.now() }, ...p.testHistory].slice(0, 50),
      }
      save(KEYS.PROFILE, profile)
      return { ...state, profile }
    }

    case A.UPDATE_SETTINGS: {
      const settings = { ...state.settings, ...payload }
      save(KEYS.SETTINGS, settings)
      return { ...state, settings }
    }

    // ── Theme toggle ────────────────────────────────────────────
    case A.SET_THEME: {
      const theme = payload  // 'dark' | 'light'
      const settings = { ...state.settings, theme }
      save(KEYS.SETTINGS, settings)
      // Apply to <html> immediately
      document.documentElement.setAttribute('data-theme', theme)
      return { ...state, settings }
    }

    case A.SET_UI:
      return { ...state, ui: { ...state.ui, ...payload } }

    default:
      return state
  }
}

// ─── Context ──────────────────────────────────────────────────────
const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Apply saved theme on mount
  useEffect(() => {
    const theme = state.settings.theme || 'dark'
    document.documentElement.setAttribute('data-theme', theme)
  }, [])

  // Load dataset
  useEffect(() => {
    dispatch({ type: A.SET_UI, payload: { loading: true } })
    fetch(`${import.meta.env.BASE_URL}questions.json`)
      .then(r => r.json())
      .then(data => {
        dispatch({ type: A.SET_DATASET, payload: data })
        dispatch({ type: A.SET_UI, payload: { loading: false } })
      })
      .catch(err => dispatch({ type: A.SET_UI, payload: { loading: false, error: err.message } }))
  }, [])

  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>
}

export const useStore = () => useContext(StoreContext)

// ─── Selectors ────────────────────────────────────────────────────
export const selectors = {
  subjects: (dataset) => [...new Set(dataset.map(d => d.subject))],

  topicsForSubject: (dataset, subject) =>
    [...new Set(dataset.filter(d => d.subject === subject).map(d => d.topic))],

  getTestQuestions: (dataset, subject, topic) =>
    dataset
      .filter(d => d.category === 'test'
        && (subject === 'mixed' || d.subject === subject)
        && (topic   === 'mixed' || d.topic   === topic))
      .flatMap(d => d.questions),

  getFlashcards: (dataset, subject, topic) =>
    dataset
      .filter(d => d.category === 'flashcard'
        && (subject === 'mixed' || d.subject === subject)
        && (topic   === 'mixed' || d.topic   === topic))
      .flatMap(d => d.questions.map(q => ({ ...q, subject: d.subject, topic: d.topic }))),

  activeMistakes: (mistakes, subject, topic) =>
    mistakes.filter(m => !m.corrected
      && (subject === 'mixed' || m.subject === subject)
      && (topic   === 'mixed' || m.topic   === topic)),

  testScore: (activeTest) => {
    if (!activeTest) return null
    let correct = 0
    activeTest.questions.forEach((q, i) => { if (isCorrect(q, activeTest.answers[i])) correct++ })
    return { correct, total: activeTest.questions.length, pct: Math.round(correct / activeTest.questions.length * 100) }
  },
}
