const express = require('express');
const EmployeeVerification = require('../models/EmployeeVerification');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password is required').exists()
], async (req, res) => {
    // If there are errors, return the bad request and the errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await EmployeeVerification.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Email not Registered" });
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            return res.status(400).json({ error: "Incorrect Password" });
        }

        const data = {
            user: {
                id: user.id,
                isAdmin: user.isAdmin
            }
        };

        const authToken = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ authToken, isAdmin: user.isAdmin });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some Error Occurred");
    }
});

module.exports = router;
