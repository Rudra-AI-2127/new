const { Resend } = require('resend');

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory counter (resets on redeploy, but emails always work!)
let waitlistEmails = new Set();

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET /api/waitlist/count - Simple in-memory count
  if (req.method === 'GET' && req.url.includes('/count')) {
    return res.json({ count: waitlistEmails.size });
  }

  // POST /api/waitlist - Add to waitlist
  if (req.method === 'POST') {
    const { name, email } = req.body;
    
    // Validate input
    if (!name || !email || typeof name !== 'string' || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    // Check if email already registered
    if (waitlistEmails.has(email.toLowerCase())) {
      return res.status(409).json({ error: 'Email already on waitlist' });
    }

    try {
      // Send welcome email via Resend
      console.log('📧 Attempting to send email to:', email);
      
      const { data, error } = await resend.emails.send({
        from: process.env.FROM_EMAIL || 'Portnix <onboarding@resend.dev>',
        to: [email],
        subject: 'Welcome to Portnix Waitlist! 🚀',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background-color: #000; color: #fff; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
                .header { text-align: center; margin-bottom: 30px; }
                .logo { font-size: 32px; font-weight: bold; color: #fff; margin-bottom: 10px; }
                .content { background-color: #0a0a0a; border: 1px solid #222; border-radius: 12px; padding: 30px; }
                h1 { color: #fff; font-size: 24px; margin-bottom: 20px; }
                p { color: #999; line-height: 1.6; margin-bottom: 15px; }
                .highlight { color: #fff; font-weight: 600; }
                .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <div class="logo">⚡ Portnix</div>
                </div>
                <div class="content">
                  <h1>Welcome to Portnix, ${name}! 🎉</h1>
                  <p>Thank you for joining our waitlist! You're now part of an exclusive group getting early access to <span class="highlight">your AI Crypto Co-Pilot</span>.</p>
                  <p><strong>What's next?</strong></p>
                  <p>We're working hard to build something amazing for you. You'll be among the first to know when we launch.</p>
                  <p>In the meantime, follow us on social media to stay updated with the latest news and features.</p>
                  <p style="margin-top: 30px;">Thanks for your patience and support! 🚀</p>
                  <p style="color: #fff; font-weight: 600;">The Portnix Team</p>
                </div>
                <div class="footer">
                  <p>This email was sent because you joined the Portnix waitlist.</p>
                  <p>© ${new Date().getFullYear()} Portnix. All rights reserved.</p>
                </div>
              </div>
            </body>
          </html>
        `,
      });

      if (error) {
        console.error('❌ Email send error:', JSON.stringify(error, null, 2));
        return res.status(500).json({ error: 'Failed to send email: ' + (error.message || JSON.stringify(error)) });
      }

      console.log('✅ Welcome email sent to:', email);

      // Add to in-memory storage
      waitlistEmails.add(email.toLowerCase());
      console.log('📊 Current count:', waitlistEmails.size);
      
      return res.json({ success: true });
    } catch (err) {
      console.error('❌ Email service error:', err);
      return res.status(500).json({ error: 'Server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
