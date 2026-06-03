import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../db.js';
import { authenticateToken } from '../middleware.js';

const router = express.Router();

// Admin: List orders
router.get('/', authenticateToken, (req, res) => {
  try {
    const orders = db.query("SELECT * FROM orders ORDER BY createdAt DESC");
    const parsed = orders.map(o => ({
      ...o,
      items: JSON.parse(o.items || '[]')
    }));
    res.json(parsed);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Single order
router.get('/:id', authenticateToken, (req, res) => {
  try {
    const order = db.query(`SELECT * FROM orders WHERE id = '${req.params.id}'`);
    if (order.length === 0) return res.status(404).json({ error: 'Order not found' });
    
    const o = order[0];
    res.json({
      ...o,
      items: JSON.parse(o.items || '[]')
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Public: Create order (Checkout)
router.post('/', (req, res) => {
  const { customerName, customerEmail, customerAddress, items, total } = req.body;
  const id = uuidv4();
  
  try {
    // Calculate total cost from items
    let totalCost = 0;
    const itemIds = items.map(item => `'${item.id}'`).join(',');
    if (itemIds) {
      const products = db.query(`SELECT id, cost FROM products WHERE id IN (${itemIds})`);
      items.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) {
          totalCost += (product.cost || 0) * (item.quantity || 1);
        }
      });
    }

    const taxRate = 0.25;
    const taxWithheld = total * taxRate;
    const profit = total - totalCost - taxWithheld;

    const sql = `INSERT INTO orders (id, customerName, customerEmail, customerAddress, items, total, taxWithheld, profit, status, createdAt) VALUES (
      '${id}',
      '${(customerName || '').replace(/'/g, "''")}',
      '${(customerEmail || '').replace(/'/g, "''")}',
      '${(customerAddress || '').replace(/'/g, "''")}',
      '${JSON.stringify(items || [])}',
      ${total},
      ${taxWithheld},
      ${profit},
      'pending',
      datetime('now')
    )`;
    db.query(sql);

    // Update stock
    items.forEach(item => {
      db.query(`UPDATE products SET stock = MAX(0, stock - ${item.quantity || 1}) WHERE id = '${item.id}'`);
    });

    res.status(201).json({ id, total, taxWithheld, profit });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Update status
router.put('/:id/status', authenticateToken, (req, res) => {
  const { status, tracking } = req.body;
  try {
    let sql = `UPDATE orders SET status = '${status}'`;
    if (tracking) {
      sql += `, tracking = '${tracking.replace(/'/g, "''")}'`;
    }
    sql += ` WHERE id = '${req.params.id}'`;
    db.query(sql);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
