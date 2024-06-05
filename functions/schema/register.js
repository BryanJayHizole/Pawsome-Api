const mongoose = require('mongoose');
const { Schema } = mongoose;

const addressSchema = new Schema({
    purok: String,
    barangay: String,
    municipality: String,
    province: String,
});

const ownerInfoSchema = new Schema({
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    middleName: String,
    gender: String,
    birthday: Date,
    contactNo: String,
    email: String,
    address: addressSchema,
});

const petInfoSchema = new Schema({
    petName: { type: String, required: true },
    breed: String,
    age: Number,
    ownerContact: String,
    habitat: String,
    petDob: Date,
    petColor: String,
    petGender: String,
    tag: String,
    tagOther: String,
    tagNo: String,
    petWeight: String,
    petPhoto: String, // To handle pet photo uploads
});

const registerSchema = new Schema({
    ownerInfo: ownerInfoSchema,
    petInfo: petInfoSchema,
});

module.exports = registerSchema;
