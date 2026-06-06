import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware.js';

const router = express.Router();

router.post('/chat', authenticateToken, async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message required' });

  // Check if Claude API key is configured
  const apiKeyResult = db.query("SELECT value FROM config WHERE key = 'claude_api_key'");
  const claudeKey = apiKeyResult.length > 0 ? apiKeyResult[0].value : null;

  // Get business context
  const productCount = db.query("SELECT COUNT(*) as count FROM products")[0]?.count || 0;
  const orderCount = db.query("SELECT COUNT(*) as count FROM orders")[0]?.count || 0;
  const totalRevenue = db.query("SELECT COALESCE(SUM(total), 0) as total FROM orders")[0]?.total || 0;
  const totalTax = db.query("SELECT COALESCE(SUM(taxWithheld), 0) as total FROM orders")[0]?.total || 0;

  const systemPrompt = `You are PureSole AI, the business assistant for a premium sneaker and streetwear resale entrepreneur. The business is called Pure Sole.

Current business state:
- Products in inventory: ${productCount}
- Orders processed: ${orderCount}
- Total revenue: $${totalRevenue.toFixed(2)}
- Tax withheld (25%): $${totalTax.toFixed(2)}

You help the owner run their business. Be concise, practical, and helpful. Topics you know about:
- Product sourcing and pricing strategy
- Inventory management
- Tax planning (25% auto-withhold)
- Business structure (EIN → LLC → S-Corp)
- Brand partnerships and retail sourcing
- Customer service and fulfillment

Keep responses brief but actionable.`;

  if (claudeKey) {
    // Use Claude API
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': claudeKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 500,
          system: systemPrompt,
          messages: [{ role: 'user', content: message }]
        })
      });

      if (!response.ok) {
        const err = await response.text();
        return res.status(500).json({ error: `Claude API error: ${err}` });
      }

      const data = await response.json();
      const reply = data.content?.[0]?.text || data.content?.text || 'No response from Claude';
      
      return res.json({
        response: reply,
        model: 'claude-sonnet-4-20250514',
        timestamp: new Date().toISOString(),
        context: { products: productCount, orders: orderCount, revenue: totalRevenue, taxWithheld: totalTax }
      });
    } catch (err) {
      return res.status(500).json({ error: `Claude API call failed: ${err.message}` });
    }
  }

  // Fallback: rule-based assistant
  const lowerMsg = message.toLowerCase();
  let response = '';

  if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
    response = `Hey there! 👋 I'm your Pure Sole assistant. Current snapshot:\n• ${productCount} products\n• ${orderCount} orders\n• $${totalRevenue.toFixed(2)} revenue\n• $${totalTax.toFixed(2)} tax withheld\n\nTo unlock Claude AI (smarter responses), add your Claude API key in Settings → AI Settings.`;
  } else if (lowerMsg.includes('revenue') || lowerMsg.includes('sales')) {
    response = `💰 Revenue: $${totalRevenue.toFixed(2)} total | Tax: $${totalTax.toFixed(2)} withheld`;
  } else if (lowerMsg.includes('tax')) {
    response = `🧾 25% auto-withheld. Total: $${totalTax.toFixed(2)} set aside.`;
  } else if (lowerMsg.includes('product') || lowerMsg.includes('inventory')) {
    response = `📦 ${productCount} products in inventory. Add more in Products tab.`;
  } else if (lowerMsg.includes('blueprint') || lowerMsg.includes('scorp') || lowerMsg.includes('ein')) {
    response = `🗺️ Milestones: EIN at $5K | LLC at $10K | S-Corp at $50K\nCurrent revenue: $${totalRevenue.toFixed(2)}`;
  } else {
    response = `I can help with revenue, taxes, products, or your business blueprint.\n\n💡 Pro tip: Add a Claude API key in Settings for AI-powered responses!`;
  }

  res.json({
    response,
    model: 'rule-based',
    timestamp: new Date().toISOString(),
    context: { products: productCount, orders: orderCount, revenue: totalRevenue, taxWithheld: totalTax }
  });
});

export default router;