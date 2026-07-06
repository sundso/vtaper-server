# V-Taper Log

Backend API and single-file frontend for the V-Taper Log workout tracker — a
single-user PWA for logging lifting/pump sessions, tracking progress over
time, and following a phased training program.

- **Frontend**: `index.html` — a single-file React (CDN + Babel standalone)
  PWA. Deployed via GitHub Pages.
- **Backend**: `src/` — a small Express + Postgres API. Deployed on Render.

See [CLAUDE.md](CLAUDE.md) and [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) for
frontend conventions and the theming/token system.

## Stack

- Node.js / Express
- PostgreSQL (`pg`)
- JWT auth (`jsonwebtoken`) with a single hardcoded admin user (`bcryptjs` for
  the password hash)

## Setup

1. Install dependencies:
   ```
   npm install
   ```
2. Create a Postgres database (e.g. via Neon or Supabase) and run
   [`schema.sql`](schema.sql) against it once to create the `meta` and `logs`
   tables.
3. Generate a password hash for your admin login:
   ```
   npm run hash-password -- <your-password>
   ```
4. Create a `.env` file in the project root:
   ```
   DATABASE_URL=postgres://...
   JWT_SECRET=some-long-random-string
   ADMIN_USER=your-username
   ADMIN_PASSWORD_HASH=<output from hash-password above>
   PORT=3000
   ```
   `PORT` is optional and defaults to `3000`.
5. Start the server:
   ```
   npm run dev   # auto-restarts on changes
   npm start     # plain node
   ```
6. Open `index.html` in a browser (or serve it statically). It talks to the
   API via the `API_BASE` constant near the top of the `<script>` block —
   point that at `http://localhost:3000` for local development, or your
   deployed backend URL otherwise.

## API

All routes below `/api` (except login) require `Authorization: Bearer
<token>`, obtained from `/api/auth/login`.

| Method | Path              | Description                          |
| ------ | ----------------- | ------------------------------------ |
| POST   | `/api/auth/login` | Log in with `ADMIN_USER`/password    |
| GET    | `/api/meta`       | Get program start date               |
| POST   | `/api/meta`       | Set program start date               |
| GET    | `/api/logs`       | List all workout logs                |
| POST   | `/api/logs`       | Create a workout log                 |
| DELETE | `/api/logs/:id`   | Delete a single workout log          |
| DELETE | `/api/reset`      | Delete all logs and reset start date |

## Notes

- `.env` is gitignored and never committed — each machine running the server
  needs its own copy with real secrets/credentials.
- The frontend's per-session offline cache is handled by `sw.js`; bump its
  cache version when shipping a frontend change that should invalidate
  cached clients.
