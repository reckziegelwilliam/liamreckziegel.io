# Deployment Fix - Database Setup

## Current Status

✅ **Fixed:** Build errors for opengraph-image runtime and Suspense boundary  
✅ **Fixed:** Playbooks pages now use dynamic rendering instead of static generation  
⚠️ **Needs Setup:** Production database tables don't exist yet

## Why the Build Failed

The playbooks pages were trying to statically generate at build time by querying the `posts` table, but this table doesn't exist in your production database yet. I've temporarily disabled static generation for these pages so your site can deploy.

## Quick Fix Applied

Changed both playbooks pages to use `dynamic = 'force-dynamic'` which means:
- `/playbooks` and `/playbooks/[slug]` will render dynamically on each request
- No database calls during build time
- Site will deploy successfully

## Next Steps - Set Up Your Database

### Option 1: Using Vercel Postgres Dashboard

1. Go to your Vercel project dashboard
2. Navigate to the "Storage" tab
3. Find your Postgres database
4. Click "Query" or "Connect"
5. Run the SQL from `scripts/migrate-blog.sql`

### Option 2: Using psql Command Line

```bash
# Connect to your production database
psql "your-postgres-connection-string"

# Run the migration
\i scripts/migrate-blog.sql

# Verify tables were created
\dt
```

### Option 3: Using a Database Client (TablePlus, DBeaver, etc.)

1. Connect to your production Postgres database
2. Open and run `scripts/migrate-blog.sql`
3. Verify the tables: `posts`, `post_tags`, `contact_submissions`

## After Database Setup

Once you've run the migrations, you can:

1. **Re-enable static generation** (optional, for better performance):
   - Remove `export const dynamic = 'force-dynamic';` from:
     - `app/playbooks/page.tsx`
     - `app/playbooks/[slug]/page.tsx`
   - Uncomment the `generateStaticParams()` function in `app/playbooks/[slug]/page.tsx`

2. **Add your first playbook** via the admin panel:
   - Go to `/admin` (requires authentication)
   - Navigate to "Blog/Playbooks"
   - Create a new post with `type = 'playbook'`
   - Set status to "published"

## Files Changed

- `app/playbooks/[slug]/opengraph-image.tsx` - Changed runtime from edge to nodejs
- `app/blog/[slug]/opengraph-image.tsx` - Changed runtime from edge to nodejs
- `app/case-studies/[slug]/opengraph-image.tsx` - Changed runtime from edge to nodejs
- `app/contact/page.tsx` - Wrapped useSearchParams in Suspense
- `app/types/skill.ts` - Created missing SocialLink type
- `app/playbooks/page.tsx` - Added dynamic rendering
- `app/playbooks/[slug]/page.tsx` - Added dynamic rendering, disabled static generation

## Current Deployment

Your site should now deploy successfully with:
- ✅ All pages building correctly
- ✅ No webpack errors
- ✅ No database errors during build
- ⚠️ Playbooks will be empty until database is set up

The playbooks functionality will work once you run the database migrations!

