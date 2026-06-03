import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware.js';

const router = express.Router();

router.get('/revenue', authenticateToken, (req, res) => {
  try {
    const dailyRevenue = db.query(`
      SELECT strftime('%Y-%m-%d', createdAt) as date, SUM(total) as revenue, SUM(profit) as profit
      FROM orders
      GROUP BY date
      ORDER BY date DESC
      LIMIT 30
    `);

    const totals = db.query(`
      SELECT SUM(total) as totalRevenue, SUM(profit) as totalProfit, SUM(taxWithheld) as totalTaxes
      FROM orders
    `);

    res.json({ daily: dailyRevenue, totals: totals[0] || { totalRevenue: 0, totalProfit: 0, totalTaxes: 0 } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/taxes', authenticateToken, (req, res) => {
  try {
    const quarterlyTaxes = db.query(`
      SELECT 
        CASE 
          WHEN strftime('%m', createdAt) BETWEEN '01' AND '03' THEN 'Q1'
          WHEN strftime('%m', createdAt) BETWEEN '04' AND '06' THEN 'Q2'
          WHEN strftime('%m', createdAt) BETWEEN '07' AND '09' THEN 'Q3'
          ELSE 'Q4'
        END as quarter,
        strftime('%Y', createdAt) as year,
        SUM(taxWithheld) as taxes
      FROM orders
      GROUP BY year, quarter
      ORDER BY year DESC, quarter DESC
    `);

    res.json(quarterlyTaxes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
