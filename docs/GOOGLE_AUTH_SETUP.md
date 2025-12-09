# Google Authentication Setup Guide

## Quick Start

Google authentication has been added to your site with email restriction. Only the email address you specify in `ALLOWED_EMAIL` will be able to sign in.

## Required Environment Variables

Add these three new variables to your `.env` file:

```bash
AUTH_GOOGLE_ID=your_google_oauth_client_id
AUTH_GOOGLE_SECRET=your_google_oauth_client_secret
ALLOWED_EMAIL=your.email@gmail.com
```

## Step-by-Step Setup

### 1. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google+ API"
   - Click "Enable"

### 2. Create OAuth 2.0 Client

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. If prompted, configure the OAuth consent screen first:
   - Choose "External" user type
   - Fill in app name, user support email, and developer contact
   - Add your email to test users
   - Save and continue
4. Back on the credentials page, create the OAuth client ID:
   - Application type: "Web application"
   - Name: "liamreckziegel.io" (or any name you prefer)

### 3. Configure Authorized URLs

**Authorized JavaScript origins:**
- `http://localhost:3000` (for local development)
- `https://liamrex.io` (your production domain)

**Authorized redirect URIs:**
- `http://localhost:3000/api/auth/callback/google`
- `https://liamrex.io/api/auth/callback/google`

### 4. Copy Credentials

After creating the OAuth client:
1. Copy the **Client ID** → Add to `AUTH_GOOGLE_ID`
2. Copy the **Client Secret** → Add to `AUTH_GOOGLE_SECRET`
3. Set your email address in `ALLOWED_EMAIL`

### 5. Update Vercel Environment Variables

If deploying to Vercel, add these variables:
1. Go to your Vercel project settings
2. Navigate to "Environment Variables"
3. Add:
   - `AUTH_GOOGLE_ID`
   - `AUTH_GOOGLE_SECRET`
   - `ALLOWED_EMAIL`

## Testing

### Local Testing
1. Run `npm run dev`
2. Navigate to your sign-in page
3. You should now see both GitHub and Google sign-in options
4. Try signing in with your Google account (the one matching `ALLOWED_EMAIL`)
5. Try signing in with a different Google account - it should be denied

### Production Testing
1. Deploy to Vercel with the new environment variables
2. Test both authentication methods
3. Verify email restriction is working

## How It Works

### Email Restriction & Admin Access
The `signIn` callback in `app/auth.ts` checks every sign-in attempt:
- Compares the email from the authentication provider with `ALLOWED_EMAIL`
- Only allows sign-in if emails match (case-insensitive)
- Works for both GitHub and Google authentication
- **Once authenticated, users automatically have full admin access** - no additional role checks

### Provider-Specific Handling
The `jwt` callback handles different data structures:
- **GitHub**: Uses `login` as fallback for name, `avatar_url` for picture
- **Google**: Uses standard `name` and `picture` fields

### Single Source of Truth
Authorization is handled entirely in the `signIn` callback using `ALLOWED_EMAIL`. There are no additional permission checks in admin pages or actions - if you can sign in, you have admin access.

## Security Notes

1. **Email restriction is enforced at sign-in** - unauthorized users cannot create sessions
2. **Both providers work with the same restriction** - any provider must match `ALLOWED_EMAIL`
3. **Case-insensitive matching** - `Your.Email@gmail.com` matches `your.email@gmail.com`
4. **Failed attempts are logged** - Check server logs for unauthorized access attempts

## Troubleshooting

### "Access Denied" Error
- Verify `ALLOWED_EMAIL` is set correctly
- Check that the email matches exactly (ignoring case)
- Look at server logs for which email was rejected

### "Redirect URI Mismatch" Error
- Ensure redirect URIs in Google Console match exactly
- Include `/api/auth/callback/google` path
- Check protocol (http vs https)

### Google Sign-In Button Not Appearing
- Verify `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET` are set
- Restart your development server after adding variables
- Check browser console for errors

## Multiple Allowed Emails (Optional)

If you want to allow multiple emails in the future, modify the `signIn` callback in `app/auth.ts`:

```typescript
async signIn({ user, account, profile }) {
  // Allow multiple emails
  const allowedEmails = process.env.ALLOWED_EMAILS?.split(',') || [];
  
  const email = user?.email || profile?.email;
  
  if (email && allowedEmails.some(allowed => 
    email.toLowerCase() === allowed.toLowerCase().trim()
  )) {
    return true;
  }
  
  return false;
}
```

Then use: `ALLOWED_EMAILS=email1@gmail.com,email2@gmail.com`

