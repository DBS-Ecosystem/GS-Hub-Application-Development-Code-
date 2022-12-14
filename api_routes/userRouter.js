const router = require('express').Router();
const User = require('../models/User');
const Support = require('../models/SupMessage');
const DTO = require('../models/DTO');
const validate = require('../validation');

const notAllowedMethod = (req, res) => {
    res.status(400).json({error: true, message: "Method not allowed!"});
}

router.route('/cabinet')
.get(async (req, res) => {
    //
})
.all(notAllowedMethod);

router.route('/conversations')
.get(async (req, res) => {
    res.json({error: false, message: 'This page in development'});
})
.all(notAllowedMethod);

router.route('/bids')
.get(async (req, res) => {
    
})
.all(notAllowedMethod);

router.route('/finances')
.get(async (req, res) => {
    res.json({error: false, message: 'This page in development'});
})
.all(notAllowedMethod);

router.route('/private/info')
.post(async (req, res) => {
    //Validation
    const { error } = validate.private.validate(req.body);
    if (error) return res.status(400).json({error: true, message: error.details[0].message});
    //Update private info
    try{
        await User.updateOne({_id: req.user._id}, {$set: req.body});
        res.json({error: false, message: 'Private info successfully changed!'});
    } catch(err) {
        res.status(500).json({error: true, message: "Database operation error"});
    }
})
.all(notAllowedMethod);

router.route('/private/avatar')
.get(async (req, res) => {
    try{
        const {avatar} = await User.findOne({_id: req.user._id});
        res.send(avatar);
    } catch(err) {
        res.status(500).json({error: true, message: "Database operation error"});
    }
})
.post(async (req, res) => {
    //Validation
    const { error } = validate.avatar.validate(req.body);
    if (error) return res.status(400).json({error: true, message: error.details[0].message});
    //Save to Database
    try{
        await User.updateOne({_id: req.user._id}, {$set: {avatar: req.body}});
        res.json({error: false, message: 'Avatar successfully changed!'});
    } catch(err) {
        res.status(500).json({error: true, message: "Database operation error"});
    }
})
.all(notAllowedMethod);

router.route('/private/info/:id')
.get(async (req, res) => {
    try{
        const user = await User.findOne({_id: req.params.id});
        //get collection length for rank
        const members = await User.find({type: req.user.type});
        //get array of user dtos
        if (user.DTO && user.DTO.length > 0) {
            const userDTOs = await DTO.find({$and: user.DTO.map(dto => {
                return {_id: dto};
            })});
            //await DTO.findById(user.DTO);
        };
        const userData = {
            type: user.type,
            name: `${user.name} ${surname}`,
            location: `${user.city}, ${user.country}`,
            rank: `${user.rank} place of ${members.length}`,
            finishedDTO: 3,
            activeDTO: 0,
            allDTO: 3,
            registered: Date.now() - user.regdate,
            lastvisit: user.lastvisit,
            feedbacks: user.feedbacks.map(feedback => {
                let {_id, ...rest} = feedback;
                return rest;
            })
        };
        res.json({error: false, result: userData});
    } catch(err) {
        res.status(500).json({error: true, message: "Database operation error"});
    }
})
.all(notAllowedMethod);

router.route('/private/avatar/:id')
.get(async (req, res) => {
    try{
        const {avatar} = await User.findOne({_id: req.params.id});
        res.send(avatar);
    } catch(err) {
        res.status(500).json({error: true, message: "Database operation error"});
    }
})
.all(notAllowedMethod);

router.route('/profile')
.post(async (req, res) => {
    if (req.user.type === "SPO") {
        //Validation
        const { error } = validate.profile.SPO.validate(req.body);
        if (error) return res.status(400).json({error: true, message: error.details[0].message});
        //Save data to DB
    } else if (req.user.type === "SME") {
        //Validation
        const { error } = validate.profile.SME.validate(req.body);
        if (error) return res.status(400).json({error: true, message: error.details[0].message});
        //Save data to DB
    } else return res.status(400).json({error: true, message: "Unknown user type!"});
})
.all(notAllowedMethod);

router.route('/support')
.post(async (req, res) => {
    //Validation
    const { error } = validate.support.validate(req.body);
    if (error) return res.status(400).json({error: true, message: error.details[0].message});
    //Create and save message to DB
    const message = new Support({...req.body, from: req.user._id});
    try{
        await message.save();
        res.json({error: false, message: 'Your message have been sent to support team!'});
    } catch(err) {
        res.status(500).json({error: true, message: "Database operation error"});
    }   
})
.all(notAllowedMethod);

router.route('/support/:id')
.get(async (req, res) => {
    try{
        const {topic, message, from} = await Support.findOne({_id: req.params.id});
        res.json({error: false, result: {from, topic, message}});
    } catch(err) {
        res.status(500).json({error: true, message: "Database operation error"});
    }
})
.delete(async (req, res) => {
    try{
        await Support.deleteOne({_id: req.params.id});
        res.json({error: false, message: 'Message to support successfully deleted!'});
    } catch(err) {
        res.status(500).json({error: true, message: "Database operation error"});
    }
})
.all(notAllowedMethod);

module.exports = router;