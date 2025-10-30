# 📊 Waitlist Counter Setup Guide

## Why the counter shows 0

The counter needs **persistent storage** to track signups. We're using **Resend Contacts** to store and count waitlist members.

---

## 🚀 Quick Setup (5 minutes)

### Step 1: Create a Resend Audience

1. Go to **[Resend Dashboard → Audiences](https://resend.com/audiences)**
2. Click **"Create Audience"**
3. Name it: `Portnix Waitlist`
4. Copy the **Audience ID** (looks like: `aud_xxxxxxxxxxxxx`)

### Step 2: Add Audience ID to Vercel

1. Go to your **Vercel Dashboard**
2. Select your **Portnix project**
3. Go to **Settings → Environment Variables**
4. Add new variable:
   - **Name:** `RESEND_AUDIENCE_ID`
   - **Value:** Paste your audience ID from Step 1
5. Click **Save**

### Step 3: Redeploy

1. Go to **Deployments** tab
2. Click **"Redeploy"** on the latest deployment

---

## ✅ How it works now

- **Someone joins waitlist** → Email sent + Contact added to Resend
- **Counter loads** → Fetches count from Resend Contacts
- **Count persists** → Stored in Resend (not in-memory)
- **No glitches** → No auto-refresh, updates only on page load & after signup

---

## 🎯 Benefits

✅ **Real count** - Shows actual number of signups  
✅ **Persists** - Count survives server restarts  
✅ **Manage contacts** - View all waitlist members in Resend dashboard  
✅ **No database needed** - Uses Resend you're already paying for  
✅ **Free tier** - Works with Resend's free plan (up to 100 contacts)

---

## 🔍 Verify it's working

1. Join the waitlist with a test email
2. Check **[Resend Contacts](https://resend.com/contacts)**
3. You should see your test contact there
4. Refresh your site - counter should show **1**

---

## ⚠️ Important

**Without setting up the Audience ID:**
- Counter will always show 0
- Emails will still work
- No contacts will be saved
