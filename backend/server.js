const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

// MongoDB schema/model
const WaitlistEntry = mongoose.model('WaitlistEntry', new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  joinedAt: { type: Date, default: Date.now },
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB Error:', err));

// ===== ENDPOINT 1: Add to waitlist =====
app.post('/api/waitlist', async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email || typeof name !== 'string' || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  try {
    const exists = await WaitlistEntry.findOne({ email });
    if (exists) return res.status(409).json({ error: 'Email already on waitlist' });
    await WaitlistEntry.create({ name, email });
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
});

// ===== ENDPOINT 2: Get waitlist count =====
app.get('/api/waitlist/count', async (req, res) => {
  try {
    const count = await WaitlistEntry.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
