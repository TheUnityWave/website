const jwt = require('jsonwebtoken');

fetchEmployee = (req, res, next) => {
    // Get the employee from jwt token and add id to req object.
    const token = req.header('auth-token');
    if(!token) {
        res.status(401).send({error: "Please Authenticate using a valid token"});
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.employee = data.employee; 
        next();
    } catch (error) {
        res.status(401).send({error: "Please Authenticate using a valid token"});
    }
}

module.exports = fetchEmployee;