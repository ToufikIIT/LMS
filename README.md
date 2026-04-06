# Converso - Real-Time AI Learning Platform

Converso is a voice-first learning platform where learners can create custom AI teaching companions, start real-time tutoring sessions, and track their progress over time.

The project is built with Next.js App Router, Clerk authentication and subscriptions, Supabase data storage, and Vapi voice calls.

## What You Can Do

- Sign in and manage sessions securely with Clerk.
- Create personalized teaching companions by selecting:
	- Name
	- Subject
	- Topic
	- Voice (male or female)
	- Conversation style (formal or casual)
	- Session duration
- Browse the Companions Library and filter by subject or topic.
- Start live voice tutoring sessions with transcript updates.
- Track completed lessons and companion usage in My Journey.
- Enforce companion creation limits by subscription plan.

## Core Features

- Real-time voice tutoring with Vapi and ElevenLabs voices.
- AI tutor behavior configured dynamically per session (subject, topic, style).
- Session history tracking linked to each user.
- Plan-aware companion creation limits:
	- Feature flag: 3 active companions
	- Feature flag: 10 active companions
	- Pro plan: unlimited (based on current permission logic)
- Responsive dashboard with companion cards and recent activity.

## Tech Stack

- Framework: Next.js 15 (App Router, React Server Components)
- Language: TypeScript
- Styling: Tailwind CSS 4
- Auth and billing UI: Clerk
- Database: Supabase
- Voice runtime: Vapi Web SDK
- Forms and validation: React Hook Form + Zod
- UI primitives: Radix UI

## Project Structure

```text
app/
	page.tsx                # Dashboard
	companions/
		page.tsx              # Companions library
		new/page.tsx          # Companion builder
		[id]/page.tsx         # Live companion session
	my-journey/page.tsx     # User stats and history
	subscription/page.tsx   # Clerk pricing table

components/
	CompanionForm.tsx
	CompanionComponent.tsx
	CompanionCard.tsx
	CompanionsList.tsx
	Navbar.tsx

lib/
	actions/companion.action.ts   # Server actions and Supabase queries
	supabase.ts                   # Supabase client factory
	vapi.sdk.ts                   # Vapi client setup
	utils.ts                      # Helper functions + assistant config
```

## Environment Variables

Create a `.env.local` file in the project root and set the following values:

```bash
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Vapi
NEXT_PUBLIC_VAPI_WEB_TOKEN=
```

### Important setup notes

- Supabase requests are made with `auth().getToken()` from Clerk. Ensure your Clerk to Supabase JWT integration is configured for authenticated row-level access if your policies require it.
- Companion limits depend on Clerk plan and feature flags used in server actions:
	- `pro` plan
	- `3_active_companions` feature
	- `10_active_companions` feature

## Database Expectations

The current server actions expect two Supabase tables:

### `companions`

- `id` (primary key)
- `author` (Clerk user id)
- `name`
- `subject`
- `topic`
- `voice`
- `style`
- `duration`
- `created_at` (recommended)

### `sessions_history`

- `id` (primary key)
- `companion_id` (foreign key to `companions.id`)
- `user_id` (Clerk user id)
- `created_at` (recommended)

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables in `.env.local`.

3. Start the development server:

```bash
npm run dev
```

4. Open http://localhost:3000.

## Available Scripts

```bash
npm run dev      # Start dev server (Turbopack)
npm run build    # Production build (Turbopack)
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Route Overview

- `/` - Dashboard with user companions and recent sessions
- `/companions` - Browse and filter all companions
- `/companions/new` - Build a new companion (plan-limited)
- `/companions/[id]` - Voice tutoring session page
- `/my-journey` - User profile, stats, and recent activity
- `/subscription` - Subscription upgrade screen
- `/sign-in/[[...sign-in]]` - Clerk sign-in flow

## Deployment

This app deploys well on Vercel.

Before deploying, confirm:

- All required environment variables are set in the deployment environment.
- Clerk production instance and redirect URLs are configured.
- Supabase database schema and policies are in place.
- Voice runtime credentials (Vapi token) are available.

## Notes

- `next.config.ts` currently ignores TypeScript and ESLint build errors. This helps unblock deployments but can hide issues if not monitored.

