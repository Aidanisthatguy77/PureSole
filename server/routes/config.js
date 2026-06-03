import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware.js';

const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
  try {
    const config = db.query("SELECT * FROM config");
    // Convert to object for easier use
    const configObj = config.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
    res.json(configObj);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/', authenticateToken, (req, res) => {
  const updates = req.body; // Expecting { key1: value1, key2: value2 }
  try {
    Object.entries(updates).forEach(([key, value]) => {
      db.query(`INSERT OR REPLACE INTO config (key, value) VALUES ('${key}', '${String(value).replace(/'/g, "''")}')`);
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
