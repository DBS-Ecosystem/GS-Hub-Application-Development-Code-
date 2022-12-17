const jwt = require('jsonwebtoken');
const User = require('./models/User');

module.exports = function(req, res, next) {
    const token = req.header('auth-token');
    if(!token) return res.status(401).json({error: true, message: 'Access Denied'});

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        User.updateOne({_id: req.user._id}, {$set: {lastvisit: Date.now()}});
        next();
    } catch(err) {
        res.status(400).send('Invalid Token')
    }
}