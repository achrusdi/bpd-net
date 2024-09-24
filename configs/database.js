// config/database.js
import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('database/maju_mundur.db'); // In-memory DB for testing, change to a file-based DB for persistence.
// const db = new sqlite3.Database(':memory:'); // In-memory DB for testing, change to a file-based DB for persistence.

db.serialize(() => {
  db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT
  )`);

  db.run(`CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    price REAL,
    merchantId INTEGER
  )`);

  db.run(`CREATE TABLE transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    productId INTEGER,
    customerId INTEGER,
    pointsEarned INTEGER
  )`);
});

export default db;

