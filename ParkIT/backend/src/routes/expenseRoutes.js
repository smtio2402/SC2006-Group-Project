const express = require('express');
const router = express.Router();
const CheckIn = require('../models/CheckIn');

router.get('/expenses/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const checkIns = await CheckIn.find({
      userId: userId,
      checkInTime: { $gte: oneYearAgo },
      checkOutTime: { $ne: null },
    });

    const expensesByMonth = {};
    let totalExpense = 0;

    checkIns.forEach((checkIn) => {
      const monthYear = `${
        checkIn.checkInTime.getMonth() + 1
      }/${checkIn.checkInTime.getFullYear()}`;
      const duration =
        (checkIn.checkOutTime - checkIn.checkInTime) / (1000 * 60 * 60); // in hours
      const expense = duration * 2; // Assuming $2 per hour

      if (!expensesByMonth[monthYear]) {
        expensesByMonth[monthYear] = 0;
      }
      expensesByMonth[monthYear] += expense;
      totalExpense += expense;
    });

    const expenses = Object.entries(expensesByMonth)
      .map(([month, amount]) => ({
        month,
        amount: parseFloat(amount.toFixed(2)),
      }))
      .sort((a, b) => {
        const [aMonth, aYear] = a.month.split('/');
        const [bMonth, bYear] = b.month.split('/');
        return new Date(bYear, bMonth - 1) - new Date(aYear, aMonth - 1);
      });

    const averageExpense =
      totalExpense / Object.keys(expensesByMonth).length || 0;

    res.json({
      expenses,
      totalExpense: parseFloat(totalExpense.toFixed(2)),
      averageExpense: parseFloat(averageExpense.toFixed(2)),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error calculating expenses', error: error.message });
  }
});

module.exports = router;
