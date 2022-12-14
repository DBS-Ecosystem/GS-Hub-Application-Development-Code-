const mongoose = require('mongoose');

const language = new mongoose.Schema({
    name: String,
    level: String
});

const feedback = new mongoose.Schema({
    project: {
        type: String,
        required: true
    },
    positive: Boolean,
    from: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const userSchema = new mongoose.Schema({
    type: {
        type: String,
        requied: true
    },
    phone: {
        type: String,
        required: true
    },
    login: {
        type: String,
        required: true,
        min: 6,
        max: 50
    },
    password: {
        salt: {
            type: String,
            required: true,
            max: 1024,
            min: 10
        },
        hash: {
            type: String,
            required: true,
            max: 1024,
            min: 10
        }
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 20
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    regdate: {
        type: Date,
        default: Date.now
    },
    avatar: Buffer,
    about: String,
    language: [language],
    website: String,
    wallet: String,
    rank: {
        type: Number,
        default: 0
    },
    skills: [String],
    DTO: [String],
    lastvisit: {
        type: Date,
        default: Date.now
    },
    feedbacks: [feedback]
})

module.exports = mongoose.model('User', userSchema);