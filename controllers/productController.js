// controllers/productController.js
import db from '../configs/database.js';

// Create a new product
export const createProduct = (req, res) => {
  const { name, description, price } = req.body;
  const merchantId = req.userId; // Assuming userId is from the authenticated token

  const query = `INSERT INTO products (name, description, price, merchantId) VALUES (?, ?, ?, ?)`;
  db.run(query, [name, description, price, merchantId], (err) => {
    if (err) return res.status(500).send("Error creating product.");

    res.status(201).send({ id: this.lastID, name, description, price, merchantId });
  });
};

// Get all products
export const getProducts = (req, res) => {
  db.all(`SELECT * FROM products`, [], (err, rows) => {
    if (err) return res.status(500).send("Error fetching products.");
    res.status(200).send(rows);
  });
};

