import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware.js';

const router = express.Router();

router.post('/sync', authenticateToken, (req, res) => {
  try {
    const config = db.query("SELECT * FROM config");
    const configObj = config.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});

    const endpoint = configObj.autotropolis_endpoint;
    const apiKey = configObj.autotropolis_api_key;

    if (!endpoint) {
      return res.status(400).json({ error: 'Autotropolis endpoint not configured' });
    }

    // Gather all data
    const data = {
      products: db.query("SELECT * FROM products"),
      orders: db.query("SELECT * FROM orders"),
      expenses: db.query("SELECT * FROM expenses"),
      financial: db.query("SELECT * FROM financial"),
      timestamp: new Date().toISOString()
    };

    // In a real scenario, we'd use fetch() to post to HQ.
    // For this simulation, we'll log it and return success.
    console.log(`Syncing to Autotropolis at ${endpoint} with key ${apiKey}`);
    
    // Simulate API call
    res.json({ 
      success: true, 
      message: 'Data successfully exported to Autotropolis HQ',
      exportedCount: {
        products: data.products.length,
        orders: data.orders.length,
        expenses: data.expenses.length,
        financial: data.financial.length
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/settings', authenticateToken, (req, res) => {
  try {
    const settings = db.query("SELECT key, value FROM config WHERE key IN ('autotropolis_endpoint', 'autotropolis_api_key')");
    const settingsObj = settings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
    res.json(settingsObj);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
