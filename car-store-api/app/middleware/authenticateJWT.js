const jwt = require('jsonwebtoken');
require('dotenv').config()

const authenticateJWT = (req, res, next) => {
    const token = req.cookies.authToken;

    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
        if (err) return res.status(403).json({ message: 'Forbidden' });

        req.user = payload.user;
        next();
    });
};

module.exports = authenticateJWT;