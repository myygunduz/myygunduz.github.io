// ─── src/store/store.js ───────────────────────────────────────────────────────
// Central state management using React Context + useReducer + localStorage
// No external state library needed - keeps the bundle tiny.

import { createContext, useContext, useReducer, useEffect, useCallback } from 'react'

// ─── localStorage keys ────────────────────────────────────────────────────────
const KEYS = {
  MISTAKES:      'examprep:mistakes',
  SAVED_TESTS:   'examprep:saved_tests',
  PROFILE:       'examprep:profile',
  SETTINGS:      'examprep:settings',
  TEST_HISTORY:  'examprep:test_history',
}

// ─── helpers ──────────────────────────────────────────────────────────────────
const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch { return fallback }
}

const save = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
}

// ─── initial state ────────────────────────────────────────────────────────────
const initialState = {
  // Raw dataset parsed from the static JSON file
  dataset: [],

  // Active test session
  activeTest: null,
  /*
    activeTest shape:
    {
      id: string,               // unique session id
      subject: string | 'mixed',
      topic:   string | 'mixed',
      questions: Question[],    // shuffled subset
      answers:   Record<number, any>, // questionIndex → user answer
      revealed:  Record<number, number[]>, // fill_blank: revealed char indices
      hints:     Record<number, boolean>,  // questions with hint shown
      startedAt: number,        // timestamp
      savedAt:   number | null, // if saved-and-exited
      finished:  boolean,
      currentIndex: number,
    }
  */

  // All saved (paused) tests
  savedTests: load(KEYS.SAVED_TESTS, []),

  // Mistake log
  mistakes: load(KEYS.MISTAKES, []),
  /*
    mistake shape:
    {
      id: string,
      subject: string,
      topic: string,
      questionText: string,
      type: string,
      userAnswer: any,
      correctAnswer: any,
      hint: string,
      source: string,
      timestamp: number,
      corrected: boolean,   // true once answered correctly in a correction test
    }
  */

  // User profile stats
  profile: load(KEYS.PROFILE, {
    totalTestsTaken:   0,
    totalQuestions:    0,
    totalCorrect:      0,
    streak:            0,
    lastActiveDate:    null,
    topicStats:        {},  // { "Physics > Thermodynamics": { correct, total } }
    testHistory:       [],  // last 50 test summaries
  }),

  settings: load(KEYS.SETTINGS, {
    shuffleQuestions: true,
    shuffleOptions:   true,
    darkMode:         false,
  }),

  ui: {
    loading: false,
    error:   null,
  },
}

// ─── action types ─────────────────────────────────────────────────────────────
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
}

// ─── pure helper: score a single answer ───────────────────────────────────────
export function isCorrect(question, userAnswer) {
  if (userAnswer === undefined || userAnswer === null || userAnswer === '') return false

  switch (question.type) {
    case 'multiple_choice':
      return userAnswer === question.correctAnswer  // both are indices

    case 'true_false':
      return userAnswer === question.correctAnswer  // both booleans

    case 'fill_in_the_blank': {
      const correct = String(question.correctAnswer).trim().toLowerCase()
      const given   = String(userAnswer).trim().toLowerCase()
      return correct === given
    }

    case 'matching': {
      // userAnswer: { [leftIndex]: rightIndex }
      // correctAnswer: { [leftIndex]: rightIndex }
      if (typeof userAnswer !== 'object') return false
      const correct = question.correctAnswer
      return Object.keys(correct).every(k => String(userAnswer[k]) === String(correct[k]))
    }

    default:
      return false
  }
}

// ─── generate a unique session id ─────────────────────────────────────────────
const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

// ─── shuffle array (Fisher-Yates) ─────────────────────────────────────────────
export function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ─── build a test session from a question list ────────────────────────────────
export function buildTestSession(questions, subject, topic, settings) {
  const ordered = settings.shuffleQuestions ? shuffle(questions) : questions
  return {
    id:           uid(),
    subject,
    topic,
    questions:    ordered,
    answers:      {},
    revealed:     {},   // { questionIndex: [charIndex, ...] }
    hints:        {},
    startedAt:    Date.now(),
    savedAt:      null,
    finished:     false,
    currentIndex: 0,
  }
}

