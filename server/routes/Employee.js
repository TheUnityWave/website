const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const fetchEmployee = require('../middleware/fetchEmployee');
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
        folder: 'uploads',
        allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'],
        public_id: (req, file) => {
            const fileName = path.parse(file.originalname).name;
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            return `${fileName}-${uniqueSuffix}`;
        },
    },
});

// Multer upload configuration
const upload = multer({ storage: storage });

// Single route for handling different types of data and file uploads
router.post('/employee-verification', fetchEmployee, upload.fields([
    { name: 'EmployeePhoto', maxCount: 1 },
    { name: 'AdhaarCard', maxCount: 1 }
]), async (req, res) => {
    try {
        const employee = req.employee;

        console.log('Request Body:', req.body);
        console.log('Files:', req.files); // Check files received

        // Destructuring data from req.body
        const { hometownAddress, currentAddress, policeVerificationDetails } = req.body;

        // Collect file paths from Cloudinary
        const EmployeePhoto = req.files.EmployeePhoto ? req.files.EmployeePhoto[0].path : null;
        const AdhaarCard = req.files.AdhaarCard ? req.files.AdhaarCard[0].path : null;

        // Find and update the employee verification data
        const updatedEmployee = await EmployeeVerification.findOneAndUpdate(
            { _id: employee._id },
            {
                $set: {
                    EmployeePhoto,
                    hometownAddress,
                    currentAddress,
                    policeVerificationDetails,
                    AdhaarCard,
                    // Update verification status as needed
                    // isHometownVerified: !!hometownAddress,
                    // isCurrentAddressVerified: !!currentAddress,
                    // isAadhaarUploaded: !!AdhaarCard,
                    // isQuestionsVerified: !!policeVerificationDetails
                }
            },
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({ message: 'Employee verification data updated successfully', updatedEmployee });
    } catch (err) {
        console.error('Error:', err.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/get-employee', fetchEmployee, async (req, res) => {
    try {
        const employee = req.employee;
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (error) {
        console.error('Error fetching employee:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/user', async (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await EmployeeVerification.findById(decoded.id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
});

module.exports = router;
