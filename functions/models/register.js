const mongoose = require('mongoose');
const registerSchema = require('../schema/register');

const PetRegisterModel = mongoose.model('PetRegister', registerSchema);

module.exports = PetRegisterModel;
