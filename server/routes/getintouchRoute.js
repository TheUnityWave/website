const express = require('express');
const router = express.Router();
const GetInTouch = require('../models/getintouch');
const nodemailer = require('nodemailer');

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
router.post('/', async (req, res) => {
    const { firstName, lastName, email, mobile, message } = req.body;
    const getintouch = new GetInTouch({
        firstName,
        lastName,
        email,
        mobile,
        message
    });
    try {
        await getintouch.save();

        // Prepare email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: 'New Get in Touch Request',
            text: `
                New Get in Touch request from:
                Name: ${firstName} ${lastName}
                Email: ${email}
                Mobile: ${mobile}
                Message: ${message}
            `
        };

        // Send email
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log('Error sending email: ', error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.status(201).send(getintouch);
    } catch (error) {
        console.log('Error submitting form: ', error);
        res.status(500).json({message: 'Error submitting data'})
    }
});

module.exports = router;