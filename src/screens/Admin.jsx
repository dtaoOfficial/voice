import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import GenderIcon from '../components/GenderIcon'
import { EMOJI_SCALE, GENDER_OPTIONS, TARGET_RESPONSES } from '../lib/config'
import { clearResponses, exportCSV, getResponses, login } from '../lib/storage'

function ratingDistribution(responses) {
  const total = responses.length
  return EMOJI_SCALE.map((item) => {
    const count = responses.filter((r) => r.rating === item.value).length
    return { ...item, count, pct: total ? Math.round((count / total) * 100) : 0 }
  })
}

function genderBreakdown(responses) {
  return GENDER_OPTIONS.map((option) => {
    const rows = responses.filter((r) => r.gender === option.value)
    const avg = rows.length ? (rows.reduce((s, r) => s + r.rating, 0) / rows.length).toFixed(1) : '—'
    const byRating = EMOJI_SCALE.map((item) => ({
      ...item,
      count: rows.filter((r) => r.rating === item.value).length,
    }))
    return { ...option, count: rows.length, avg, byRating }
  })
}

function Login({ onSuccess, onBack }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      await login(email, password)
      onSuccess(email, password)
    } catch {
      setError(true)
      setPassword('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      className="relative z-10 flex h-full flex-col items-center justify-center gap-6 px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-2xl font-extrabold md:text-3xl">Admin Login</h2>
      <form onSubmit={submit} className="flex flex-col items-center gap-4">
        <input
          type="email"
          autoFocus
          autoCapitalize="none"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setError(false)
          }}
          className="glass w-64 rounded-xl px-4 py-3 text-center text-lg outline-none"
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setError(false)
          }}
          className="glass w-64 rounded-xl px-4 py-3 text-center text-lg tracking-widest outline-none"
          placeholder="Password"
        />
        {error && <p className="text-sm text-rose-400">Wrong email or password. Try again.</p>}
        <button
          type="submit"
          disabled={loading}
          className="rounded-full px-8 py-3 font-bold text-white"
          style={{ background: '#000000', boxShadow: '0 8px 20px -6px rgba(0, 0, 0, 0.45)' }}
        >
          {loading ? 'Checking...' : 'Unlock'}
        </button>
      </form>
      <button onClick={onBack} className="text-sm text-[var(--text-muted)] underline">
        Back
      </button>
    </motion.div>
  )
}

