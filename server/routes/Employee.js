const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const EmployeeVerification = require('../models/EmployeeVerification');
const path = require('path');
require('dotenv').config();

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Cloudinary storage configuration
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads', // Specify the folder in Cloudinary where files will be uploaded
        allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'], // Specify allowed formats
        public_id: (req, file) => { // Specify how each file should be named in Cloudinary
            const fileName = path.parse(file.originalname).name;
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            return `${fileName}-${uniqueSuffix}`;
        },
    },
});

// Multer upload configuration
const upload = multer({ storage: storage });

// POST /api/employee/employee-verification endpoint to handle form data and file upload
router.post('/employee-verification', upload.fields([
    { name: 'EmployeePhoto', maxCount: 1 },
    // { name: 'AdhaarCard', maxCount: 1 }
]), async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        console.log('Files:', req.files); // Check files received

        // Ensure req.files is defined and contains expected fields
        // if (!req.files || !req.files.EmployeePhoto || !req.files.AdhaarCard) {
        //     throw new Error('Uploaded files not found');
        // }

        // Destructuring data from req.body
        const { hometownAddress, currentAddress, policeVerificationDetails } = req.body;

        // Get file URLs from Cloudinary
        const EmployeePhoto = req.files.EmployeePhoto[0].path;
        // const AdhaarCard = req.files.AdhaarCard[0].path;

        // Creating a new instance of EmployeeVerification
        const newVerification = new EmployeeVerification({
            EmployeePhoto,
            hometownAddress,
            currentAddress,
            policeVerificationDetails,
            // AdhaarCard
        });

        // Saving the new instance to MongoDB
        await newVerification.save();

        res.status(200).json({ message: 'Employee verification data saved successfully' });
    } catch (err) {
        console.error('Error:', err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;