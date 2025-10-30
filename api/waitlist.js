const { Resend } = require('resend');

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Audience ID for Resend Contacts (you'll need to create this in Resend dashboard)
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID || 'default';

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET /api/waitlist/count - Get waitlist count from Resend Contacts
  if (req.method === 'GET' && req.url.includes('/count')) {
    try {
      // Try to get contacts from Resend
      const contacts = await resend.contacts.list({ audienceId: AUDIENCE_ID });
      const count = contacts?.data?.length || 0;
      return res.json({ count });
    } catch (error) {
      console.error('Error fetching count:', error);
      // Return 0 if there's an error (audience not set up yet)
      return res.json({ count: 0 });
    }
  }

  // POST /api/waitlist - Add to waitlist
  if (req.method === 'POST') {
    const { name, email } = req.body;
    
    // Validate input
    if (!name || !email || typeof name !== 'string' || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    try {
      // Check if contact already exists in Resend
      try {
        const existingContacts = await resend.contacts.list({ audienceId: AUDIENCE_ID });
        const exists = existingContacts?.data?.some(contact => 
          contact.email.toLowerCase() === email.toLowerCase()
        );
        if (exists) {
          return res.status(409).json({ error: 'Email already on waitlist' });
        }
      } catch (checkError) {
        // If audience doesn't exist yet, continue (we'll create contact anyway)
        console.log('Audience check skipped:', checkError.message);
      }

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

      // Add contact to Resend audience for persistent storage
      try {
        await resend.contacts.create({
          audienceId: AUDIENCE_ID,
          email: email,
          firstName: name,
          unsubscribed: false,
        });
        console.log('✅ Contact added to Resend audience');
      } catch (contactError) {
        // Log but don't fail if contact creation fails
        console.error('⚠️ Contact creation error:', contactError.message);
      }
      
      return res.json({ success: true });
    } catch (err) {
      console.error('❌ Email service error:', err);
      return res.status(500).json({ error: 'Server error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
