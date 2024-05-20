const mongoose = require('mongoose');
const registerSchema = require('../schema/register'); // Ensure this path is correct

const PetRegisterModel = mongoose.model('Register', registerSchema);

module.exports = PetRegisterModel;
