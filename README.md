# Portnix - AI Crypto Co-Pilot Landing Page

A modern, responsive waitlist landing page for Portnix with email collection via Resend API.

## Features

- 🎨 Modern dark-themed UI
- 📱 Fully responsive (mobile, tablet, desktop)
- ✉️ Email collection with Resend integration
- 📊 Real-time waitlist counter
- ⚡ Serverless deployment ready

## Tech Stack

**Frontend:**
- HTML5, CSS3, JavaScript
- Font Awesome & Remix Icons
- Responsive design

**Backend:**
- Node.js + Express
- Resend Email API
- In-memory storage

## Local Development

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd portnix
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Set up environment variables:**
   - Copy `backend/.env.example` to `backend/.env`
   - Add your Resend API key from https://resend.com/api-keys
   - Update `FROM_EMAIL` with your verified domain

4. **Run the backend server:**
   ```bash
   npm start
   ```

5. **Open the frontend:**
   - Open `index.html` in your browser
   - Or use a local server like Live Server

## Deployment

### Vercel (Recommended)

1. **Push to GitHub** (see below)

2. **Deploy to Vercel:**
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard:
     - `RESEND_API_KEY`
     - `FROM_EMAIL`
   - Deploy!

## Environment Variables

Required variables for backend:

```
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=your-email@yourdomain.com
PORT=5000
NODE_ENV=production
```

## Project Structure

```
portnix/
├── index.html          # Landing page
├── logo img.jpg        # Logo
├── favicon_io/         # Favicon assets
├── backend/
│   ├── server.js       # Express API server
│   ├── package.json    # Dependencies
│   ├── .env.example    # Environment template
│   └── .env           # Environment variables (gitignored)
├── vercel.json         # Vercel configuration
└── README.md           # This file
```

## API Endpoints

- `POST /api/waitlist` - Add user to waitlist
- `GET /api/waitlist/count` - Get waitlist count

## Security Notes

⚠️ **IMPORTANT:**
- Never commit `.env` file to GitHub
- Always use environment variables for API keys
- The `.gitignore` is configured to protect sensitive files

## License

© 2025 Portnix. All rights reserved.
