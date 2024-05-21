const mongoose = require('mongoose');
const { Schema } = mongoose;

const reportSchema = new Schema({
    barangay: {
        type: String,
        required: true
    },
    purok: String,
    dogGender: {
        type: String,
        enum: ['male', 'female'] // Dog gender can be either 'male' or 'female'
    },
    dogColor: String,
    dogBreed: String,
    dogTag: String,
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = reportSchema;
