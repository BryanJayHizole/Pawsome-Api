const mongoose = require('mongoose');
const { Schema } = mongoose;

const reportSchema = new Schema({
    location: { type: String, required: true },
    description: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

module.exports = reportSchema;
