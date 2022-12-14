const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
    project: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    price: Number,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Bid', bidSchema);