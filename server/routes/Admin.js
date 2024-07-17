const express = require('express');
const router = express.Router();
const EmployeeVerification = require('../models/EmployeeVerification');

// GET /api/admin/employee-verifications endpoint to fetch all employee verification data
router.get('/employee-verifications', async (req, res) => {
    try {
        const verifications = await EmployeeVerification.find();
        res.status(200).json(verifications);
    } catch (err) {
        console.error('Error fetching employee verifications:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET /api/admin/employee-verifications/:id endpoint to fetch a specific employee verification by ID
router.get('/employee-verifications/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const verification = await EmployeeVerification.findById(id);
        if (!verification) {
            return res.status(404).json({ message: 'Employee verification not found' });
        }
        res.status(200).json(verification);
    } catch (err) {
        console.error('Error fetching employee verification by ID:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
