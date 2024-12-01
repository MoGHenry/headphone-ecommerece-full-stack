const jwt = require('jsonwebtoken');

// Middleware to verify JWT and extract userID
const authenticateUser = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userID = decoded.userID; // Attach userID to the request object
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Invalid token' });
    }
};

module.exports = authenticateUser; // Export the function
