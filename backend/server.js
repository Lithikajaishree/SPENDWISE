const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const budgetRoutes = require('./routes/budget');
const expensesRoutes = require('./routes/expenses');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/budget', budgetRoutes);
app.use('/expenses', expensesRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'SpendWise API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});