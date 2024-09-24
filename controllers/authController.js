// controllers/authController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../configs/database.js';

// Register a new user (either merchant or customer)
export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 8);

  const query = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`;
  try {
    await db.run(query, [name, email, hashedPassword, role]);
    const token = jwt.sign({ id: db.lastID }, 'supersecret', { expiresIn: 86400 });
    res.status(200).send({ auth: true, token });
  } catch (err) {
    res.status(500).send("There was a problem registering the user.");
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.get(`SELECT * FROM users WHERE email = ?`, [email]);
    if (!user) return res.status(404).send("No user found.");

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    const token = jwt.sign({ id: user.id }, 'supersecret', { expiresIn: 86400 });
    res.status(200).send({ auth: true, token });
  } catch (err) {
    res.status(500).send("Error on the server.");
  }
};

