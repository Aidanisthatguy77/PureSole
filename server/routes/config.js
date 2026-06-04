import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware.js';

const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
  try {
    const config = db.query("SELECT * FROM config");
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
  try {
    // Supports both { key: 'name', value: 'val' } and { key1: val1, key2: val2 }
    if (req.body.key && req.body.value !== undefined) {
      db.query(`INSERT OR REPLACE INTO config (key, value) VALUES ('${req.body.key}', '${String(req.body.value).replace(/'/g, "''")}')`);
    } else {
      Object.entries(req.body).forEach(([key, value]) => {
        db.query(`INSERT OR REPLACE INTO config (key, value) VALUES ('${key}', '${String(value || '').replace(/'/g, "''")}')`);
      });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;