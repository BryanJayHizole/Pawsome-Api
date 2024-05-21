const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactInfoSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true }
}, { _id: false });

const lostPetSchema = new Schema({
    petName: { type: String, required: true },
    barangay: { type: String, required: true },
    purok: { type: String, required: true },
    dogGender: { type: String, required: true },
    dogColor: { type: String, required: true },
    dogBreed: { type: String, required: true },
    dogTag: { type: String, required: true },
    tagOther: { type: String },
    contactInfo: contactInfoSchema,
    description: { type: String, required: true },
    reportedAt: { type: Date, default: Date.now }
});

module.exports = lostPetSchema;