// ─── reducer ──────────────────────────────────────────────────────────────────
function reducer(state, { type, payload }) {
  switch (type) {

    case A.SET_DATASET:
      return { ...state, dataset: payload }

    // ── start a brand-new test ────────────────────────────────────────────────
    case A.START_TEST: {
      const { questions, subject, topic } = payload
      const session = buildTestSession(questions, subject, topic, state.settings)
      return { ...state, activeTest: session }
    }

    // ── record an answer ──────────────────────────────────────────────────────
    case A.ANSWER_QUESTION: {
      const { questionIndex, answer } = payload
      if (!state.activeTest) return state
      return {
        ...state,
        activeTest: {
          ...state.activeTest,
          answers: { ...state.activeTest.answers, [questionIndex]: answer },
        },
      }
    }

    // ── fill-in-blank: reveal one random unrevealed character ─────────────────
    case A.REVEAL_LETTER: {
      const { questionIndex } = payload
      if (!state.activeTest) return state
      const q = state.activeTest.questions[questionIndex]
      const answer = String(q.correctAnswer)
      const alreadyRevealed = state.activeTest.revealed[questionIndex] || []
      // Find unrevealed non-space positions
      const unrevealed = answer.split('').reduce((acc, ch, i) => {
        if (ch !== ' ' && !alreadyRevealed.includes(i)) acc.push(i)
        return acc
      }, [])
      if (unrevealed.length === 0) return state
      const pick = unrevealed[Math.floor(Math.random() * unrevealed.length)]
      const next = [...alreadyRevealed, pick]
      // Also patch the answer so revealed letters show up in the input
      const currentAnswer = state.activeTest.answers[questionIndex] || ''
      const answerArr = currentAnswer.split('')
      answerArr[pick] = answer[pick]
      return {
        ...state,
        activeTest: {
          ...state.activeTest,
          revealed: { ...state.activeTest.revealed, [questionIndex]: next },
          answers:  { ...state.activeTest.answers,  [questionIndex]: answerArr.join('') },
        },
      }
    }

    // ── show a hint ───────────────────────────────────────────────────────────
    case A.SHOW_HINT: {
      const { questionIndex } = payload
      if (!state.activeTest) return state
      return {
        ...state,
        activeTest: {
          ...state.activeTest,
          hints: { ...state.activeTest.hints, [questionIndex]: true },
        },
      }
    }

    // ── navigate between questions ────────────────────────────────────────────
    case A.NAVIGATE_QUESTION: {
      if (!state.activeTest) return state
      const idx = Math.max(0, Math.min(payload, state.activeTest.questions.length - 1))
      return { ...state, activeTest: { ...state.activeTest, currentIndex: idx } }
    }

    // ── save current test and exit ────────────────────────────────────────────
    case A.SAVE_AND_EXIT: {
      if (!state.activeTest) return state
      const saved = { ...state.activeTest, savedAt: Date.now() }
      // Upsert by id
      const existing = state.savedTests.filter(t => t.id !== saved.id)
      const savedTests = [saved, ...existing]
      save(KEYS.SAVED_TESTS, savedTests)
      return { ...state, activeTest: null, savedTests }
    }

    // ── resume a saved test ───────────────────────────────────────────────────
    case A.RESUME_TEST: {
      const test = state.savedTests.find(t => t.id === payload)
      if (!test) return state
      // Remove from saved list
      const savedTests = state.savedTests.filter(t => t.id !== payload)
      save(KEYS.SAVED_TESTS, savedTests)
      return { ...state, activeTest: { ...test, savedAt: null }, savedTests }
    }

    // ── finish test: mark finished, score, log mistakes ───────────────────────
    case A.FINISH_TEST: {
      if (!state.activeTest) return state
      const test = { ...state.activeTest, finished: true }
      const newMistakes = []
      test.questions.forEach((q, i) => {
        const userAns = test.answers[i]
        if (!isCorrect(q, userAns)) {
          newMistakes.push({
            id:            uid(),
            subject:       test.subject,
            topic:         test.topic,
            questionText:  q.questionText,
            type:          q.type,
            options:       q.options || null,
            userAnswer:    userAns ?? null,
            correctAnswer: q.correctAnswer,
            hint:          q.hint,
            source:        q.source,
            timestamp:     Date.now(),
            corrected:     false,
          })
        }
      })
      const mistakes = [...newMistakes, ...state.mistakes].slice(0, 500) // cap at 500
      save(KEYS.MISTAKES, mistakes)
      return { ...state, activeTest: test, mistakes }
    }

    // ── mark a mistake as corrected ───────────────────────────────────────────
    case A.CLEAR_MISTAKE: {
      const mistakes = state.mistakes.map(m =>
        m.id === payload ? { ...m, corrected: true } : m
      )
      save(KEYS.MISTAKES, mistakes)
      return { ...state, mistakes }
    }

    // ── update profile after a test ───────────────────────────────────────────
    case A.UPDATE_PROFILE: {
      const { summary } = payload  // { correct, total, subject, topic, score }
      const p = state.profile
      const key = `${summary.subject} › ${summary.topic}`
      const topicStats = { ...p.topicStats }
      if (!topicStats[key]) topicStats[key] = { correct: 0, total: 0 }
      topicStats[key].correct += summary.correct
      topicStats[key].total   += summary.total

      const today = new Date().toDateString()
      const streak = p.lastActiveDate === today
        ? p.streak
        : p.lastActiveDate === new Date(Date.now() - 86400000).toDateString()
          ? p.streak + 1
          : 1

      const profile = {
        ...p,
        totalTestsTaken:  p.totalTestsTaken + 1,
        totalQuestions:   p.totalQuestions + summary.total,
        totalCorrect:     p.totalCorrect + summary.correct,
        streak,
        lastActiveDate:   today,
        topicStats,
        testHistory: [
          { ...summary, date: Date.now() },
          ...p.testHistory,
        ].slice(0, 50),
      }
      save(KEYS.PROFILE, profile)
      return { ...state, profile }
    }

    case A.UPDATE_SETTINGS: {
      const settings = { ...state.settings, ...payload }
      save(KEYS.SETTINGS, settings)
      return { ...state, settings }
    }

    case A.SET_UI:
      return { ...state, ui: { ...state.ui, ...payload } }

    default:
      return state
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────
const StoreContext = createContext(null)

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Load the static JSON dataset on mount
  useEffect(() => {
    dispatch({ type: A.SET_UI, payload: { loading: true } })
    // With Vite, place questions.json in public/ and fetch from root
    fetch(`${import.meta.env.BASE_URL}questions.json`)
      .then(r => r.json())
      .then(data => {
        dispatch({ type: A.SET_DATASET, payload: data })
        dispatch({ type: A.SET_UI, payload: { loading: false } })
      })
      .catch(err => {
        dispatch({ type: A.SET_UI, payload: { loading: false, error: err.message } })
      })
  }, [])

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext)

// ─── Derived selectors (pure functions, no hooks) ─────────────────────────────
export const selectors = {
  // All unique subjects in the dataset
  subjects: (dataset) =>
    [...new Set(dataset.map(d => d.subject))],

  // Topics for a given subject
  topicsForSubject: (dataset, subject) =>
    [...new Set(
      dataset.filter(d => d.subject === subject).map(d => d.topic)
    )],

  // Questions for test generation
  getTestQuestions: (dataset, subject, topic) => {
    return dataset
      .filter(d =>
        d.category === 'test' &&
        (subject === 'mixed' || d.subject === subject) &&
        (topic   === 'mixed' || d.topic   === topic)
      )
      .flatMap(d => d.questions)
  },

  // Flashcard items
  getFlashcards: (dataset, subject, topic) => {
    return dataset
      .filter(d =>
        d.category === 'flashcard' &&
        (subject === 'mixed' || d.subject === subject) &&
        (topic   === 'mixed' || d.topic   === topic)
      )
      .flatMap(d => d.questions.map(q => ({
        ...q,
        subject: d.subject,
        topic:   d.topic,
      })))
  },

  // Active mistakes (not yet corrected), optionally filtered
  activeMistakes: (mistakes, subject, topic) =>
    mistakes.filter(m =>
      !m.corrected &&
      (subject === 'mixed' || m.subject === subject) &&
      (topic   === 'mixed' || m.topic   === topic)
    ),

  // Score for the current active test
  testScore: (activeTest) => {
    if (!activeTest) return null
    let correct = 0
    activeTest.questions.forEach((q, i) => {
      if (isCorrect(q, activeTest.answers[i])) correct++
    })
    return { correct, total: activeTest.questions.length, pct: Math.round(correct / activeTest.questions.length * 100) }
  },
}
