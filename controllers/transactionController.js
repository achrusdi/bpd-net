// controllers/transactionController.js
import db from '../configs/database.js';

// Make a transaction and award points
export const makeTransaction = (req, res) => {
  const { productId } = req.body;
  const customerId = req.userId;

  const pointsEarned = 20; // Hardcoded for this example

  const query = `INSERT INTO transactions (productId, customerId, pointsEarned) VALUES (?, ?, ?)`;
  db.run(query, [productId, customerId, pointsEarned], function (err) {
    if (err) return res.status(500).send("Error processing transaction.");

    res.status(201).send({ id: this.lastID, productId, customerId, pointsEarned });
  });
};

// View all transactions for a merchant's product
export const getMerchantTransactions = (req, res) => {
  const merchantId = req.userId;

  const query = `SELECT * FROM transactions WHERE productId IN (SELECT id FROM products WHERE merchantId = ?)`;
  db.all(query, [merchantId], (err, rows) => {
    if (err) return res.status(500).send("Error fetching transactions.");
    res.status(200).send(rows);
  });
};

