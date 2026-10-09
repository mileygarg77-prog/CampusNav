const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER a new user
const register = (req, res) => {
  const { name, email, password } = req.body;

  // Check all fields are provided
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Please provide name, email and password' });
  }

  // Check if email already exists
  const checkSql = 'SELECT * FROM users WHERE email = ?';
  db.query(checkSql, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length > 0) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Encrypt the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Save user to database
    const insertSql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(insertSql, [name, email, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to register user' });
      }
      res.status(201).json({ message: 'User registered successfully!' });
    });
  });
};

// LOGIN existing user
const login = (req, res) => {
  const { email, password } = req.body;

  // Check all fields are provided
  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide email and password' });
  }

  // Find user by email
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = results[0];

    // Check password
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Create login token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'campusnav_secret',
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful!',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  });
};

module.exports = { register, login };