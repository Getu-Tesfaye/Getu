# Addis Eats

Ethiopian food delivery app built with Next.js and Supabase.

Live site: https://YOUR-LIVE-URL.vercel.app

## Features

- Menu with search, categories and paging
- Customer sign up, sign in, cart and checkout
- My Orders, live delivery tracking with a map, and CSV export
- Admin panel with a dashboard of charts and an orders table
- Works with a keyboard and on a phone

## Run it from a fresh clone

1. `git clone YOUR-REPO-URL`
2. `cd` into the project folder
3. `npm install`
4. `copy .env.example .env.local`
5. Open `.env.local` and fill in every value
6. `npm run dev`
7. Open http://localhost:3000

## Environment variables

- `NEXT_PUBLIC_SUPABASE_URL`: your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: your Supabase publishable key
- `SUPABASE_SECRET_KEY`: Supabase secret key, server only
- `ADMIN_USERNAME`: admin login name
- `ADMIN_PASSWORD`: admin login password
- `ADMIN_SESSION_SECRET`: long random text for the admin cookie
- `NEXT_PUBLIC_SITE_URL`: the site address

## Deploy

Deployed on Vercel. Set every variable in Project Settings, then Environment Variables.