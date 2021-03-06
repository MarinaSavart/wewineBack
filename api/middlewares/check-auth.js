const JWT = require('jsonwebtoken');

module.exports = (req, res, next) => {
    
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = JWT.verify(token, process.env.JWT_KEY);

        req.userData = decoded;
        next()
    } catch(err) {
        res.status(401).json({
            isVerified: false,
            message: "Auth failed"
        });
    }
};