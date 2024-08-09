const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const EmployeeVerification = require('../models/EmployeeVerification');
const GetInTouch = require('../models/getintouch');
const JobApplication = require('../models/Career');
const Ticket = require('../models/RaiseTicket');
const Career = require('../models/Career');
const Jobs = require('../models/Jobs');
const { authorizeAdmin } = require('../middleware/authorizeAdmin');

const { check, validationResult } = require('express-validator');
// Endpoint to fetch all the job applications.
router.get('/job-applications', authorizeAdmin, async (req, res) => {
    try {
        const applications = await Career.find().sort({ createdAt: -1 });
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching job applications', error: error.message });
    }
});


// Endpoint to fetch all the employees.
router.get('/employees', authorizeAdmin, async (req, res) => {
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

        const career = await Career.findById(req.params.id);
        if (!career) {
            return res.status(404).json({ message: 'Career application not found' });
        }

        if (career.sendCredentials) {
            return res.status(400).json({ message: 'Credentials have already been sent for this application' });
        }
        // console.log("sendCredentials value: ", career.sendCredentials)
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
            // console.log("SENT : " + info.response);
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
            policeVerification: ''
        });

        await newEmployee.save();

        // Update the sendCredentials flag in the Career model
        career.sendCredentials = true;
        await career.save();

        // console.log("sendCredentials value: ", career.sendCredentials)

        res.json({ message: 'Credentials sent and employee details saved' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending credentials', error });
    }
});


router.get('/get-in-touch', authorizeAdmin, async (req, res) => {
    try {
        const getInTouchRequests = await GetInTouch.find().sort({ createdAt: -1 });
        res.json(getInTouchRequests);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching Get in Touch requests', error: error.message });
    }
});

// Update isContacted status
router.patch('/get-in-touch/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { isContacted } = req.body;

        const updatedRequest = await GetInTouch.findByIdAndUpdate(
            id,
            { isContacted },
            { new: true }
        );

        if (!updatedRequest) {
            return res.status(404).json({ message: 'Request not found' });
        }

        res.json(updatedRequest);
    } catch (error) {
        console.error('Error updating get in touch request:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/tickets',  async (req, res) => {
    try {
        const { userType } = req.query;
        let tickets;

        if (userType) {
            tickets = await Ticket.find({ userType }).sort({ date: -1 });
        } else {
            tickets = await Ticket.find().sort({ date: -1 });
        }
        res.status(200).json(tickets);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

async function generateTicketNumber() {
    const date = new Date();
    const year = date.getFullYear().toString().substr(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    const baseTicketNumber = `TKT${year}${month}${day}`;

    let ticketNumber;
    let counter = 1;

    do {
        ticketNumber = `${baseTicketNumber}${counter.toString().padStart(3, '0')}`;
        const existingTicket = await Ticket.findOne({ ticketNumber });
        if (!existingTicket) {
            return ticketNumber;
        }
        counter++;
    } while (counter < 1000);

    throw new Error('Unable to generate unique ticket number');
}

router.post('/tickets', async (req, res) => {
    const { name, company, email, mobile, userType, complaint } = req.body;

    try {
        const ticketNumber = await generateTicketNumber();

        const newTicket = new Ticket({
            ticketNumber,
            name,
            company,
            email,
            mobile,
            userType,
            complaint,
        });

        // Configure nodemailer
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const options = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your Ticket Has Been Raised - The Unity Wave',
            text: `
Dear ${name},

We hope this email finds you well.

We are writing to confirm that your ticket/issue has been successfully raised in our system. Our team has received the details you provided and we want to assure you that we are taking it seriously.

Ticket Details:
- Ticket Number: ${ticketNumber}
- Subject: ${complaint}
- Date Submitted: ${new Date().toDateString()}

Our dedicated support team will review your ticket promptly and work diligently to address your concerns. We aim to provide a resolution or update within 24-48 hours.

If you have any additional information or updates regarding this issue, please don't hesitate to reply to this email. Your input is valuable and will help us resolve the matter more efficiently.

We appreciate your patience and understanding as we work on your request. Rest assured that we are committed to providing you with the best possible support.

Thank you for bringing this to our attention. We value your ${userType === 'client' ? 'business' : 'feedback'} and look forward to resolving this matter for you.

Best regards,
The Unity Wave Support Team

This is an automated message. Please do not reply directly to this email. If you need to provide additional information, please reply to the original ticket or contact our support team at support@theunitywave.com.
            `
        };

        transporter.sendMail(options, function (err, info) {
            if (err) {
                console.log(err);
                return;
            }
            // console.log("SENT : " + info.response);
        });

        const ticket = await newTicket.save();
        res.status(200).json(ticket);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update isResolved status
router.patch('/tickets/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { isResolved } = req.body;

        const updatedRequest = await Ticket.findByIdAndUpdate(
            id,
            { isResolved },
            { new: true }
        );

        if (!updatedRequest) {
            return res.status(404).json({ message: 'Request not found' });
        }

        // Send email notification if the ticket is resolved
        if (isResolved) {
            // Configure nodemailer
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            const options = {
                from: process.env.EMAIL_USER,
                to: updatedRequest.email,
                subject: 'Your Ticket Has Been Resolved - The Unity Wave',
                text: `
Dear ${updatedRequest.name},

We hope this email finds you well.

We are pleased to inform you that your ticket/issue has been resolved. 

Ticket Details:
- Ticket Number: ${updatedRequest.ticketNumber}
- Subject: ${updatedRequest.complaint}
- Date Resolved: ${new Date().toDateString()}

If you have any further questions or if the issue persists, please do not hesitate to reach out to us.

Thank you for your patience and understanding. We value your ${updatedRequest.userType === 'client' ? 'business' : 'feedback'}.

Best regards,
The Unity Wave Support Team

This is an automated message. Please do not reply directly to this email. If you need to provide additional information, please reply to the original ticket or contact our support team at support@theunitywave.com.
                `
            };

            transporter.sendMail(options, function (err, info) {
                if (err) {
                    console.log(err);
                    return;
                }
                // console.log("SENT : " + info.response);
            });
        }

        res.json(updatedRequest);
    } catch (error) {
        console.error('Error updating ticket:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/postajob', [
    authorizeAdmin,
    [
        check('title', 'Title is required').not().isEmpty(),
        // check('department', 'Department is required').not().isEmpty(),
        check('location', 'Location is required').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty(),
        // check('requirements', 'At least one requirement is needed').isArray({ min: 1 })
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Check if user is admin
       
        const { title, location, description } = req.body;

        const newJob = new Jobs({
            title,
            // department,
            location,
            description,
            // requirements
        });

        const job = await newJob.save();
        res.status(200).json(job);

    } catch (err) {
        console.error(err.message);
        console.log(err.message);
        res.status(500).send('Server Error');
    }
}
);


module.exports = router;
