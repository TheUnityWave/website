const jwt = require('jsonwebtoken');

const authorizeEmployee = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ error: "Please Authenticate using a valid token" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded.user.isAdmin) {
            return next(); // Proceed to the next middleware or route handler
        } else {
            return res.status(403).send({ error: "Access denied" }); // Respond with access denied if not an admin
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error', error: error.message });
    }
};

module.exports = { authorizeEmployee };
