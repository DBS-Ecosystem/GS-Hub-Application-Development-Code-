const mongoose = require('mongoose');

const dtoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    reqSkills: [String],
    views: {
        type: Number,
        default: 0
    },
    status: String,
    issuedBy: {
        type: String,
        required: true
    },
    bids: [String],
    performer: String,
    budget: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('DTO', dtoSchema);