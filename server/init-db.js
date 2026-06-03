import db from './db.js';
import bcrypt from 'bcryptjs';

const initSchema = () => {
  const tables = [
    `CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      category TEXT,
      price REAL NOT NULL,
      cost REAL DEFAULT 0,
      images TEXT DEFAULT '[]',
      sizes TEXT DEFAULT '[]',
      stock INTEGER DEFAULT 0,
      status TEXT DEFAULT 'draft',
      createdAt TEXT DEFAULT (datetime('now'))
    )`,
    `CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      customerName TEXT,
      customerEmail TEXT,
      customerAddress TEXT,
      items TEXT DEFAULT '[]',
      total REAL NOT NULL,
      taxWithheld REAL DEFAULT 0,
      profit REAL DEFAULT 0,
      status TEXT DEFAULT 'pending',
      tracking TEXT,
      createdAt TEXT DEFAULT (datetime('now'))
    )`,
    `CREATE TABLE IF NOT EXISTS expenses (
      id TEXT PRIMARY KEY,
      description TEXT,
      amount REAL,
      category TEXT,
      date TEXT,
      receipt TEXT
    )`,
    `CREATE TABLE IF NOT EXISTS financial (
      id TEXT PRIMARY KEY,
      type TEXT,
      status TEXT,
      value REAL,
      notes TEXT,
      updatedAt TEXT DEFAULT (datetime('now'))
    )`,
    `CREATE TABLE IF NOT EXISTS config (
      key TEXT PRIMARY KEY,
      value TEXT
    )`
  ];

  for (const table of tables) {
    db.query(table);
  }

  // Initial config
  const defaultConfig = [
    { key: 'tax_rate', value: '0.25' },
    { key: 'autotropolis_endpoint', value: '' },
    { key: 'autotropolis_api_key', value: '' },
    { key: 'setup_complete', value: 'false' }
  ];

  for (const conf of defaultConfig) {
    try {
      db.query(`INSERT OR IGNORE INTO config (key, value) VALUES ('${conf.key}', '${conf.value}')`);
    } catch (e) {
      console.error(`Error setting default config ${conf.key}:`, e);
    }
  }

  console.log('Database initialized successfully');
};

export default initSchema;
