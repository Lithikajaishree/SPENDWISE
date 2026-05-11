const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const router = express.Router();
const SECRET = 'secretkey';

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  db.run(
    `INSERT INTO users (email, password) VALUES (?, ?)`,
    [email, hashedPassword],
    function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      res.json({ message: 'User created successfully' });
    }
  );
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(400).json({ message: 'Wrong password' });
    }

    const token = jwt.sign({ id: user.id }, SECRET);

    res.json({ token });
  });
});

module.exports = router;