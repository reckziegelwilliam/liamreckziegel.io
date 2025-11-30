# Environment Variables Setup

## Required Environment Variables

Add these to your `.env` file:

```bash
# Database
POSTGRES_URL=your_postgres_connection_string

# Authentication (NextAuth)
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=https://liamrex.io
GITHUB_CLIENT_ID=your_github_oauth_client_id
GITHUB_CLIENT_SECRET=your_github_oauth_client_secret

# AWS S3 Configuration (for media uploads)
AWS_S3_BUCKET_NAME=your-bucket-name
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
```

## Setup Instructions

### 1. Database (Postgres)
Already configured. No changes needed.

### 2. AWS S3 Setup

1. **Create an S3 Bucket:**
   - Go to AWS Console > S3
   - Create a new bucket with a unique name
   - Enable public access for uploaded files (or use pre-signed URLs)
   - Set up CORS policy if needed

2. **Create IAM User:**
   - Go to AWS Console > IAM
   - Create a new user with programmatic access
   - Attach policy: `AmazonS3FullAccess` (or create a custom policy with `s3:PutObject`, `s3:DeleteObject`, `s3:GetObject`)
   - Save the Access Key ID and Secret Access Key

3. **Configure Bucket Policy (optional for public access):**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

### 3. Install New Dependencies

Run this command to install the AWS SDK packages:

```bash
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

## Testing the Implementation

### Homepage
1. Visit `/` - Should display:
   - Hero section with dual CTAs
   - "What I Do" 3-card section
   - Featured work (first 2 case studies)
   - Recent playbooks (if any published)
   - Final CTA section

### Work Page
2. Visit `/work` - Should display:
   - Page title and description
   - Full timeline component with experience data
   - Search and filter functionality

### Media Upload (AWS S3)
3. Log in to admin (`/dashboard`)
4. Navigate to `/admin/media`
5. Upload an image file
6. Check that:
   - File appears in S3 bucket
   - URL is stored in database
   - File is accessible via the returned URL

### Page View Tracking
4. Visit various pages:
   - Homepage (`/`)
   - Work page (`/work`)
   - Contact page (`/contact`)
   - A playbook post (`/playbooks/[slug]`)
   - A case study (`/case-studies/[slug]`)

5. Check analytics dashboard (`/admin/analytics`):
   - Should show page views incrementing
   - Daily views chart should populate
   - Most viewed posts should appear

## Troubleshooting

### S3 Upload Errors
- **Error: "Missing credentials"**: Ensure all AWS environment variables are set
- **Error: "Access Denied"**: Check IAM user permissions
- **Error: "NoSuchBucket"**: Verify bucket name is correct and matches region

### Analytics Not Tracking
- Check browser console for errors
- Verify `page_views` table exists in database
- Run migration: `psql $POSTGRES_URL < scripts/migrate-admin-features.sql`

### Homepage Not Loading
- Ensure `getPublishedPosts()` function works
- Check that case studies data exists in `app/data/case-studies.ts`
- Verify all imports are correct

## Next Steps After Setup

1. Run `npm install` to install AWS SDK dependencies
2. Add environment variables to `.env` and Vercel
3. Test locally with `npm run dev`
4. Deploy to production with `vercel deploy`
5. Test all features in production
6. Monitor analytics dashboard for tracking data

