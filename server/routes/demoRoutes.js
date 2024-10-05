const express = require('express');
const DemoForm = require('../models/DemoFormModel');
const router = express.Router();


// Route for submitting the demo form
router.post('/', async (req, res) => {
    const { fullName, email, phone } = req.body;

    try {
        // Create a new demo entry
        const newDemo = new DemoForm({
            fullName,
            email,
            phone
        });

        // Save the demo to the database
        await newDemo.save();

        // Send success response
        res.status(201).json({
            success: true,
            message: "DemoForm successfully submitted",
            data: newDemo
        });
    } catch (error) {
        console.error("Error submitting DemoForm:", error);
        // Send error response
        res.status(500).json({
            success: false,
            message: "Server error. Please try again later."
        });
    }
});

module.exports = router;
