import { randomUUID } from 'crypto'
import express from 'express'
import pool, { initDb } from './db.js'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@gmail.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '123456789'
const PORT = process.env.PORT || 4000

function checkAdmin(req, res, next) {
  const email = req.headers['x-admin-email']
  const password = req.headers['x-admin-password']
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) return next()
  res.status(401).json({ error: 'Unauthorized' })
}

const app = express()
app.use(express.json())

app.post('/api/login', (req, res) => {
  const { email, password } = req.body
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    res.json({ ok: true })
  } else {
    res.status(401).json({ ok: false })
  }
})

app.post('/api/responses', async (req, res) => {
  const { rating, gender, prize } = req.body
  if (![1, 2, 3, 4, 5].includes(rating)) {
    return res.status(400).json({ error: 'Invalid rating' })
  }
  if (gender != null && !['male', 'female'].includes(gender)) {
    return res.status(400).json({ error: 'Invalid gender' })
  }
  await pool.query(
    'INSERT INTO responses (id, rating, gender, prize, timestamp) VALUES ($1, $2, $3, $4, $5)',
    [randomUUID(), rating, gender ?? null, String(prize), new Date().toISOString()],
  )
  res.status(201).json({ ok: true })
})

app.get('/api/responses', checkAdmin, async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM responses ORDER BY timestamp DESC')
  res.json(rows)
})

app.delete('/api/responses', checkAdmin, async (req, res) => {
  await pool.query('DELETE FROM responses')
  res.json({ ok: true })
})

initDb()
  .then(() => app.listen(PORT, () => console.log(`Speak Game API running on port ${PORT}`)))
  .catch((err) => {
    console.error('Failed to connect to database:', err.message)
    process.exit(1)
  })
