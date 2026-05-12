const express = require('express');
const db = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, (req, res) => {
  const { month, limit_amount } = req.body;

  db.run(
    `INSERT INTO budgets (month, limit_amount, user_id)
     VALUES (?, ?, ?)`,
    [month, limit_amount, req.user.id],
    function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      res.json({ message: 'Budget saved' });
    }
  );
});

router.get('/', authMiddleware, (req, res) => {
  const { month } = req.query;

  db.get(
    `SELECT * FROM budgets WHERE user_id = ? AND month = ? ORDER BY id DESC LIMIT 1`,
    [req.user.id, month],
    (err, row) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      res.json(row || null);
    }
  );
});

module.exports = router;