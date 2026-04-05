# 1v1 Revision

A gamified revision app where students compete in 1v1 question battles to climb the ranks.

## Target Audience
- GCSE students (UK)
- A-Level students (UK)
- SAT students (US)

## Core Concept
- Students compete in real-time 1v1 question battles
- Elo ranking system (like chess)
- AI opponents at varying difficulty levels
- Subject-specific leaderboards and stats

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Frontend | Next.js + Tailwind CSS + Framer Motion | SSR, fast UI dev, game-like animations |
| Realtime | Socket.io (or Ably/Pusher) | Live 1v1 matchmaking and battles |
| Database | Supabase (Postgres + Auth + Realtime) | Auth, DB, realtime in one service |
| AI | Claude API | Dynamic questions, AI opponents, answer explanations |
| Hosting | Vercel | Pairs with Next.js, free tier for MVP |

## Data Model

- **Users** — elo, rank, streaks, stats
- **Questions** — subject, level (GCSE/A-level/SAT), difficulty, answers
- **Matches** — player1, player2/AI, score, elo change
- **Leaderboards** — global, by subject, by exam board

## Pricing

| Tier | Price | Features |
|------|-------|----------|
| **Free** | £0 | 5 matches/day, limited subjects, basic AI opponent |
| **Pro** | £4.99/mo | Unlimited matches, all subjects, harder AI, detailed stats |
| **School** | £2/student/mo (bulk) | Admin dashboard, class leaderboards, teacher analytics |

### Additional Revenue
- **Exam season pass:** £9.99 for 3 months (targets cramming season)
- **Cosmetics:** Profile borders, titles (e.g. "Physics God") — small microtransactions
- **Seasonal ranked ladders** with rewards
