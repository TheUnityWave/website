const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const EmployeeVerification = require('../models/EmployeeVerification');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './uploads/'); // Directory where files will be stored
  },
  filename: function (req, file, cb) {
      // Generating a unique filename
      cb(null, Date.now() + path.extname(file.originalname));
  }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
      cb(null, true); // Accept the file
  } else {
      cb(new Error('File type not supported. Only images and PDF files are allowed.'), false); // Reject the file
  }
};


// Multer upload configuration
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5 MB file size limit
    }
});

// POST /api/employee/employee-verification endpoint to handle form data and file upload
router.post('/employee-verification', upload.fields([{ name: 'EmployeePhoto', maxCount: 1 }, { name: 'AdhaarCard', maxCount: 1 }]), async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        console.log('Files:', req.files); // Uploaded file details

        // Destructuring data from req.body and req.file
        const { hometownAddress, currentAddress, policeVerificationDetails } = req.body;
        const { EmployeePhoto, AdhaarCard } = req.files;

        // Creating a new instance of EmployeeVerification
        const newVerification = new EmployeeVerification({
            EmployeePhoto: EmployeePhoto[0].path,
            hometownAddress,
            currentAddress,
            policeVerificationDetails,
            AdhaarCard: AdhaarCard[0].path
        });

        // Saving the new instance to MongoDB
        await newVerification.save();
        res.status(200).json({ message: 'Employee verification data saved successfully' });
    } catch (err) {
        if (err instanceof multer.MulterError) {
            // Handling Multer errors
            console.error('Multer Error:', err);
            res.status(400).json({ message: 'File upload error', error: err.message });
        } else {
            // Handling other internal server errors
            console.error('Internal Server Error:', err);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});

module.exports = router;
