import Database from "better-sqlite3";

const db = new Database("database.sqlite");

// Create table if not exists
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    subscribed INTEGER DEFAULT 0,
    subscribedAt TEXT,
    subscribedUntil TEXT,
    dailyCharacters INTEGER DEFAULT 0,
    dailyReset TEXT,
    monthlyCharacters INTEGER DEFAULT 0,
    monthlyReset TEXT
  )
`);

// Add missing columns safely
const existingColumns = db
  .prepare("PRAGMA table_info(users)")
  .all()
  .map((c) => c.name);

const addColumnIfMissing = (column, definition) => {
  if (!existingColumns.includes(column)) {
    db.exec(`ALTER TABLE users ADD COLUMN ${column} ${definition}`);
  }
};

addColumnIfMissing("subscribedAt", "TEXT");
addColumnIfMissing("subscribedUntil", "TEXT");

console.log("Migration completed successfully.");
