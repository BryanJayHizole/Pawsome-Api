const express = require('express');
const LostPetModel = require('../models/lostPet');
const multer = require('multer');
const lostPetRouter = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware function to get a lost pet report by ID
async function getLostPet(req, res, next) {
    try {
        const lostPet = await LostPetModel.findById(req.params.id);
        if (!lostPet) {
            return res.status(404).json({ message: 'Lost pet report not found' });
        }
        res.lostPet = lostPet;
        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// GET: Get all lost pet reports
lostPetRouter.get('/lost-pet', async (req, res) => {
    try {
        const lostPets = await LostPetModel.find();
        res.json(lostPets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET: Get a single lost pet report by ID
lostPetRouter.get('/lost-pet/:id', getLostPet, (req, res) => {
    res.json(res.lostPet);
});

// POST: Create a new lost pet report
lostPetRouter.post('/lost-pet', upload.none(), async (req, res) => {
    try {
        const { petName, barangay, purok, dogGender, dogColor, dogBreed, dogTag, tagOther, contactInfo, description } = req.body;
        const newLostPet = new LostPet({ petName, barangay, purok, dogGender, dogColor, dogBreed, dogTag, tagOther, contactInfo, description });
        await newLostPet.save();
        res.status(201).json({ message: 'Lost pet report created successfully', lostPet: newLostPet });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE: Delete a lost pet report by ID
lostPetRouter.delete('/lost-pet/:id', getLostPet, async (req, res) => {
    try {
        await res.lostPet.remove();
        res.json({ message: 'Lost pet report deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = lostPetRouter;
