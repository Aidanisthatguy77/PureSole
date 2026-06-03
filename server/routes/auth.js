import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || 'puresole-secret-key';

router.post('/setup', (req, res) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ error: 'Password required' });

  try {
    // Always allow setup - overwrite whatever is there
    const hashedPassword = bcrypt.hashSync(password, 10);
    db.query(`INSERT OR REPLACE INTO config (key, value) VALUES ('admin_password', '${hashedPassword}')`);
    db.query(`INSERT OR REPLACE INTO config (key, value) VALUES ('setup_complete', 'true')`);
    
    const token = jwt.sign({ user: 'admin' }, SECRET_KEY, { expiresIn: '24h' });
    res.json({ success: true, token, message: 'Admin account created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', (req, res) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ error: 'Password required' });

  try {
    const adminPass = db.query("SELECT value FROM config WHERE key = 'admin_password'");
    if (adminPass.length === 0) {
      // First time - do setup automatically
      const hashedPassword = bcrypt.hashSync(password, 10);
      db.query(`INSERT OR REPLACE INTO config (key, value) VALUES ('admin_password', '${hashedPassword}')`);
      db.query(`INSERT OR REPLACE INTO config (key, value) VALUES ('setup_complete', 'true')`);
      const token = jwt.sign({ user: 'admin' }, SECRET_KEY, { expiresIn: '24h' });
      return res.json({ token, message: 'Account created and logged in' });
    }

    const isValid = bcrypt.compareSync(password, adminPass[0].value);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ user: 'admin' }, SECRET_KEY, { expiresIn: '24h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;