function Dashboard({ email, password, onBack }) {
  const [responses, setResponses] = useState(null)
  const [confirmClear, setConfirmClear] = useState(false)

  useEffect(() => {
    getResponses(email, password).then(setResponses)
  }, [email, password])

  const avg =
    responses && responses.length
      ? (responses.reduce((s, r) => s + r.rating, 0) / responses.length).toFixed(1)
      : '—'

  async function handleClear() {
    if (!confirmClear) {
      setConfirmClear(true)
      return
    }
    await clearResponses(email, password)
    setResponses([])
    setConfirmClear(false)
  }

  return (
    <motion.div
      className="relative z-10 flex h-full flex-col items-center gap-6 overflow-y-auto px-4 py-10 text-center md:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-2xl font-extrabold md:text-3xl">Your Results</h2>

      {responses === null ? (
        <p className="text-sm text-[var(--text-muted)]">Loading...</p>
      ) : (
        <>
          <div className="grid w-full max-w-lg grid-cols-2 gap-4">
            <div className="glass rounded-2xl px-4 py-5">
              <p className="text-3xl font-extrabold">
                {responses.length}/{TARGET_RESPONSES}
              </p>
              <p className="text-xs text-[var(--text-muted)] md:text-sm">Responses collected</p>
            </div>
            <div className="glass rounded-2xl px-4 py-5">
              <p className="text-3xl font-extrabold">{avg}</p>
              <p className="text-xs text-[var(--text-muted)] md:text-sm">Average rating / 5</p>
            </div>
          </div>

          <div className="glass w-full max-w-lg rounded-2xl p-4 text-left">
            <p className="mb-3 text-xs font-bold tracking-wide text-[var(--text-muted)] uppercase">
              Rating breakdown
            </p>
            <div className="flex flex-col gap-2">
              {ratingDistribution(responses).map((item) => (
                <div key={item.value} className="flex items-center gap-2 text-sm">
                  <span className="w-6">{item.emoji}</span>
                  <span className="w-16 shrink-0 text-[var(--text-muted)]">{item.label}</span>
                  <span className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--surface-strong)]">
                    <span
                      className="block h-full rounded-full"
                      style={{ width: `${item.pct}%`, background: 'var(--accent)' }}
                    />
                  </span>
                  <span className="w-6 shrink-0 text-right font-bold">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid w-full max-w-lg grid-cols-2 gap-4">
            {genderBreakdown(responses).map((g) => (
              <div key={g.value} className="glass flex flex-col items-center rounded-2xl px-4 py-5">
                <GenderIcon type={g.value} size={28} />
                <p className="mt-1 text-2xl font-extrabold">{g.avg}</p>
                <p className="text-xs text-[var(--text-muted)] md:text-sm">
                  {g.label} avg · {g.count} {g.count === 1 ? 'response' : 'responses'}
                </p>
              </div>
            ))}
          </div>

          <div className="glass w-full max-w-lg rounded-2xl p-4 text-left">
            <p className="mb-3 text-xs font-bold tracking-wide text-[var(--text-muted)] uppercase">
              Gender × rating
            </p>
            <div className="flex flex-col gap-3">
              {genderBreakdown(responses).map((g) => (
                <div key={g.value} className="flex items-center gap-2 text-sm">
                  <span className="flex w-20 shrink-0 items-center gap-1.5">
                    <GenderIcon type={g.value} size={18} />
                    {g.label}
                  </span>
                  <div className="flex flex-1 justify-between gap-1">
                    {g.byRating.map((item) => (
                      <span key={item.value} className="flex flex-col items-center">
                        <span>{item.emoji}</span>
                        <span className="text-xs font-bold">{item.count}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass w-full max-w-lg flex-1 overflow-y-auto rounded-2xl p-3 text-left">
            {responses.length === 0 && (
              <p className="p-4 text-center text-sm text-[var(--text-muted)]">No responses yet.</p>
            )}
            {responses.map((r) => {
              const e = EMOJI_SCALE.find((x) => x.value === r.rating)
              return (
                <div
                  key={r.id ?? r.timestamp}
                  className="flex items-center justify-between border-b border-white/10 px-2 py-2 text-sm last:border-0"
                >
                  <span>
                    {e?.emoji} {e?.label}
                    {r.gender && ` · ${GENDER_OPTIONS.find((g) => g.value === r.gender)?.label ?? r.gender}`}
                    {r.pending && ' (not synced yet)'}
                  </span>
                  <span className="text-[var(--text-muted)]">
                    {new Date(r.timestamp).toLocaleString()}
                  </span>
                </div>
              )
            })}
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => exportCSV(responses)}
              className="rounded-full px-6 py-3 font-bold text-white"
              style={{ background: '#000000', boxShadow: '0 8px 20px -6px rgba(0, 0, 0, 0.45)' }}
            >
              Export CSV
            </button>
            <button
              onClick={handleClear}
              className={
                confirmClear
                  ? 'rounded-full px-6 py-3 font-bold text-white shadow-lg'
                  : 'glass rounded-full px-6 py-3 font-bold'
              }
              style={confirmClear ? { background: '#e11d48' } : undefined}
            >
              {confirmClear ? 'Tap again to confirm' : 'Clear All Data'}
            </button>
          </div>
        </>
      )}
      <button onClick={onBack} className="rounded-full px-6 py-3 font-bold underline">
        Back
      </button>
    </motion.div>
  )
}

export default function Admin({ onBack }) {
  const [creds, setCreds] = useState(null)
  return creds ? (
    <Dashboard email={creds.email} password={creds.password} onBack={onBack} />
  ) : (
    <Login onSuccess={(email, password) => setCreds({ email, password })} onBack={onBack} />
  )
}
