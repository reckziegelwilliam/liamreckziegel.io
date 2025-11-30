# GitHub Integration - Quick Setup

🚀 **5-Minute Setup Guide**

---

## Step 1: Create GitHub Token (2 min)

1. Visit: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scopes: `public_repo` + `read:user`
4. Copy token → Save to `.env.local`:

```bash
GITHUB_TOKEN=ghp_your_token_here
```

---

## Step 2: Create Webhook Secrets (1 min)

```bash
# Generate two random secrets
openssl rand -hex 32  # For GitHub webhook
openssl rand -hex 32  # For Vercel cron
```

Add to `.env.local`:
```bash
GITHUB_WEBHOOK_SECRET=first_secret_here
CRON_SECRET=second_secret_here
```

---

## Step 3: Create GitHub App (2 min)

1. Visit: https://github.com/settings/apps/new
2. Fill in:
   - **Name**: Portfolio Auto-Update
   - **Homepage**: https://yoursite.com
   - **Webhook URL**: https://yoursite.com/api/github/webhook
   - **Webhook Secret**: (use the first secret from Step 2)

3. **Permissions** (Repository):
   - Contents: Read-only
   - Metadata: Read-only

4. **Subscribe to events**:
   - Push, Star, Fork, Repository

5. Click "Create GitHub App"
6. Click "Install App" → Install on your account

---

## Step 4: Deploy to Vercel

```bash
vercel

# Add environment variables in Vercel Dashboard:
# - GITHUB_TOKEN
# - GITHUB_WEBHOOK_SECRET  
# - CRON_SECRET

vercel --prod
```

---

## ✅ Verify It Works

1. **Check webhook endpoint:**
   ```bash
   curl https://yoursite.com/api/github/webhook
   ```
   Should return: `{"status":"GitHub webhook endpoint active",...}`

2. **Push to any repo** → Check Vercel logs for:
   ```
   📬 GitHub webhook received: push
   ```

3. **Visit your portfolio** → GitHub stats should show!

---

## 🎯 What You Get

- ✅ Real-time GitHub stats on homepage
- ✅ Full `/github` page with activity
- ✅ Auto-updates in ~2 seconds after push
- ✅ Contribution graph
- ✅ Language breakdown
- ✅ Recent activity feed
- ✅ Top repositories

---

## Need Help?

See `GITHUB_INTEGRATION_SETUP.md` for detailed troubleshooting.

---

**Done! 🎉** Your portfolio now updates automatically with your GitHub activity!

