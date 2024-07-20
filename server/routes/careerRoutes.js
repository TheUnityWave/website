const express = require('express');
const router = express.Router();
const Career = require('../models/Career');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const path = require('path');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'resumes',
    resource_type: 'auto',
    allowed_formats: ['pdf', 'doc', 'docx'], // Add other formats if needed
    public_id: (req, file) => {
      const fileName = path.parse(file.originalname).name;
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      return `${fileName}-${uniqueSuffix}`;
    },
  },
});

const upload = multer({ storage: storage });

router.post('/', upload.single('resumeFile'), async (req, res) => {

  try {
    const { firstName, lastName, mobileNumber, email, experience, jobCategory } = req.body;
    let resumeFile = null;
    let viewableResumeFile = null;

    if (req.file) {
      resumeFile = req.file.path;
      
      // Create a viewable version (PDF)
      const fileName = path.parse(req.file.originalname).name;
      const result = await cloudinary.uploader.upload(resumeFile, {
        resource_type: 'raw',
        format: 'pdf',
        pages: true,
        public_id: `${fileName}_viewable`
      });
      viewableResumeFile = result.secure_url;

      console.log('Original file uploaded to Cloudinary:', resumeFile);
      console.log('Viewable file created:', viewableResumeFile);
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
      viewableResumeFile,
    });

    await newCareer.save();

    res.status(201).json({ 
      message: 'Application submitted successfully', 
      fileUrl: resumeFile,
      viewableFileUrl: viewableResumeFile 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting application', error: error.message });
  }
});

module.exports = router;