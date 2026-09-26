const API_BASE = '/api'
const PENDING_KEY = 'speak-game-pending'

function getPending() {
  try {
    return JSON.parse(localStorage.getItem(PENDING_KEY)) || []
  } catch {
    return []
  }
}

function setPending(list) {
  localStorage.setItem(PENDING_KEY, JSON.stringify(list))
}

async function postResponse(entry) {
  const res = await fetch(`${API_BASE}/responses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry),
  })
  if (!res.ok) throw new Error('save failed')
}

// Saves instantly even with no wifi — if the request fails, the rating is
// queued and retried the next time flushPending() runs (e.g. back online).
export async function saveResponse({ rating, gender, prize }) {
  const entry = { rating, gender, prize, timestamp: new Date().toISOString() }
  try {
    await postResponse(entry)
  } catch {
    setPending([...getPending(), entry])
  }
}

export async function flushPending() {
  const pending = getPending()
  if (!pending.length) return
  const stillPending = []
  for (const entry of pending) {
    try {
      await postResponse(entry)
    } catch {
      stillPending.push(entry)
    }
  }
  setPending(stillPending)
}

export async function login(email, password) {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) throw new Error('Invalid credentials')
}

export async function getResponses(email, password) {
  const res = await fetch(`${API_BASE}/responses`, {
    headers: { 'x-admin-email': email, 'x-admin-password': password },
  })
  if (!res.ok) throw new Error('Unauthorized')
  const responses = await res.json()
  return [...responses, ...getPending().map((r) => ({ ...r, pending: true }))]
}

export async function clearResponses(email, password) {
  const res = await fetch(`${API_BASE}/responses`, {
    method: 'DELETE',
    headers: { 'x-admin-email': email, 'x-admin-password': password },
  })
  if (!res.ok) throw new Error('Unauthorized')
  setPending([])
}

export function exportCSV(responses) {
  const header = 'id,timestamp,rating,gender,prize\n'
  const rows = responses
    .map((r) => `${r.id ?? 'pending'},${r.timestamp},${r.rating},${r.gender ?? ''},${r.prize}`)
    .join('\n')
  const blob = new Blob([header + rows], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `speak-game-responses-${new Date().toISOString().slice(0, 10)}.csv`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
