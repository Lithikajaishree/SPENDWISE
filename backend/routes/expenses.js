id="7w2qla"
const express = require("express");
const router = express.Router();

const db = require("../config/db");
const auth = require("../middleware/authMiddleware");


// ADD EXPENSE
router.post("/", auth, (req, res) => {
    const { amount, description, category, date } = req.body;

    db.run(
        `INSERT INTO expenses (amount, description, category, date, user_id)
         VALUES (?, ?, ?, ?, ?)`,
        [amount, description, category, date, req.user.id],
        function (err) {
            if (err) {
                return res.status(400).json({
                    error: err.message
                });
            }

            res.json({
                message: "Expense added successfully"
            });
        }
    );
});


// GET ALL EXPENSES
router.get("/", auth, (req, res) => {
    db.all(
        `SELECT * FROM expenses WHERE user_id = ? ORDER BY date DESC`,
        [req.user.id],
        (err, rows) => {
            if (err) {
                return res.status(400).json({
                    error: err.message
                });
            }

            res.json(rows);
        }
    );
});


// DELETE EXPENSE
router.delete("/:id", auth, (req, res) => {
    db.run(
        `DELETE FROM expenses WHERE id = ? AND user_id = ?`,
        [req.params.id, req.user.id],
        function (err) {
            if (err) {
                return res.status(400).json({
                    error: err.message
                });
            }

            res.json({
                message: "Expense deleted",
                deleted: this.changes
            });
        }
    );
});

module.exports = router;
