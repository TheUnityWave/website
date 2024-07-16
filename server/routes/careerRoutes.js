// routes/careerRoutes.js
const express = require('express');
const router = express.Router();
const Career = require('../models/career');
const multer = require('multer');
const path = require('path');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// POST route to submit a career application
router.post('/', upload.single('resumeFile'), async (req, res) => {
  try {
    const { firstName, lastName, mobileNumber, email, experience, jobCategory } = req.body;
    const resumeFile = req.file.path;

    const newCareer = new Career({
      firstName,
      lastName,
      mobileNumber,
      email,
      experience,
      jobCategory,
      resumeFile,
    });

    await newCareer.save();
    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting application', error: error.message });
  }
});

module.exports = router;