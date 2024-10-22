const express = require('express');
const router = express.Router();
const CheckIn = require('../models/CheckIn');
const User = require('../models/User');

// Check-in to a carpark
router.post('/checkin', async (req, res) => {
  try {
    const { userId, carparkId, checkInTime } = req.body;

    // Check if user already has an active check-in
    const activeCheckIn = await CheckIn.findOne({ userId, checkOutTime: null });
    if (activeCheckIn) {
      return res
        .status(400)
        .json({ message: 'You already have an active check-in' });
    }

    const newCheckIn = new CheckIn({
      userId,
      carparkId,
      checkInTime,
    });

    await newCheckIn.save();
    res
      .status(201)
      .json({ message: 'Check-in successful', checkIn: newCheckIn });
  } catch (error) {
    console.error('Error during check-in:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get check-in history for a user
router.get('/checkins/:userId', async (req, res) => {
  try {
    const checkIns = await CheckIn.find({ userId: req.params.userId })
      .sort({
        checkInTime: -1,
      })
      .limit(20);
    res.json(checkIns);
  } catch (error) {
    console.error('Error fetching check-ins:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Check-out from a carpark
router.post('/checkout', async (req, res) => {
  try {
    const { userId, carparkId, checkOutTime } = req.body;
    const checkIn = await CheckIn.findOne({
      userId,
      carparkId,
      checkOutTime: null,
    });
    if (!checkIn) {
      return res.status(400).json({ message: 'No active check-in found' });
    }
    checkIn.checkOutTime = checkOutTime;
    await checkIn.save();

    // Calculate parking fee (simplified version)
    const durationInHours =
      (new Date(checkOutTime) - new Date(checkIn.checkInTime)) /
      (1000 * 60 * 60);
    const parkingFee = durationInHours * 2; // Assuming $2 per hour

    res.status(200).json({ message: 'Checked out successfully', parkingFee });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error checking out', error: error.message });
  }
});
// router.post('/checkout/:checkInId', async (req, res) => {
//   try {
//     const checkIn = await CheckIn.findById(req.params.checkInId);
//     if (!checkIn) {
//       return res.status(404).json({ message: 'Check-in not found' });
//     }

//     if (checkIn.checkOutTime) {
//       return res
//         .status(400)
//         .json({ message: 'This check-in is already checked out' });
//     }

//     checkIn.checkOutTime = new Date();
//     await checkIn.save();

//     res.json({ message: 'Check-out successful', checkIn });
//   } catch (error) {
//     console.error('Error during check-out:', error);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// Get check-in status
router.get('/checkin/:userId/:carparkId', async (req, res) => {
  try {
    const { userId, carparkId } = req.params;
    const checkIn = await CheckIn.findOne({
      userId,
      carparkId,
      checkOutTime: null,
    });
    if (checkIn) {
      res.json({ isCheckedIn: true, checkInTime: checkIn.checkInTime });
    } else {
      res.json({ isCheckedIn: false });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching check-in status',
      error: error.message,
    });
  }
});

module.exports = router;
