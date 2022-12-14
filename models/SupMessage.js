const mongoose = require('mongoose');

const supportSchema = new mongoose.Schema({
    topic: {
        type: String,
        default: "No topic",
        requied: true
    },
    message: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Support', supportSchema);