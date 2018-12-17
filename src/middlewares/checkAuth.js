require('dotenv-safe').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const api_token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(api_token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            error: {
                message: "Authentication failed"
            }
        });
    }
}