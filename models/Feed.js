const mongoose = require('mongoose');

const feedSchema = new mongoose.Schema({
    title: {
        type: String,
        requied: true
    },
    imageUrl: String,
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Feed', supportSchema);