const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

const Feedback = require('../models/Feedback');

router.post(
  '/feedback',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { userId, feedback } = req.body;
      const newFeedback = new Feedback({
        userId,
        feedback,
        image: req.files.image ? req.files.image[0].path : null,
        video: req.files.video ? req.files.video[0].path : null,
      });

      await newFeedback.save();
      res.status(201).json({ message: 'Feedback submitted successfully' });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error submitting feedback', error: error.message });
    }
  }
);

module.exports = router;
