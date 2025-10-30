# 📧 Resend Audience Setup (Required for Counter)

## Why Resend Audience?

Since you already have people who joined via email, **Resend Contacts** is perfect because:
- ✅ All your waitlist emails are already there
- ✅ Counter shows real signups automatically
- ✅ View/manage all contacts in Resend dashboard
- ✅ No extra database needed

---

## ✅ Quick Setup (2 minutes)

### Step 1: Create Resend Audience

1. Go to **[Resend Audiences](https://resend.com/audiences)**
2. Click **"Create Audience"**
3. Name: `Portnix Waitlist`
4. Click **"Create"**
5. **Copy the Audience ID** (starts with `aud_`)

### Step 2: Add to Vercel Environment Variables

1. Go to your **[Vercel Dashboard](https://vercel.com/dashboard)**
2. Select your **Portnix project**
3. Go to **Settings → Environment Variables**
4. Click **"Add New"**
5. Set:
   - **Key:** `RESEND_AUDIENCE_ID`
   - **Value:** `aud_xxxxxxxxxxxxx` (paste your audience ID)
   - **Environment:** All (Production, Preview, Development)
6. Click **"Save"**

### Step 3: Redeploy

1. Go to **"Deployments"** tab
2. Click **"Redeploy"** on latest deployment

---

## ✅ How it works

- **Persistent storage** - All contacts saved in Resend
- **Real count** - Shows actual number of signups
- **Auto-sync** - Emails automatically become contacts
- **Free tier** - Up to 100 contacts free

---

## 📊 Verify it's working

1. Visit your deployed site
2. Counter should show your **current signups**
3. Join with a new email
4. Counter increments!
5. Check **[Resend Contacts](https://resend.com/contacts)** - you'll see all emails

---

## 🎯 Benefits

✅ **See all waitlist members** in Resend dashboard  
✅ **Export contacts** anytime  
✅ **Manage subscriptions** easily  
✅ **Count persists** forever  
✅ **Already paying for Resend** - no extra cost

---

## 💰 Cost

**Resend Free Tier:**
- ✅ Up to 100 contacts free
- ✅ 3,000 emails/month
- ✅ Perfect for early-stage waitlists

**Need more?**
- 500 contacts: $20/month
- 1,000 contacts: $40/month
