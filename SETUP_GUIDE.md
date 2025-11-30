# Portfolio Reinvention - Setup Guide

## 🎉 Congratulations!

Your portfolio has been completely rebuilt with a modern tech stack, new positioning, and conversion-focused design.

## ✅ What's Been Built

### V1 Foundation (Complete)
- ✅ New color palette (space theme with cyan/amber accents)
- ✅ Wider layout (max-w-6xl)
- ✅ Updated hero with clear CTAs
- ✅ Narrative experience descriptions
- ✅ Full blog/playbooks system with admin UI
- ✅ Contact intake form with DB storage
- ✅ Homepage restructure with featured work

### V2 Content & Polish (Complete)
- ✅ 3 detailed case studies (TOUT, HELPAR, Lumenaut)
- ✅ Case study index and detail pages
- ✅ 3 example playbook posts with full content
- ✅ Simplified timeline animations
- ✅ SEO metadata and structured data
- ✅ Asset guidelines for screenshots/diagrams

## 🚀 Next Steps to Launch

### 1. Database Setup (Required)

**Run the migrations:**
```bash
cd /Users/liamreckziegel/Desktop/liamreckziegel.io
# If using Vercel Postgres:
psql $POSTGRES_URL -f scripts/migrate-blog.sql
psql $POSTGRES_URL -f scripts/seed-posts.sql

# Or using local Postgres:
psql -d your_database -f scripts/migrate-blog.sql
psql -d your_database -f scripts/seed-posts.sql
```

**Verify tables were created:**
- `posts`
- `post_tags`
- `contact_submissions`

### 2. Test the Site

```bash
npm run dev
# or
bun dev
```

**Test these pages:**
- `/` - Homepage with new hero and CTAs
- `/playbooks` - Blog list (should show 3 seeded posts)
- `/playbooks/how-to-rescue-failing-app-90-days` - Individual post
- `/case-studies` - Case study index
- `/case-studies/tout-technologies` - Individual case study
- `/contact` - Contact form (try both hire and studio options)
- `/dashboard` - Admin dashboard (requires auth)
- `/blog` - Admin blog manager (requires auth)
- `/contact` - Admin contact submissions (requires auth)
- `/work` - Timeline with updated styles

### 3. Authentication Setup

The admin routes (`/dashboard`, `/blog`, `/contact`) are protected by a centralized authentication system with role-based permissions.

**Update admin users in `app/lib/permissions.ts`:**
```typescript
const ADMIN_USERS: AdminUser[] = [
  { 
    email: 'your-actual-email@gmail.com', 
    role: 'admin',
    name: 'Your Name'
  },
  // Add more admins or editors:
  // { email: 'editor@example.com', role: 'editor', name: 'Editor Name' },
];
```

**Role Levels:**
- `admin` - Full access (create, edit, delete, publish, view all)
- `editor` - Can create, edit, and publish content
- `viewer` - Can only view admin areas

**Admin Routes:**
- `/dashboard` - Overview with stats and recent activity
- `/blog` - Manage blog posts (list, create, edit, delete)
- `/blog/new` - Create new post
- `/blog/[id]` - Edit existing post
- `/contact` - View contact form submissions
- `/analytics` - (Future) Site analytics
- `/media` - (Future) Media library
- `/settings` - (Future) Site settings

### 4. Content Customization

#### Add Your Avatar
Replace `/Users/liamreckziegel/Desktop/liamreckziegel.io/app/avatar.jpg` with your actual photo.

#### Create Visual Assets (Optional)
Follow the guide in `/public/case-studies/README.md` to create:
- Architecture diagrams (use Excalidraw or Figma)
- Screenshots (browser dev tools at 2x resolution)
- Before/after comparisons

#### Write More Playbooks
Use the admin UI at `/blog` to create new posts. The 3 seeded posts are great examples to follow.

### 5. Deploy to Production

**Vercel (Recommended):**
```bash
vercel deploy
```

**Environment Variables:**
Ensure these are set in Vercel:
- `POSTGRES_URL` - Your database connection string
- `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`
- `NEXTAUTH_URL` - Your production URL
- `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` (for OAuth)

