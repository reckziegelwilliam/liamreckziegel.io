-- Seed script for example playbook posts
-- Run this after the main migration to populate your blog with starter content

-- Post 1: How to Rescue a Failing App in 90 Days
INSERT INTO posts (slug, title, subtitle, summary, content, type, status, reading_time_minutes, published_at)
VALUES (
  'how-to-rescue-failing-app-90-days',
  'How to Rescue a Failing App in 90 Days',
  'A step-by-step framework for diagnosing, fixing, and shipping broken software',
  'When an app is crashing in production, you don't have time for a six-month rewrite. Here's the exact process I use to rescue failing apps and get them stable in under 90 days.',
  '# How to Rescue a Failing App in 90 Days

I've rebuilt three failing apps in the last two years. Each time, the pattern was the same: the app worked at one point, but now it's crashing, users are leaving, and the team is panicking.

Here's the framework I use to rescue failing apps and get them stable fast.

## Step 1: Triage (Week 1)

Before you write any code, understand what's actually broken. Not what people think is broken—what's actually broken.

### Install observability first

- Add Sentry or similar error tracking
- Set up basic logging (Datadog, Grafana, or CloudWatch)
- Track key user flows with analytics

**Why this matters:** You can't fix what you can't see. Most teams skip this because they want to "just fix it," but you'll waste weeks chasing phantom bugs.

### Interview users (if you can)

- What were they doing when it crashed?
- How often does it happen?
- Can they reproduce it?

### Create a triage board

I use a simple Notion or Linear board with three columns:
- **Critical** (app-breaking, affects all users)
- **High** (affects core features, some users)
- **Low** (nice to have, edge cases)

## Step 2: Stabilize (Weeks 2-4)

Focus 100% on stability. No new features. No refactors (yet). Just make it not crash.

### Fix critical bugs first

Start with the crashes that happen most frequently. Use your observability data to prioritize.

### Add guardrails

- Input validation everywhere
- Error boundaries in React
- Retry logic for network requests
- Fallback UI for failed states

### Test on real devices

If it's a mobile app, test on actual phones. Simulators lie.

## Step 3: Rebuild Core Flows (Weeks 5-8)

Once the app is stable, identify the 3-5 core user flows and rebuild them properly.

### Pick your battles

Don't rebuild everything. Focus on:
- Signup/login
- Main value-add feature
- Payment (if applicable)

### Use modern patterns

- TypeScript (if it's not already)
- Proper state management (Zustand, Jotai, Redux)
- Component library (Shadcn, Ant Design, etc.)

## Step 4: Ship and Monitor (Weeks 9-12)

Get it to users ASAP and watch what happens.

### Ship incrementally

Don't wait for perfection. Ship weekly (or daily) and iterate.

### Monitor everything

- Error rates
- Crash-free sessions
- Key metric trends (DAU, retention, etc.)

### Communicate progress

Show the team (and stakeholders) that things are getting better. Screenshots of graphs going in the right direction are powerful.

## Real Example: TOUT

When I joined TOUT, the React Native app crashed constantly. Here's what I did:

**Week 1:** Added Sentry, Grafana, and basic logging. Discovered 90% of crashes were from two issues: a memory leak in navigation and a broken API call.

**Weeks 2-4:** Fixed the memory leak, added error boundaries, and rewrote the broken API logic. Crash rate dropped 60%.

**Weeks 5-8:** Rebuilt signup flow with OTP verification and redesigned the main feed with proper state management.

**Weeks 9-12:** Shipped alpha to 10 users. Zero crashes in the first week.

## Common Mistakes

### Mistake 1: Trying to rewrite everything

You don't have time. Focus on stability first, then the core flows.

### Mistake 2: Skipping observability

"We'll add it later" = you'll never add it. Do it first.

### Mistake 3: Working in isolation

Show progress weekly. Even small wins matter.

## Conclusion

Rescuing a failing app is about focus: stability → core flows → ship. If you try to do everything at once, you'll ship nothing.

Have a failing app you need to rescue? [Let's talk](/contact?type=hire).',
  'playbook',
  'published',
  8,
  NOW()
);

-- Tags for Post 1
INSERT INTO post_tags (post_id, tag)
VALUES 
  ((SELECT id FROM posts WHERE slug = 'how-to-rescue-failing-app-90-days'), 'rescue'),
  ((SELECT id FROM posts WHERE slug = 'how-to-rescue-failing-app-90-days'), 'debugging'),
  ((SELECT id FROM posts WHERE slug = 'how-to-rescue-failing-app-90-days'), 'process');

-- Post 2: The Founding Engineer's Stack (2025)
INSERT INTO posts (slug, title, subtitle, summary, content, type, status, reading_time_minutes, published_at)
VALUES (
  'founding-engineer-stack-2025',
  'The Founding Engineer''s Stack (2025)',
  'Tools and frameworks I use to ship fast without sacrificing quality',
  'After building products at 4 startups, here's the tech stack I reach for when speed and reliability both matter.',
  '# The Founding Engineer''s Stack (2025)

Every startup wants to move fast. But moving fast on a shaky foundation means you'll be rewriting everything in 6 months.

Here's the stack I use to ship quickly while keeping things maintainable.

## Frontend

### Web: Next.js

**Why:** Server components, great DX, Vercel makes deployment trivial.

**When not to:** If you need more control over rendering or don't need SSR, consider Vite + React.

### Mobile: React Native (Expo)

**Why:** Write once, ship iOS and Android. Expo makes it painless.

**When not to:** If you need heavy native integrations, go native.

### UI Components: Shadcn + Tailwind

**Why:** Copy-paste components, full control, looks good by default.

**Alternatives:** Radix UI, Ant Design, or build from scratch if you have time (you don't).

## Backend

### Node.js (TypeScript)

**Why:** Shared types with frontend, huge ecosystem, fast enough for most things.

**When not to:** If you need performance-critical operations, consider Go or Rust.

### Python (FastAPI)

**Why:** Great for ML/AI integrations, fast to write, good enough performance.

**When not to:** If you're building real-time features, Node or Go is better.

## Database

### Postgres (via Vercel Postgres or Supabase)

**Why:** Reliable, feature-rich, scales well, hosted options are cheap.

**When to add Redis:** Caching, rate limiting, session storage.

**When to use NoSQL:** If you truly have unstructured data (rare).

## Authentication

### NextAuth.js or Clerk

**Why:** Don't build auth from scratch. It's a time sink.

**NextAuth:** Free, open source, good enough.
**Clerk:** Paid, but amazing UX and admin dashboard.

## Deployment

### Vercel (frontend)

**Why:** Zero config, preview deployments, fast.

**Alternative:** Railway, Netlify, or Fly.io.

### AWS Lambda (backend)

**Why:** Serverless scales to zero (cheap), scales to millions (when needed).

**When not to:** If you have long-running tasks or need WebSockets, use a regular server.

## Observability

### Sentry

**Why:** Error tracking that actually works, easy to set up.

### Vercel Analytics or Posthog

**Why:** Know what users are doing without privacy nightmares.

## The Anti-Stack

Here's what I actively avoid:

- ❌ **Microservices** (unless you have 20+ engineers)
- ❌ **Kubernetes** (unless AWS Lambda can't handle it)
- ❌ **GraphQL** (unless you have multiple clients with different data needs)
- ❌ **Building your own CI/CD** (use GitHub Actions or Vercel)

## Real Example: HELPAR

At HELPAR, we migrated from CRA to Next.js Turbo + AWS Lambda.

- **Frontend:** Next.js 14, Shadcn, Tailwind
- **Backend:** Node.js Lambda functions
- **Database:** Postgres (RDS) + Redis (ElastiCache)
- **Deployment:** Vercel + AWS CDK

Result: 60% faster deploys, 1000+ concurrent users, zero downtime.

## Conclusion

The best stack is the one you can ship with. Pick boring, proven technologies and spend your time building features, not fighting tools.

Working on a startup and need help choosing your stack? [Let's chat](/contact?type=hire).',
  'playbook',
  'published',
  6,
  NOW() - INTERVAL ''1 day''
);

-- Tags for Post 2
INSERT INTO post_tags (post_id, tag)
VALUES 
  ((SELECT id FROM posts WHERE slug = 'founding-engineer-stack-2025'), 'stack'),
  ((SELECT id FROM posts WHERE slug = 'founding-engineer-stack-2025'), 'tools'),
  ((SELECT id FROM posts WHERE slug = 'founding-engineer-stack-2025'), 'architecture');

-- Post 3: Building in Public as a Studio Owner
INSERT INTO posts (slug, title, subtitle, summary, content, type, status, reading_time_minutes, published_at)
VALUES (
  'building-in-public-studio-owner',
  'Building in Public as a Studio Owner',
  'Lessons from running Lumenaut for 7 years',
  'How I built a sustainable studio practice that lets me work on founding engineer roles while serving clients.',
  '# Building in Public as a Studio Owner

I've been running Lumenaut (my studio) since 2018. It's not a traditional agency—it's just me, occasional contractors, and a process that lets me take on both studio work and founding engineer roles.

Here's what I've learned.

## Why Lumenaut Exists

There's a gap between freelance and agency. Freelancers are cheap but unreliable. Agencies are reliable but expensive and slow.

Lumenaut fills that gap: fast, focused, and flexible.

## The Studio Model

### What I do

- Websites for creators and small businesses
- MVPs for early-stage startups
- CMS/CRM extensions and integrations

### What I don't do

- Long-term retainers (unless it's ongoing feature work)
- Projects requiring multiple full-time engineers
- Enterprise sales cycles

### Pricing

I charge by the project, not by the hour. Most sites are $5k-15k. Most apps are $15k-50k.

Why fixed pricing? It aligns incentives. I'm motivated to work fast, and clients know exactly what they're paying.

## How I Balance Studio + Founding Engineer Work

The trick is async communication and clear boundaries.

### Studio work is async

- Clients communicate via Loom or email
- No meetings unless absolutely necessary
- Weekly updates, not daily check-ins

### Founding engineer work is sync

- I block 9-5 (or whatever the core hours are) for real-time collaboration
- Studio work happens early mornings, evenings, or weekends

### I'm honest about availability

If I'm on a founding engineer engagement, I tell studio clients upfront: "I can take your project, but it'll take 4-6 weeks instead of 2-3."

Most are fine with that.

## Tools I Use

- **Figma:** Design and client collaboration
- **Linear:** Project management
- **Loom:** Async video updates
- **Stripe:** Payments
- **Notion:** Client docs and SOPs

## Lessons Learned

### Lesson 1: Say no a lot

I turn down 80% of inquiries. If it's not a good fit, it's not worth my time.

### Lesson 2: Build reusable systems

I have template Figma files, Next.js starters, and a component library I reuse across projects.

### Lesson 3: Charge more than you think

When I started, I charged $2k for a website. Now I charge $8k-12k. Same work, better clients.

## Conclusion

Running a studio isn't about scaling to 10 employees. It's about building a sustainable practice that gives you freedom.

Want to work with Lumenaut? [Get in touch](/contact?type=studio).',
  'note',
  'published',
  5,
  NOW() - INTERVAL ''2 days''
);

-- Tags for Post 3
INSERT INTO post_tags (post_id, tag)
VALUES 
  ((SELECT id FROM posts WHERE slug = 'building-in-public-studio-owner'), 'business'),
  ((SELECT id FROM posts WHERE slug = 'building-in-public-studio-owner'), 'studio'),
  ((SELECT id FROM posts WHERE slug = 'building-in-public-studio-owner'), 'process');

