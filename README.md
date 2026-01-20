<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/17OgT9Uq4kSjH7VZL--OgJQSiqBZlbgMe

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Cloud database + Netlify

1. Provision a Postgres instance (Netlify DB/Neon/Supabase/RDS). Copy the connection string as `DATABASE_URL` (or rely on Netlify's auto `NETLIFY_DATABASE_URL` env).
2. Apply the schema: `psql "$DATABASE_URL" -f db/schema.sql`.
3. Add Netlify environment variables:
   - `DATABASE_URL=<connection string>`
   - `VITE_REMOTE_DB=true`
   - Optionally `VITE_API_BASE=/.netlify/functions` for custom domains.
4. For local testing, mirror the variables in `.env.local`.
5. Deploy via Netlify. The `netlify/functions/state.ts` endpoint persists UI state into Postgres so the CMS loads identical data across sessions.
