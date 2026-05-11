const express = require('express');
const db = require('../config/db');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', auth, (req, res) => {
  const { month, limit_amount } = req.body;

  db.run(
    `INSERT INTO budgets (month, limit_amount, user_id)
     VALUES (?, ?, ?)`,
    [month, limit_amount, req.user.id],
    function () {
      res.json({ message: 'Budget saved' });
    }
  );
});

module.exports = router;