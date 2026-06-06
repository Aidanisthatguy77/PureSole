import db from './db.js';
import bcrypt from 'bcryptjs';

const initSchema = () => {
  const tables = [
    'CREATE TABLE IF NOT EXISTS products (id TEXT PRIMARY KEY, name TEXT NOT NULL, description TEXT, category TEXT, price REAL NOT NULL, cost REAL DEFAULT 0, images TEXT DEFAULT \'[]\', sizes TEXT DEFAULT \'[]\', stock INTEGER DEFAULT 0, status TEXT DEFAULT \'draft\', createdAt TEXT DEFAULT (datetime(\'now\')))',
    'CREATE TABLE IF NOT EXISTS orders (id TEXT PRIMARY KEY, customerName TEXT, customerEmail TEXT, customerAddress TEXT, items TEXT DEFAULT \'[]\', total REAL NOT NULL, taxWithheld REAL DEFAULT 0, profit REAL DEFAULT 0, status TEXT DEFAULT \'pending\', tracking TEXT, createdAt TEXT DEFAULT (datetime(\'now\')))',
    'CREATE TABLE IF NOT EXISTS expenses (id TEXT PRIMARY KEY, description TEXT, amount REAL, category TEXT, date TEXT, receipt TEXT)',
    'CREATE TABLE IF NOT EXISTS financial (id TEXT PRIMARY KEY, type TEXT, status TEXT, value REAL, notes TEXT, updatedAt TEXT DEFAULT (datetime(\'now\')))',
    'CREATE TABLE IF NOT EXISTS config (key TEXT PRIMARY KEY, value TEXT)'
  ];

  for (const table of tables) {
    db.query(table);
  }

  // Set default config
  const defaults = [
    { key: 'tax_rate', value: '0.25' },
    { key: 'autotropolis_endpoint', value: '' },
    { key: 'autotropolis_api_key', value: '' },
  ];
  for (const conf of defaults) {
    db.query(`INSERT OR IGNORE INTO config (key, value) VALUES ('${conf.key}', '${conf.value}')`);
  }

  // Set default admin password: A@070610A@070610
  const existingPass = db.query("SELECT value FROM config WHERE key = 'admin_password'");
  if (existingPass.length === 0) {
    const hash = bcrypt.hashSync('A@070610A@070610', 10);
    db.query(`INSERT INTO config (key, value) VALUES ('admin_password', '${hash}')`);
    db.query(`INSERT INTO config (key, value) VALUES ('setup_complete', 'true')`);
    console.log('Default admin password set: A@070610A@070610');
  }

  console.log('Database initialized successfully');
};

export default initSchema;