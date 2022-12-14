const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const validate = require('../validation');
const verifytoken = require('../verifytoken');
const crypto = require('crypto');

const notAllowedMethod = (req, res) => {
    res.status(400).json({error: true, message: "Method not allowed!"});
}

router.route('/reg').post(async (req, res) => {
    //Validation
    const { error } = validate.registration.validate(req.body);
    if (error) return res.status(400).json({error: true, message: error.details[0].message});
    //User existance check
    const exist = await User.findOne({$or: [{login: req.body.login}, {email: req.body.email}]});
    if (exist) {
        if (exist.email === req.body.email) return res.status(400).json({error: true, message: 'User already exists!'});
        if (exist.login === req.body.login) return res.status(400).json({error: true, message: 'Login must be unique!'});
    }
    //Hash password
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, 'sha512').toString('hex');
    //Create new User
    const user = new User({...req.body, password: {salt, hash}});
    try {
        await user.save();
        res.json({error: false, message: 'User successfully registered!'});
    } catch(err) {
        res.status(400).json({error: true, message: "Database operation error"});
    }
}).all(notAllowedMethod);

router.route('/login').post(async (req, res) => {
    //Validation
    const { error } = validate.login.validate(req.body);
    if (error) return res.status(400).json({error: true, message: error.details[0].message});
    //User credentials check
    const user = await User.findOne({$or: [{login: req.body.login}, {email: req.body.login}]});
    if (!user) return res.status(400).json({error: true, message: 'Incorect login or email'});
    const hash = crypto.pbkdf2Sync(req.body.password, user.password.salt, 1000, 64, 'sha512').toString('hex');
    if (hash!==user.password.hash) return res.status(400).json({error: true, message: 'Incorect pass'});
    //Create and assign token
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    const token = jwt.sign({
        _id: user._id,
        type: user.type
    }, process.env.TOKEN_SECRET, { expiresIn: '7d' });
    //Send response
    res.header('auth-token', token).json({error: false, message: 'Logged in!'});
}).all(notAllowedMethod);

router.route('/update').patch(verifytoken, async (req, res) => {
    //Validation
    const { error } = validate.update.validate(req.body);
    if (error) return res.status(400).json({error: true, message: error.details[0].message});
    let value = req.body;
    //Hash password
    if (value.password) {
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto.pbkdf2Sync(value.password, salt, 1000, 64, 'sha512').toString('hex');
        value.password = {salt, hash};
    }
    //Update credentials
    try{
        await User.updateOne({_id: req.user._id}, {$set: value});
        res.json({error: false, message: 'Credentials successfully changed!'});
    } catch(err) {
        res.status(500).json({error: true, message: "Database operation error"});
    }
}).all(notAllowedMethod);

router.route('/delete').delete(verifytoken, async (req, res) => {
    try{
        await User.deleteOne({_id: req.user._id});
        res.json({error: false, message: 'User account successfully deleted!'});
    } catch(err) {
        res.status(500).json({error: true, message: "Database operation error"});
    }
}).all(notAllowedMethod);

module.exports = router;