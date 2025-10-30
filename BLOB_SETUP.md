# 🗄️ Vercel Blob Storage Setup (Required for Persistent Counter)

## Why Vercel Blob?

**Vercel Blob** provides persistent file storage that never resets. Perfect for tracking your waitlist count across all deployments!

✅ **Persistent** - Count never resets  
✅ **Simple** - Auto-configured by Vercel  
✅ **Free** - Generous free tier  
✅ **No database** - Just file storage  

---

## ✅ Quick Setup (3 minutes)

### Step 1: Create Vercel Blob Store

1. Go to your **[Vercel Dashboard](https://vercel.com/dashboard)**
2. Select your **Portnix project**
3. Click **"Storage"** tab
4. Click **"Create Database"**
5. Select **"Blob"**
6. Name: `portnix-waitlist`
7. Click **"Create"**

### Step 2: Auto-Configuration

Vercel automatically adds these environment variables:
- `BLOB_READ_WRITE_TOKEN`

**No manual configuration needed!**

### Step 3: Push & Redeploy

```bash
git push origin main
```

Then in Vercel:
1. Go to **"Deployments"** tab
2. Click **"Redeploy"** on latest deployment

---

## ✅ How it works

### Storage Format
A single JSON file stores all waitlist emails:
```json
{
  "emails": [
    "user1@example.com",
    "user2@example.com",
    "user3@example.com"
  ]
}
```

### Counter Logic
1. **Page loads** → Fetch JSON from blob → Count emails
2. **New signup** → Add email → Save JSON back to blob
3. **Persists forever** → Survives all redeployments

---

## 📊 Verify it's working

1. Visit your deployed site
2. Counter shows **total count** (including previous signups)
3. Join with new email
4. Counter increments!
5. Redeploy → Counter still shows correct count 🎉

---

## 💰 Cost

**Vercel Blob Free Tier:**
- ✅ 500 MB storage
- ✅ 5 GB bandwidth/month
- ✅ Unlimited reads/writes

**Your usage:**
- 1 JSON file (~1 KB per 100 emails)
- Can handle **50,000+ emails** on free tier

---

## 🎯 Benefits

✅ **Tracks ALL signups** - Including previous ones  
✅ **Never resets** - Persists across deployments  
✅ **Auto-synced** - Works across all serverless instances  
✅ **Simple** - Just JSON file storage  
✅ **Free** - More than enough for waitlists  

---

## 🔍 View Your Data

In Vercel Dashboard:
1. Go to **Storage** → Your Blob store
2. Browse files
3. See `waitlist-emails` JSON file
4. Download to export your waitlist!
