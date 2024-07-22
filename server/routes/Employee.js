const express = require('express');
const router = express.Router();
const fetchEmployee = require('../middleware/fetchEmployee');

const createUploadMiddleware = require('../middleware/cloudinary');

const upload = createUploadMiddleware('employee_verification');

const EmployeeVerification = require('../models/EmployeeVerification');
const path = require('path');
require('dotenv').config();

// Single route for handling different types of data and file uploads
router.post('/employee-verification', fetchEmployee, upload.fields([
    { name: 'EmployeePhoto', maxCount: 1 },
    { name: 'AdhaarCard', maxCount: 1 }
]), async (req, res) => {
    try {
        const employee = req.employee;

        console.log('Request Body:', req.body);
        console.log('Files:', req.files);

        // Destructuring data from req.body
        const { hometownAddress, currentAddress, policeVerificationDetails } = req.body;

        // Prepare update object
        let updateObj = {};

        // Only add fields to updateObj if they are present in the request
        if (hometownAddress) updateObj.hometownAddress = hometownAddress;
        if (currentAddress) updateObj.currentAddress = currentAddress;
        if (policeVerificationDetails) updateObj.policeVerificationDetails = policeVerificationDetails;

        // Handle file uploads
        if (req.files.EmployeePhoto) {
            updateObj.EmployeePhoto = req.files.EmployeePhoto[0].path;
        }
        if (req.files.AdhaarCard) {
            updateObj.AdhaarCard = req.files.AdhaarCard[0].path;
        }

        console.log("Update Object:", updateObj);

        // Find and update the employee verification data
        const updatedEmployee = await EmployeeVerification.findOneAndUpdate(
            { _id: employee._id },
            { $set: updateObj },
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({ 
            message: 'Employee verification data updated successfully',  
            updatedEmployee: updatedEmployee.toObject()
        });
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
