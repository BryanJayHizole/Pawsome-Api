const mongoose = require('mongoose');
const petRegisterSchema = require('../schema/register');

const PetRegisterModel = mongoose.model('Register', petRegisterSchema);

module.exports = PetRegisterModel;