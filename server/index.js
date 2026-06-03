import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import initSchema from './init-db.js';

// Import Routes
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import analyticsRoutes from './routes/analytics.js';
import financialRoutes from './routes/financial.js';
import configRoutes from './routes/config.js';
import autotropolisRoutes from './routes/autotropolis.js';
import agentRoutes from './routes/agent.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize Database on Startup
try {
  initSchema();
} catch (error) {
  console.error('Failed to initialize database:', error);
}

// Serve static files from the React app build
app.use(express.static(path.join(__dirname, '../dist')));

// API Routes
app.use('/api/admin', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/financial', financialRoutes);
app.use('/api/config', configRoutes);
app.use('/api/autotropolis', autotropolisRoutes);
app.use('/api/agent', agentRoutes);

// Setup Endpoint
app.post('/api/setup', (req, res) => {
  try {
    initSchema();
    res.json({ success: true, message: 'Database schema initialized' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on http://0.0.0.0:${PORT}`);
});