### 6. Post-Launch Checklist

- [ ] Update email in `app/lib/permissions.ts` to your actual email
- [ ] Replace avatar.jpg with your photo
- [ ] Test contact form submissions
- [ ] Verify blog posts are visible
- [ ] Check all navigation links work
- [ ] Test mobile responsive design
- [ ] Set up email notifications for contact submissions
- [ ] Add Google Analytics or Vercel Analytics (already configured)
- [ ] Submit sitemap to Google Search Console

## 📊 Success Metrics

Track these to measure impact:
- **Engagement:** Time on site, pages per session, bounce rate
- **Conversion:** Contact form submissions, GitHub clicks
- **Content:** Blog post views, case study read-through rate
- **Technical:** Lighthouse score (aim for 90+)

## 🎨 Customization Guide

### Colors
Update in `app/global.css`:
- Base background: `#0A0E1A`
- Elevated surfaces: `#1A1F35`
- Accent cyan: `#00D9FF`
- Accent amber: `#FFB84D`

### Typography
Geist Sans is already configured. To change:
```typescript
// app/layout.tsx
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
```

### Navigation
Update in `app/components/nav.tsx`:
```typescript
const navItems = {
  '/': { name: 'home' },
  '/case-studies': { name: 'case studies' },
  // ... add more
};
```

## 📁 Key Files Reference

### Data Files
- `app/data/hero.ts` - Hero section content
- `app/data/experience.ts` - Work experience
- `app/data/case-studies.ts` - Case study content

### Components
- `app/components/home/hero.tsx` - Homepage hero
- `app/components/home/what-i-do.tsx` - Services section
- `app/components/ui/cta-button.tsx` - Call-to-action buttons

### Database
- `app/db/posts.ts` - Blog CRUD operations
- `app/db/contact.ts` - Contact form operations

### Admin System
- `app/(admin)/layout.tsx` - Admin layout with centralized auth
- `app/(admin)/dashboard/page.tsx` - Admin dashboard
- `app/(admin)/blog/page.tsx` - Blog management
- `app/(admin)/contact/page.tsx` - Contact submissions
- `app/(admin)/components/admin-nav.tsx` - Admin sidebar navigation
- `app/lib/permissions.ts` - Role-based access control
- `app/actions/posts.ts` - Server actions for blog posts
- `app/components/markdown-editor.tsx` - MDX editor component

### Pages
- `app/page.tsx` - Homepage
- `app/playbooks/page.tsx` - Blog index
- `app/playbooks/[slug]/page.tsx` - Individual post
- `app/case-studies/page.tsx` - Case study index
- `app/case-studies/[slug]/page.tsx` - Individual case study
- `app/contact/page.tsx` - Contact form

## 🐛 Troubleshooting

### "Database not configured" error
- Ensure `POSTGRES_URL` is set in your environment
- Run migrations: `psql $POSTGRES_URL -f scripts/migrate-blog.sql`

### Admin pages redirect to home
- Check `app/lib/permissions.ts` - ensure your email is in `ADMIN_USERS`
- Ensure you're logged in with GitHub OAuth
- Verify your email matches one in the permissions list
- Check browser console for auth errors

### Blog posts don't show up
- Run seed script: `psql $POSTGRES_URL -f scripts/seed-posts.sql`
- Check post status is 'published' in database
- Verify `published_at` is set

### Styles look broken
- Run `npm install` to ensure all dependencies are installed
- Clear `.next` cache: `rm -rf .next`
- Restart dev server

## 📞 Support

If you hit any issues:
1. Check the console for error messages
2. Verify database connection and migrations
3. Ensure all environment variables are set
4. Clear cache and restart dev server

## 🎯 What's Next?

After launch, consider:
- Writing 5-10 more playbook posts
- Creating architecture diagrams for case studies
- Adding testimonials from colleagues/clients
- Building an email newsletter signup
- Creating video demos for case studies
- Adding more case studies as you complete projects

---

**You're ready to launch! 🚀**

The foundation is solid. Now it's about filling in content and getting it in front of people.

