const express = require('express');
const PetRegisterModel = require('../models/register');

const router = express.Router();

// GET all registers
router.get('/', async (req, res) => {
    try {
        const registers = await PetRegisterModel.find();
        res.json(registers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET a single register
router.get('/:id', getRegister, (req, res) => {
    res.json(res.register);
});

// CREATE a register
router.post('/', async (req, res) => {
    try {
        const { ownerInfo, petInfo } = req.body;

        // Validate required fields
        if (!ownerInfo.lastName || !ownerInfo.firstName || !petInfo.petName) {
            return res.status(400).json({ message: 'Owner last name, first name, and pet name are required' });
        }

        // Create a new register document
        const newRegister = new PetRegisterModel({ ownerInfo, petInfo });
        await newRegister.save();
        res.status(201).json(newRegister);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE a register
router.patch('/:id', getRegister, async (req, res) => {
    try {
        // Logic for updating a register
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a register
router.delete('/:id', getRegister, async (req, res) => {
    try {
        // Logic for deleting a register
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function to get a register by ID
async function getRegister(req, res, next) {
    try {
        const register = await PetRegisterModel.findById(req.params.id);
        if (!register) {
            return res.status(404).json({ message: 'Register not found' });
        }
        res.register = register;
        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = router;
