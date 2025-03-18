const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization'); // Extract token from request headers

    if (!token) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET); // Extract token after "Bearer "
        req.userId = decoded.userId; // Attach userId to request object
        next(); // Move to next middleware or controller
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token." });
    }
};

module.exports = authenticateUser;
