const multer = require('multer');
const router = require('express').Router();
const User = require('../models/User');
const Support = require('../models/SupMessage');
const DTO = require('../models/DTO');
const Bid = require('../models/Bid');
const validate = require('../validation');
const { bid } = require('../validation');

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
    if(req.user.type === "SME"){
        try {
            let bids = await Bid.find({from: req.user._id});
            bids = bids.map(bid => bid.project);
            const projects = await DTO.find({_id: {$in: bids}, status: "active"});
            res.json({error: false, message: projects.map(prt => {
                return {
                    id: prt._id,
                    name: prt.name,
                    budget: prt.budget,
                    duration: prt.duration,
                    price: prt.price,
                    date: prt.date
                }
            })});
        } catch {
            res.status(500).json({error: true, message: "Database operation error"});
        }
    } else if (req.user.type === "SPO") {
        try {
            const projects = await DTO.find({issuedBy: req.user._id, status: "active"});
            res.json({error: false, message: projects.map(prt => {
                return {
                    id: prt._id,
                    name: prt.name,
                    budget: prt.budget,
                    date: prt.date
                }
            })});
        } catch {
            res.status(500).json({error: true, message: "Database operation error"});
        }
    } else return res.status(400).json({error: true, message: "Unknown user type!"});
})
.all(notAllowedMethod);

router.route('/bids/:project')
.get(async (req, res) => {
    try {
        let bids = await Bid.find({project: req.params.project});
        bids = bids.map(async (bid) => {
            const user = await User.findOne({_id: bid.from});
            return {
                id: bid._id,
                from: `${user.name} ${use.surname}`,
                text: bid.text,
                price: bid.price,
                date: bid.date
            }
        })
        res.json({error: false, message: bids});
    } catch {
        res.status(500).json({error: true, message: "Database operation error"});
    }
})
.all(notAllowedMethod);

router.route('/bid')
.post(async (req, res) => {
    // Only SPO can create projects
    if (req.user.type !== "SME") return res.status(400).json({error: true, message: 'Only SME users can place bids'});
    //Validation
    let { error } = validate.bid.validate(req.body);
    if (error) return res.status(400).json({error: true, message: error.details[0].message});
    //Save to Database
    try{
        const bid = new Bid({...req.body, from: req.user._id});
        await bid.save();
        res.json({error: false, message: 'Project successfully created!'});
    } catch(err) {
        res.status(500).json({error: true, message: "Database operation error"});
    }
})
.all(notAllowedMethod);

router.route('/finances')
.get(async (req, res) => {
    res.json({error: false, message: 'This page in development'});
})
.all(notAllowedMethod);

router.route('/private/info')
.post(multer().single('avatar'), async (req, res) => {
    //Validation
    let { error } = validate.private.validate(req.body);
    if (error) return res.status(400).json({error: true, message: error.details[0].message});
    if (req.file) {
        error = validate.file.validate(req.body).error;
        if (error) return res.status(400).json({error: true, message: error.details[0].message});
    }
    //Update private info
    try{
        const data = !req.file ? req.body : {...req.body, file: req.file};
        await User.updateOne({_id: req.user._id}, {$set: data});
        res.json({error: false, message: 'Private info successfully changed!'});
    } catch(err) {
        res.status(500).json({error: true, message: "Database operation error"});
    }
})
.all(notAllowedMethod);

router.route('/private/avatar')
.get(async (req, res) => {
    try{
        const { avatar } = await User.findOne({_id: req.user._id});
        res.send(avatar);
    } catch(err) {
        res.status(500).json({error: true, message: "Database operation error"});
    }
})
.all(notAllowedMethod);

