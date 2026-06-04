import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_PATH = path.join(__dirname, '..', 'data', 'puresole.db');

let db;

export const getDb = () => {
  if (!db) {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
  }
  return db;
};

export const query = (sql) => {
  const d = getDb();
  const trimmed = sql.trim();

  if (/^SELECT/i.test(trimmed) || /^WITH/i.test(trimmed) || /^PRAGMA/i.test(trimmed)) {
    const stmt = d.prepare(sql);
    return JSON.parse(JSON.stringify(stmt.all()));
  } else if (/^INSERT/i.test(trimmed) || /^UPDATE/i.test(trimmed) || /^DELETE/i.test(trimmed) || /^CREATE/i.test(trimmed) || /^DROP/i.test(trimmed) || /^ALTER/i.test(trimmed)) {
    const stmt = d.prepare(sql);
    const result = stmt.run();
    return { changes: result.changes, lastInsertRowid: result.lastInsertRowid };
  }
  return [];
};

export default { query, getDb };