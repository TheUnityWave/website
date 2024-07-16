const express = require('express');
const router = express.Router();
const Career = require('../models/Career');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer storage configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'resumes',
    // allowed_formats: ['pdf', 'doc', 'docx'],
    resource_type: 'auto',
    format: async (req, file) => 'pdf', // supports promises as well
    // transformation: [{ quality: 'auto' }],
    public_id: (req, file) => file.filename,
  },
});

const upload = multer({ storage: storage });

// POST route to submit a career application
router.post('/', upload.single('resumeFile'), async (req, res) => {
  console.log('Received career application submission');
  console.log('Request body:', req.body);
  console.log('File:', req.file);

  try {
    const { firstName, lastName, mobileNumber, email, experience, jobCategory } = req.body;
    let resumeFile = null;

    if (req.file) {
      // Construct the Cloudinary URL with PDF format
      resumeFile = cloudinary.url(req.file.filename, {
        format: 'pdf',
        resource_type: 'auto'
      });
      console.log('File uploaded to Cloudinary:', resumeFile);
    } else {
      console.log('No file was uploaded');
    }

    const newCareer = new Career({
      firstName,
      lastName,
      mobileNumber,
      email,
      experience,
      jobCategory,
      resumeFile,
    });

    console.log('Saving new career application to database');
    await newCareer.save();
    console.log('Career application saved successfully');

    res.status(201).json({ message: 'Application submitted successfully', fileUrl: resumeFile });
  } catch (error) {
    console.error('Error in career application:', error);
    res.status(500).json({ message: 'Error submitting application', error: error.message });
  }
});

module.exports = router;