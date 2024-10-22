const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongoose = require('mongoose');

// Add to favorites
router.post('/favorites/add', async (req, res) => {
  try {
    const { userId, carparkId } = req.body;
    console.log('Received request to add favorite:', { userId, carparkId });

    if (!userId || !carparkId) {
      return res
        .status(400)
        .json({ message: 'userId and carparkId are required' });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId format' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!user.favorites) {
      user.favorites = []; // Initialize the array if it's undefined
    }

    if (!user.favorites.includes(carparkId)) {
      user.favorites.push(carparkId);
      await user.save();
      console.log('Favorite added successfully');
    } else {
      console.log('Carpark already in favorites');
    }

    res
      .status(200)
      .json({ message: 'Added to favorites', favorites: user.favorites });
  } catch (error) {
    console.error('Error adding to favorites:', error);
    res.status(500).json({
      message: 'Error adding to favorites',
      error: error.message,
      stack: error.stack,
    });
  }
});

// Remove from favorites
router.post('/favorites/remove', async (req, res) => {
  try {
    const { userId, carparkId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.favorites = user.favorites.filter((id) => id !== carparkId);
    await user.save();
    res
      .status(200)
      .json({ message: 'Removed from favorites', favorites: user.favorites });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error removing from favorites', error: error.message });
  }
});

// Get user's favorites
router.get('/favorites/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user.favorites);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching favorites', error: error.message });
  }
});

module.exports = router;