router.route('/private/info/:id')
.get(async (req, res) => {
    try{
        const user = await User.findOne({_id: req.params.id});
        const members = await User.find({type: req.user.type});
        //get array of user dtos
        let act = 0, fsh = 0, all = 0;
        if (user.DTO && user.DTO.length > 0) {
            const userDTOs = await DTO.find({_id: {$in: user.DTO.map(dto => {
                return {_id: dto};
            })}});
            act = userDTOs.filter(dto => dto.status === "active").length;
            fsh = userDTOs.filter(dto => dto.status === "finished").length;
            all = userDTOs.length;
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
        const { avatar } = await User.findOne({_id: req.params.id});
        res.send(avatar);
    } catch(err) {
        res.status(500).json({error: true, message: "Database operation error"});
    }
})
.all(notAllowedMethod);

router.route('/profile')
.post(multer().single('file'), async (req, res) => {
    if (req.user.type === "SPO") {
        //Validation
        const { error } = validate.profile.SPO.validate(req.body);
        if (error) return res.status(400).json({error: true, message: error.details[0].message});
        //Save data to DB
        try{
            await User.updateOne({_id: req.user._id}, {$set: req.body});
            res.json({error: false, message: 'Profile info successfully changed!'});
        } catch(err) {
            res.status(500).json({error: true, message: "Database operation error"});
        }
    } else if (req.user.type === "SME") {
        //Validation
        let { error } = validate.profile.SME.validate(req.body);
        if (error) return res.status(400).json({error: true, message: error.details[0].message});
        if (req.file) {
            error = validate.file.validate(reg.file);
            if (error) return res.status(400).json({error: true, message: error.details[0].message});
        }
        //Save data to DB
        try{
            const data = !req.file ? req.body : {...req.body, file: req.file};
            await User.updateOne({_id: req.user._id}, {$set: data});
            res.json({error: false, message: 'Profile info successfully changed!'});
        } catch(err) {
            res.status(500).json({error: true, message: "Database operation error"});
        }
    } else return res.status(400).json({error: true, message: "Unknown user type!"});
})
.all(notAllowedMethod);

// ****All routes to interact with support messages****

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

// ****All routes for interection with projects****

router.route('/project')
.post(multer().single('file'), async (req, res) => {
    // Only SPO can create projects
    if (req.user.type !== "SPO") return res.status(400).json({error: true, message: 'Only SPO users can create projects'});
    //Validation
    let { error } = validate.project.validate(req.body);
    if (error) return res.status(400).json({error: true, message: error.details[0].message});
    if (req.file) {
        error = validate.file.validate(reg.file);
        if (error) return res.status(400).json({error: true, message: error.details[0].message});
    }
    //Save to Database
    try{
        const data = !req.file ? req.body : {...req.body, file: req.file};
        const project = new DTO(data);
        project.save();
        res.json({error: false, message: 'Project successfully created!'});
    } catch(err) {
        res.status(500).json({error: true, message: "Database operation error"});
    }
})
.all(notAllowedMethod);

router.route('/project/:id')
.get(async (req, res) => {
    const data = await Promise.all([
        DTO.findOne({_id: req.params.id}),
        User.findOne({_id: dto.issuedBy}),
        Bid.find({project: req.params.id})
        .then(bids => {
            return bids.map(async (bid) => {
                const user = await User.findOne({_id: bid.from});
                return {
                    id: bid._id,
                    from: `${user.name} ${use.surname}`,
                    text: bid.text,
                    price: bid.price,
                    date: bid.date
                }
            })
        })
    ])
    .then(data => {
        const dto = data[0], issuer = data[1], bids = data[2];

        return {
            name: dto.name,
            category: dto.category,
            about: dto.about,
            issuedBy: `${issuer.name} ${issuer.surname}`,
            bids: bids,
            date: dto.date,
            until: dto.until,
            views: dto.views,
            budget: dto.budget
        }
    })
    .catch(err => {
        res.status(500).json({error: true, err: err, message: "Database operation error"});
    });

    res.json({error: false, result: data});
})
.delete(async (req, res) => {
    try{
        const dto = await DTO.deleteOne({_id: req.params.id});
        if (req.user._id !== dto.issuedBy) return res.status(400).json({error: true, message: "Only the onwer of project can remove it"});
        res.json({error: false, message: 'Poject successfully deleted!'});
    } catch(err) {
        res.status(500).json({error: true, message: "Database operation error"});
    }
})
.all(notAllowedMethod);

module.exports = router;