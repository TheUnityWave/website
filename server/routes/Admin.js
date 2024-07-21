const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const EmployeeVerification = require('../models/EmployeeVerification');
const GetInTouch = require('../models/getintouch');
const JobApplication = require('../models/Career'); 
const Career = require('../models/Career');
const fetchEmployee = require('../middleware/fetchEmployee');


// Endpoint to fetch all the job applications.
router.get('/job-applications', async (req, res) => {
    try {
        const applications = await Career.find();
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching job applications', error: error.message });
    }
});


// Endpoint to fetch all the employees.
router.get('/employees', async (req, res) => {
    try {
        const employees = await EmployeeVerification.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employees', error });
    }
});


// Endpoint to update isAdmin field. (To make an employee Admin)
router.put('/employees/:id', async (req, res) => {
    try {
        const employee = await EmployeeVerification.findByIdAndUpdate(
            req.params.id,
            { isAdmin: true },
            { new: true }
        );
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Error updating employee', error });
    }
});


// Function to generate a random password.
const generatePassword = () => {
    return Math.random().toString(36).slice(-8); // Simple example, improve as needed
};

// Endpoint to send credentials and save details of employee.
router.post('/send-credentials/:id', async (req, res) => {
    try {
        const application = await JobApplication.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ message: 'Job application not found' });
        }

        const password = generatePassword();
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

        // Configure nodemailer
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER, // Your email address
                pass: process.env.EMAIL_PASS  // Your email password
            }
        });

        const options = {
            from: process.env.EMAIL_USER,
            to: application.email,
            subject: 'Your Account Credentials',
            text: `Your account has been created. Here are your credentials:\n\nEmail: ${application.email}\nPassword: ${password}\n\nPlease change your password after logging in.`
        };

        transporter.sendMail(options, function (err, info) {
            if (err) {
                console.log(err);
                return;
            }
            console.log("SENT : " + info.response);
        });

        const newEmployee = new EmployeeVerification({
            firstName: application.firstName,
            lastName: application.lastName,
            email: application.email,
            mobile: application.mobileNumber,
            job: application.jobCategory,
            experience: application.experience,
            password: hashedPassword, // Save the hashed password
            isAdmin: false,
            EmployeePhoto: '', // Update if you have a photo
            hometownAddress: '', // Update if you have an address
            currentAddress: '', // Update if you have an address
            AdhaarCard: '', // Update if you have Adhaar card
            policeVerificationDetails: {
                question1: '',
                question2: '',
                question3: ''
            }
        });

        await newEmployee.save();

        res.json({ message: 'Credentials sent and employee details saved' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending credentials', error });
    }
});


router.get('/get-in-touch', async (req, res) => {
    try {
        const getInTouchRequests = await GetInTouch.find().sort({ createdAt: -1 });
        res.json(getInTouchRequests);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Get in Touch requests', error: error.message });
    }
});

module.exports = router;
