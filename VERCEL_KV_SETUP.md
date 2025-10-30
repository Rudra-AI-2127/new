# 🚀 Vercel KV Setup (Required for Counter)

## Why you need this

The counter shows 0 because **serverless functions don't have persistent memory**. 
Vercel KV (Redis) provides fast, persistent storage for your waitlist count.

---

## ✅ Setup Steps (5 minutes)

### 1. Create Vercel KV Database

1. Go to your **[Vercel Dashboard](https://vercel.com/dashboard)**
2. Select your **Portnix project**
3. Click **"Storage"** tab
4. Click **"Create Database"**
5. Select **"KV"** (Key-Value Store)
6. Name it: `portnix-waitlist`
7. Click **"Create"**

### 2. Connect to Your Project

Vercel will automatically:
- ✅ Create environment variables (`KV_URL`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`)
- ✅ Connect the database to your project
- ✅ No manual configuration needed!

### 3. Redeploy

1. Go to **"Deployments"** tab
2. Click **"Redeploy"** on latest deployment

---

## ✅ How it works now

- **Persistent storage** - Count never resets
- **Free tier** - 3,000 commands/day (plenty for waitlist)
- **Fast** - Redis-powered (< 10ms response time)
- **No setup** - Vercel auto-configures everything

---

## 📊 Verify it's working

1. Visit your deployed site
2. Join the waitlist
3. Refresh the page
4. Counter should show **1** (or more)
5. Even after redeployment, count persists!

---

## 🎯 What's stored

- **Key:** `waitlist_emails`
- **Value:** Array of email addresses
- **Purpose:** Count and prevent duplicates

---

## 💰 Cost

**Free tier includes:**
- ✅ 3,000 commands/day
- ✅ 256 MB storage
- ✅ Perfect for waitlists

**Your usage:**
- ~2 commands per signup (read + write)
- Can handle **1,500 signups/day** on free tier
