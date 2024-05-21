const mongoose = require('mongoose');
const lostPetSchema = require('../schema/lostPet'); // Ensure this path is correct

const LostPetModel = mongoose.model('LostPet', lostPetSchema);

module.exports = LostPetModel;