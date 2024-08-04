const jwt = require('jsonwebtoken');
const EmployeeVerification = require('../models/EmployeeVerification'); // Adjust the path as necessary

const fetchEmployee = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: "Please Authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        // console.log('JWT Data:', data); // Debugging log
        const employee = await EmployeeVerification.findById(data.user.id);
        // console.log('Employee:', employee); // Debugging log
        if (!employee) {
            return res.status(404).send({ error: "Employee not found" });
        }
        req.employee = employee;
        next();
    } catch (error) {
        console.error('Error in fetchEmployee middleware:', error.message);
        res.status(401).send({ error: "Please Authenticate using a valid token" });
    }
};

module.exports = fetchEmployee;
