const mongoose = require('mongoose');
const registerSchema = require('../schema/register'); // Ensure this path is correct

const PetRegisterModel = mongoose.model('register', registerSchema);

module.exports = PetRegisterModel;
