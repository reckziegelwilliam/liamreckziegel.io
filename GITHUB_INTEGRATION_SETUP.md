# GitHub Integration Setup Guide

This guide will help you set up the GitHub integration for your portfolio, including automatic updates via webhooks.

---

## 📋 Prerequisites

- GitHub account
- Vercel account (for deployment)
- Basic understanding of environment variables

---

## 🔑 Step 1: Create GitHub Personal Access Token

1. Go to [GitHub Settings → Developer Settings → Personal Access Tokens → Tokens (classic)](https://github.com/settings/tokens)

2. Click "Generate new token" → "Generate new token (classic)"

3. Give it a descriptive name: `Portfolio Integration`

4. Set expiration: `No expiration` (or your preference)

5. Select scopes:
   - ✅ `public_repo` - Access public repositories
   - ✅ `read:user` - Read user profile data
   - ✅ `read:org` - Read organization data (optional)

6. Click "Generate token"

7. **COPY THE TOKEN IMMEDIATELY** - you won't see it again!

8. Add to `.env.local`:
   ```bash
   GITHUB_TOKEN=ghp_your_token_here
   ```

---

## 🤖 Step 2: Create GitHub App (for Webhooks)

### Create the App

1. Go to [GitHub Settings → Developer Settings → GitHub Apps](https://github.com/settings/apps)

2. Click "New GitHub App"

3. Fill in the form:
   ```
   GitHub App name: Portfolio Auto-Update
   Homepage URL: https://yoursite.com
   Webhook URL: https://yoursite.com/api/github/webhook
   Webhook secret: (generate a random 32+ character string)
   ```

### Generate Webhook Secret

```bash
# Generate a secure random string
openssl rand -hex 32
```

Copy this value and use it for:
- GitHub App webhook secret field
- `.env.local` as `GITHUB_WEBHOOK_SECRET`

### Set Permissions

**Repository permissions:**
- Contents: `Read-only`
- Metadata: `Read-only`

**Account permissions:**
- Starring: `Read-only`
- Watching: `Read-only`

### Subscribe to Events

Select these events to trigger webhooks:
- ✅ Push
- ✅ Star
- ✅ Fork
- ✅ Repository
- ✅ Release
- ✅ Public
- ✅ Issues
- ✅ Issue comment
- ✅ Pull request
- ✅ Pull request review
- ✅ Watch

### Install the App

1. After creating, click "Install App"
2. Select your personal account
3. Choose "All repositories" or select specific ones
4. Click "Install"

---

## 🔒 Step 3: Set Up Environment Variables

Create a `.env.local` file in your project root:

```bash
# GitHub Personal Access Token
GITHUB_TOKEN=ghp_your_github_personal_access_token

# GitHub Webhook Secret (from Step 2)
GITHUB_WEBHOOK_SECRET=your_32_character_random_string

# Vercel Cron Secret (generate another random string)
CRON_SECRET=another_32_character_random_string
```

### Generate Cron Secret

```bash
# Generate another secure random string
openssl rand -hex 32
```

---

## 🚀 Step 4: Deploy to Vercel

### Deploy Your Site

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Deploy
vercel
```

### Add Environment Variables to Vercel

1. Go to your project on [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to **Settings → Environment Variables**
3. Add each variable:
   - `GITHUB_TOKEN`
   - `GITHUB_WEBHOOK_SECRET`
   - `CRON_SECRET`

4. Make sure to add them for:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

### Redeploy

```bash
vercel --prod
```

---

## ✅ Step 5: Verify Webhook is Working

### Test the Webhook Endpoint

```bash
# Visit your webhook endpoint
curl https://yoursite.com/api/github/webhook
```

You should see:
```json
{
  "status": "GitHub webhook endpoint active",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Trigger a Test Event

1. Go to your GitHub App settings
2. Click "Advanced" tab
3. Find "Recent Deliveries"
4. Click "Redeliver" on the ping event

You should see:
- ✅ Green checkmark (200 response)
- Response body showing `{ "message": "pong" }`

### Check Vercel Logs

1. Go to Vercel Dashboard → Your Project → Deployments
2. Click on your latest deployment
3. Click "Functions" tab
4. Look for `/api/github/webhook` logs
5. You should see: `🏓 Webhook ping received`

---

## 🔄 Step 6: Verify Automatic Updates

### Push Code to Test

1. Make any change to one of your GitHub repos
2. Push to main branch
3. Check Vercel logs for webhook activity

You should see:
```
📬 GitHub webhook received: push
✅ Push event to repo-name
```

### Check Your Portfolio

1. Visit your portfolio
2. The GitHub stats should reflect the latest activity
3. If cached, wait up to 30 minutes for Cron backup sync

---

## 📊 How It Works

### Update Flow

```
┌─────────────────────────────────────┐
│  You push code to GitHub            │
└────────────┬────────────────────────┘
             │
             ├─ GitHub App webhook fires (instant)
             │  └─> Portfolio updates in ~2 seconds
             │
             ├─ Vercel Cron runs (every 30 min)
             │  └─> Backup sync in case webhook fails
             │
             └─ Visitor views portfolio
                └─> Sees fresh GitHub data
```

### Cache Strategy

| Data Type | Update Frequency | Cache Duration |
|-----------|------------------|----------------|
| GitHub Stats | On webhook + hourly | 1 hour |
| Activity Feed | On webhook + 10 min | 10 minutes |
| Languages | On webhook + daily | 24 hours |
| Contributions | On webhook + hourly | 1 hour |

---

## 🐛 Troubleshooting

### Webhook Not Firing

**Check GitHub App installation:**
```
Settings → Developer settings → GitHub Apps → Your App → Install App
```

Make sure it's installed on your account with access to repositories.

**Check webhook deliveries:**
```
Settings → Developer settings → GitHub Apps → Your App → Advanced
```

Look for failed deliveries with error messages.

### 401 Unauthorized Error

**Verify webhook secret matches:**
- GitHub App webhook secret
- `GITHUB_WEBHOOK_SECRET` in Vercel

**Regenerate if needed:**
```bash
openssl rand -hex 32
```

Update in both places.

### No GitHub Data Showing

**Check environment variables:**
```bash
# In Vercel Dashboard
Settings → Environment Variables
```

Make sure `GITHUB_TOKEN` is set for Production.

**Check API rate limits:**
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://api.github.com/rate_limit
```

### Cron Not Running

**Verify `vercel.json` exists:**
```json
{
  "crons": [{
    "path": "/api/github/sync",
    "schedule": "*/30 * * * *"
  }]
}
```

**Check Vercel project settings:**
```
Settings → Cron Jobs
```

Should show: `/api/github/sync` running every 30 minutes

---

## 🎯 Manual Testing

### Test Webhook Locally

```bash
# Install webhook testing tool
npm install -g smee-client

# Get webhook proxy URL from smee.io
smee -u https://smee.io/YOUR_URL -t http://localhost:3000/api/github/webhook

# Update GitHub App webhook URL temporarily to smee URL
# Trigger events and watch logs
```

### Test Cron Sync Manually

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_CRON_SECRET" \
  https://yoursite.com/api/github/sync
```

Should return:
```json
{
  "synced": true,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "tags": ["github-stats", "github-activity", ...]
}
```

---

## 🔐 Security Best Practices

1. **Never commit secrets to git**
   - Always use `.env.local` (in `.gitignore`)
   - Use Vercel environment variables for production

2. **Rotate tokens regularly**
   - Update GitHub token every 90 days
   - Rotate webhook secrets quarterly

3. **Use minimum permissions**
   - Only grant scopes you need
   - Review App permissions periodically

4. **Monitor webhook deliveries**
   - Check for unusual activity
   - Set up alerts for failed deliveries

---

## 📚 Additional Resources

- [GitHub Apps Documentation](https://docs.github.com/en/developers/apps)
- [GitHub Webhooks Guide](https://docs.github.com/en/webhooks)
- [Vercel Cron Jobs](https://vercel.com/docs/cron-jobs)
- [Next.js Caching](https://nextjs.org/docs/app/building-your-application/caching)

---

## ✅ Success Checklist

- [ ] GitHub Personal Access Token created
- [ ] GitHub App created with webhook
- [ ] Webhook secret generated and added to env
- [ ] Cron secret generated and added to env
- [ ] Environment variables added to Vercel
- [ ] Site deployed successfully
- [ ] Webhook endpoint responding
- [ ] Test webhook delivery successful
- [ ] GitHub stats showing on homepage
- [ ] /github page loading correctly
- [ ] Automatic updates confirmed

---

**🎉 Congratulations!** Your portfolio now updates automatically whenever you do anything on GitHub!

