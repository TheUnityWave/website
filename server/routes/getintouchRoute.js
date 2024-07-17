const express = require('express');
const router = express.Router();
const GetInTouch = require('../models/getintouch');

router.post('/', async (req, res) => {
    const { firstName, lastName, email, message } = req.body;
    const getintouch = new GetInTouch({
        firstName,
        lastName,
        email,
        message
    });
    try {
        await getintouch.save();
        console.log('Form submitted');
        res.status(201).send(getintouch);
    } catch (error) {
        console.log('Form not submitted');
        res.status(500).json({message: 'Error submitting data'})
    }
});

module.exports = router;