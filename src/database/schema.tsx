import { db } from ".";

export const initDB = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS lists (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      priority TEXT,
      color TEXT
    );
  `);

  db.execSync(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      listId INTEGER,
      name TEXT NOT NULL,
      quantity TEXT,
      notes TEXT,
      completed INTEGER DEFAULT 0
    );
  `);
};
