const express = require('express');
const router = express.Router();
const CheckIn = require('../models/CheckIn');

router.get('/parking-history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const parkingHistory = await CheckIn.find({ userId })
      .sort({ checkInTime: -1 }) // Sort by check-in time, most recent first
      .limit(20);

    res.json(parkingHistory);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching parking history',
      error: error.message,
    });
  }
});

module.exports = router;
