# Speak Game

An installable, offline-first PWA: a stranger taps through a short intro, rates the experience, then picks a prize card. Ratings are stored in a Postgres database via a small Express API — everything runs together with Docker Compose.

## Run it locally (frontend only, no Docker)

```bash
npm install
npm run dev       # local dev server, proxies /api to localhost:4000
npm run build     # production build -> dist/
```

To also run the API locally without Docker:

```bash
cd server
npm install
DB_HOST=localhost DB_USER=postgres DB_PASSWORD=postgres DB_NAME=speakgame node index.js
```
(needs a local Postgres instance with a `speakgame` database)

## Run everything with Docker

```bash
docker compose up -d --build
```

This starts three containers:
- `db` — Postgres, data persisted in the `db-data` volume
- `backend` — the Express API (port 4000 internally)
- `frontend` — Nginx serving the built app and proxying `/api` to `backend`, exposed on host port `8080`

Change `ADMIN_EMAIL` / `ADMIN_PASSWORD` and the Postgres credentials in `docker-compose.yml` before deploying.

## Customize

Edit `src/lib/config.js`:

- `PRIZES` — the 8 card values (numbers = rupees, `'sweet'` = candy)
- `TARGET_RESPONSES` — your goal count, shown in the admin dashboard
- `EMOJI_SCALE` / `PERSON_NAME` — rating options and the name shown on the intro screen
- `QUESTION_COUNT` — how many questions must be marked asked before Continue unlocks

## Admin dashboard

Tap the small "● Speak Game" label on the landing screen 5 times to open the login. Enter the admin email/password set in `docker-compose.yml`. View collected ratings, see the average, and export everything as a CSV.

## Offline behavior

If the tablet has no wifi when someone rates, the rating is queued in `localStorage` and automatically retried the next time the app detects it's back online.

## Deploying behind your own domain (e.g. Cloudflare + a VPS)

1. On the VPS: `docker compose up -d --build` (port 8080 on the host)
2. Add an Nginx server block on the **host** (outside Docker) for your subdomain that proxies to `127.0.0.1:8080` — this avoids clashing with any other sites already running on ports 80/443
3. In Cloudflare DNS, point the subdomain's A record at the VPS's IP (proxied, for automatic HTTPS)
4. Open the subdomain on the tablet and use "Add to Home Screen" to install it — it then works fully offline
