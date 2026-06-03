import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import db from '../db.js';
import { authenticateToken } from '../middleware.js';

const router = express.Router();

// Public: List products
router.get('/', (req, res) => {
  try {
    const products = db.query("SELECT * FROM products ORDER BY createdAt DESC");
    // Map JSON strings back to objects
    const parsed = products.map(p => ({
      ...p,
      images: JSON.parse(p.images || '[]'),
      sizes: JSON.parse(p.sizes || '[]')
    }));
    res.json(parsed);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Public: Single product
router.get('/:id', (req, res) => {
  try {
    const product = db.query(`SELECT * FROM products WHERE id = '${req.params.id}'`);
    if (product.length === 0) return res.status(404).json({ error: 'Product not found' });
    
    const p = product[0];
    res.json({
      ...p,
      images: JSON.parse(p.images || '[]'),
      sizes: JSON.parse(p.sizes || '[]')
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Create product
router.post('/', authenticateToken, (req, res) => {
  const { name, description, category, price, cost, images, sizes, stock, status } = req.body;
  const id = uuidv4();
  
  try {
    const sql = `INSERT INTO products (id, name, description, category, price, cost, images, sizes, stock, status) VALUES (
      '${id}', 
      '${name.replace(/'/g, "''")}', 
      '${(description || '').replace(/'/g, "''")}', 
      '${(category || '').replace(/'/g, "''")}', 
      ${price}, 
      ${cost || 0}, 
      '${JSON.stringify(images || [])}', 
      '${JSON.stringify(sizes || [])}', 
      ${stock || 0}, 
      '${status || 'draft'}'
    )`;
    db.query(sql);
    res.status(201).json({ id, name });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Update product
router.put('/:id', authenticateToken, (req, res) => {
  const { name, description, category, price, cost, images, sizes, stock, status } = req.body;
  
  try {
    const sql = `UPDATE products SET 
      name = '${name.replace(/'/g, "''")}', 
      description = '${(description || '').replace(/'/g, "''")}', 
      category = '${(category || '').replace(/'/g, "''")}', 
      price = ${price}, 
      cost = ${cost || 0}, 
      images = '${JSON.stringify(images || [])}', 
      sizes = '${JSON.stringify(sizes || [])}', 
      stock = ${stock || 0}, 
      status = '${status || 'draft'}'
      WHERE id = '${req.params.id}'`;
    db.query(sql);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Delete product
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    db.query(`DELETE FROM products WHERE id = '${req.params.id}'`);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
