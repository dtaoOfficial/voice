import pg from 'pg'

const pool = new pg.Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'speakgame',
})

// Postgres can take a few seconds to accept connections after the container
// starts, so retry instead of crashing on the first failed attempt.
export async function initDb(retries = 10, delayMs = 2000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS responses (
          id UUID PRIMARY KEY,
          rating INTEGER NOT NULL,
          gender TEXT,
          prize TEXT NOT NULL,
          timestamp TIMESTAMPTZ NOT NULL
        )
      `)
      await pool.query(`ALTER TABLE responses ADD COLUMN IF NOT EXISTS gender TEXT`)
      return
    } catch (err) {
      if (attempt === retries) throw err
      console.log(`Database not ready yet (attempt ${attempt}/${retries}), retrying...`)
      await new Promise((resolve) => setTimeout(resolve, delayMs))
    }
  }
}

export default pool
