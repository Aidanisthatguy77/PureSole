import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../db.js';
import { authenticateToken } from '../middleware.js';

const router = express.Router();

// Get financial records (S-Corp, Roth IRA, Business Credit)
router.get('/', authenticateToken, (req, res) => {
  try {
    const financial = db.query("SELECT * FROM financial");
    res.json(financial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update financial record
router.put('/', authenticateToken, (req, res) => {
  const { id, type, status, value, notes } = req.body;
  try {
    const sql = `INSERT OR REPLACE INTO financial (id, type, status, value, notes, updatedAt) VALUES (
      '${id || uuidv4()}',
      '${type.replace(/'/g, "''")}',
      '${status.replace(/'/g, "''")}',
      ${value || 0},
      '${(notes || '').replace(/'/g, "''")}',
      datetime('now')
    )`;
    db.query(sql);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Expenses
router.get('/expenses', authenticateToken, (req, res) => {
  try {
    const expenses = db.query("SELECT * FROM expenses ORDER BY date DESC");
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/expenses', authenticateToken, (req, res) => {
  const { description, amount, category, date, receipt } = req.body;
  const id = uuidv4();
  try {
    const sql = `INSERT INTO expenses (id, description, amount, category, date, receipt) VALUES (
      '${id}',
      '${description.replace(/'/g, "''")}',
      ${amount},
      '${category.replace(/'/g, "''")}',
      '${date || new Date().toISOString().split('T')[0]}',
      '${(receipt || '').replace(/'/g, "''")}'
    )`;
    db.query(sql);
    res.status(201).json({ id, description });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
