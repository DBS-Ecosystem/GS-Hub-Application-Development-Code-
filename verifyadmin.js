const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    try{
        const token = req.header('auth-token');
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        if(!token || verified.type !== "Admin") return res.status(401).json({error: true, message: 'Access Denied'});
        next();
    } catch {
        res.status(400).json({error: true, message: 'Invalid token'});
    }
}