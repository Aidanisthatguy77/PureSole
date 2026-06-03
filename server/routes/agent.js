import express from 'express';
import db from '../db.js';
import { authenticateToken } from '../middleware.js';

const router = express.Router();

router.post('/chat', authenticateToken, (req, res) => {
  const { message } = req.body;
  
  // Get current business data to give context
  const productCount = db.query("SELECT COUNT(*) as count FROM products")[0]?.count || 0;
  const orderCount = db.query("SELECT COUNT(*) as count FROM orders")[0]?.count || 0;
  const totalRevenue = db.query("SELECT COALESCE(SUM(total), 0) as total FROM orders")[0]?.total || 0;
  const totalTax = db.query("SELECT COALESCE(SUM(taxWithheld), 0) as total FROM orders")[0]?.total || 0;
  
  const lowerMsg = (message || '').toLowerCase();
  
  let response = '';
  
  if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
    response = `Hey there! 👋 I'm your Pure Sole AI Agent. Here's your current snapshot:
• ${productCount} products in inventory
• ${orderCount} orders processed
• $${totalRevenue.toFixed(2)} total revenue
• $${totalTax.toFixed(2)} tax withheld (25%)

How can I help you run your business?`;
    
  } else if (lowerMsg.includes('revenue') || lowerMsg.includes('sales') || lowerMsg.includes('money')) {
    response = `💰 Revenue Summary:
• Total Revenue: $${totalRevenue.toFixed(2)}
• Total Tax Withheld (25%): $${totalTax.toFixed(2)}
• Net (after tax): $${(totalRevenue - totalTax).toFixed(2)}
• Products Listed: ${productCount}
• Orders Fulfilled: ${orderCount}

Want me to deep dive into any of these?`;
    
  } else if (lowerMsg.includes('tax') || lowerMsg.includes('quarter')) {
    const taxRate = db.query("SELECT value FROM config WHERE key = 'tax_rate'")[0]?.value || '0.25';
    response = `🧾 Tax Automation Status:
• Auto-withhold rate: ${(parseFloat(taxRate) * 100)}%
• Total tax set aside: $${totalTax.toFixed(2)}
• Next quarterly payment: Check the Taxes page for details
• You're all set — no scrambling on April 15th!`;
    
  } else if (lowerMsg.includes('product') || lowerMsg.includes('inventory') || lowerMsg.includes('stock')) {
    response = `📦 Inventory Status:
• ${productCount} products total
• Check the Products page to manage listings
• Add new products, update prices, toggle live/draft
• Pro tip: Keep stock levels accurate for customer trust!`;
    
  } else if (lowerMsg.includes('blueprint') || lowerMsg.includes('scorp') || lowerMsg.includes('ein') || lowerMsg.includes('llc')) {
    response = `🗺️ Business Blueprint Progress:
Your roadmap to building a legit business:
📍 Launch Pure Sole store ✅
📍 $5,000 → Get your EIN (protects SSN)
📍 $10,000 → Form your LLC (protects assets)
📍 $50,000 → S-Corp election (saves on taxes)
💰 Ongoing → Roth IRA, Business Credit, Wealth building

Current revenue: $${totalRevenue.toFixed(2)}
Next milestone: ${totalRevenue < 5000 ? 'Get your EIN at $5,000!' : totalRevenue < 10000 ? 'Form your LLC at $10,000!' : 'Consider S-Corp at $50,000!'}`;
    
  } else if (lowerMsg.includes('help') || lowerMsg.includes('what can you')) {
    response = `🤖 I'm your Pure Sole business co-pilot! I can help with:

💵 Revenue & sales overview
🧾 Tax tracking & quarterly planning
📦 Inventory & product management
🗺️ Business blueprint & milestones
📊 Analytics & performance
🌐 Autotropolis HQ sync setup

Just ask me about any of these! Try: "How's my revenue looking?" or "What's my tax status?"`;
    
  } else {
    response = `I understand you're asking about "${message.substring(0, 50)}". Here's what I know:

Your Pure Sole business has ${productCount} products, ${orderCount} orders, and $${totalRevenue.toFixed(2)} in total revenue with $${totalTax.toFixed(2)} set aside for taxes.

Try asking me about: revenue, taxes, products, blueprint, or type "help" to see what I can do!`;
  }

  res.json({
    response,
    timestamp: new Date().toISOString(),
    context: {
      products: productCount,
      orders: orderCount,
      revenue: totalRevenue,
      taxWithheld: totalTax
    }
  });
});

export default router;