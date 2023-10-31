const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).send('Access denied. No token provided.');
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, 'My-Store-Managment-KEYSECRET');
        req.user = decoded;
        next();
    } catch (exception) {
        res.status(400).send('Invalid token.');
    }
};


module.exports = verifyToken;
