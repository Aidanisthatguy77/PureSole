import express from 'express';
import Anthropic from '@anthropic-ai/sdk';
import db from '../db.js';
import { authenticateToken } from '../middleware.js';

const router = express.Router();

router.post('/chat', authenticateToken, async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message required' });

  const apiKeyResult = db.query("SELECT value FROM config WHERE key = 'claude_api_key'");
  const claudeKey = apiKeyResult.length > 0 ? apiKeyResult[0].value : null;

  const productCount = db.query("SELECT COUNT(*) as count FROM products")[0]?.count || 0;
  const orderCount = db.query("SELECT COUNT(*) as count FROM orders")[0]?.count || 0;
  const totalRevenue = db.query("SELECT COALESCE(SUM(total), 0) as total FROM orders")[0]?.total || 0;
  const totalTax = db.query("SELECT COALESCE(SUM(taxWithheld), 0) as total FROM orders")[0]?.total || 0;

  const contextStr = `Products: ${productCount} | Orders: ${orderCount} | Revenue: $${totalRevenue.toFixed(2)} | Tax: $${totalTax.toFixed(2)}`;

  if (claudeKey) {
    try {
      const anthropic = new Anthropic({ apiKey: claudeKey });
      const msg = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 500,
        system: `You are PureSole AI, the business assistant for a premium sneaker and streetwear resale entrepreneur called Pure Sole. Current state: ${contextStr}. Be concise and actionable. Topics: sourcing, pricing, inventory, taxes (25% auto-withhold), business structure (EIN→LLC→S-Corp), fulfillment.`,
        messages: [{ role: 'user', content: message }]
      });

      const reply = msg.content?.[0]?.text || 'No response';
      return res.json({
        response: reply,
        model: 'claude-sonnet-4-20250514',
        timestamp: new Date().toISOString(),
        context: { products: productCount, orders: orderCount, revenue: totalRevenue, taxWithheld: totalTax }
      });
    } catch (err) {
      return res.status(500).json({ error: `Claude error: ${err.message}` });
    }
  }

  // Rule-based fallback
  const lower = message.toLowerCase();
  let response = '';
  if (lower.includes('hi') || lower.includes('hello')) {
    response = `👋 Pure Sole assistant here. ${contextStr}\n\nAdd a Claude API key in Settings → AI Settings for AI-powered responses!`;
  } else if (lower.includes('revenue') || lower.includes('sales')) {
    response = `💰 Revenue: $${totalRevenue.toFixed(2)} | Tax withheld: $${totalTax.toFixed(2)}`;
  } else if (lower.includes('tax')) {
    response = `🧾 25% auto-withheld: $${totalTax.toFixed(2)} set aside.`;
  } else if (lower.includes('product') || lower.includes('inventory')) {
    response = `📦 ${productCount} products. Add more in the Products tab.`;
  } else if (lower.includes('blueprint') || lower.includes('ein') || lower.includes('scorp') || lower.includes('llc')) {
    response = `🗺️ EIN at $5K | LLC at $10K | S-Corp at $50K\nCurrent: $${totalRevenue.toFixed(2)}`;
  } else {
    response = `Ask me about revenue, taxes, products, or your business blueprint.\n💡 Add a Claude API key in Settings for smarter AI!`;
  }

  res.json({ response, model: 'rule-based', timestamp: new Date().toISOString(), context: { products: productCount, orders: orderCount, revenue: totalRevenue, taxWithheld: totalTax } });
});

export default router;