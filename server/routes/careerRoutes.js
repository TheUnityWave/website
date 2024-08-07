const express = require('express');
const router = express.Router();
const Career = require('../models/Career');
const cloudinary = require('cloudinary').v2;
const path = require('path');

const createUploadMiddleware = require('../middleware/cloudinary');
const Jobs = require('../models/Jobs');

const upload = createUploadMiddleware('resumes');


router.post('/', upload.single('resumeFile'), async (req, res) => {

  try {
    const { firstName, lastName, mobileNumber, email, experience, jobCategory } = req.body;
    let resumeFile = null;
    // let viewableResumeFile = null;

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
      // viewableResumeFile = result.secure_url;

      // console.log('Original file uploaded to Cloudinary:', resumeFile);
      // console.log('Viewable file created:', viewableResumeFile);
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
      // viewableResumeFile,
    });

    await newCareer.save();

    res.status(201).json({ 
      message: 'Application submitted successfully', 
      fileUrl: resumeFile,
      // viewableFileUrl: viewableResumeFile 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting application', error: error.message });
  }
});

router.get('/all', async (req, res) => {
  try {
    const jobs = await Jobs.find({ isActive: true }).sort({ postedDate: -1 });
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const job = await Jobs.findById(req.params.id);
    
    if (!job) {
      console.log(job);
      
      return res.status(404).json({ msg: 'Job not found' });
    }

    res.json(job);
  } catch (err) {
    console.error(err.message);
    
    // Check if the error is due to an invalid ObjectId
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Job not found' });
    }
    
    res.status(500).send('Server Error');
  }
});

module.exports = router;