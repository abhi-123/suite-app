const mongoose = require('mongoose');

var countersSchema = new mongoose.Schema({
    // _id: { type: String, required: true },
    count: { type: Number, default: 0 }
});

// URL Collection Schema
var urlSchema = new mongoose.Schema({
    // _id: { type: Number },
    url: '',
    created_at: ''
});

module.exports = {
    countersSchema,
    urlSchema
}