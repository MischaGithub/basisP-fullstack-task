# PingChain

A simple app where you can share your location (“ping”) and see others’ pings. Built with Next.js, TypeScript, Prisma, and PostgreSQL — plus Sentry for error logging.

---

## What it does

- Sign up / log in with email & password
- Send your current location (“ping”)
- See recent pings from everyone
- Keep track of all pings
- Error tracking with Sentry
- Uses JWT tokens for authentication

---

## Tech stuff

- Next.js 14 with the App Router
- TypeScript & TailwindCSS for styling
- Prisma ORM with Neon-hosted PostgreSQL
- Auth with JWT + bcrypt password hashing
- Sentry for logging errors

---

## How to run it on your machine

1. **Clone the repo**

```bash
git clone https://github.com/MischaGithub/basisP-fullstack-task
cd jamesbond-task
```

2. **Install the dependencies**

```bash
npm install
```

3. **Set up your database**

- Create a free account at [Neon](https://neon.tech)
- Make a new PostgreSQL project
- Copy the database URL (it starts with `postgres://...`)

4. **Set up your environment variables**

Make a copy of `.env.example` and rename it to `.env`

```bash
cp .env.example .env
```

Open `.env` and add these:

```
DATABASE_URL=your_neon_db_url_here
SENTRY_DSN=your_sentry_dsn_here
AUTH_SECRET=your_jwt_secret_here
```

- For **SENTRY_DSN**, get it from your Sentry project settings at [sentry.io](https://sentry.io)
- For **AUTH_SECRET**, use a strong random string (you can generate one with a password manager or command line)

5. **Generate Prisma client & run migrations**

```bash
npx prisma generate
npx prisma migrate dev --name init
```

6. **Start the app**

```bash
npm run dev
```

Open your browser at [http://localhost:3000](http://localhost:3000) and you’re good to go!

---

## Need help?

- Check your `.env` variables carefully
- Make sure your database URL is correct
- Check Sentry & JWT keys are set
- Run Prisma migrate to update your database schema
