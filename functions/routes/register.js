const express = require('express');
const PetRegisterModel = require('../models/register');

const router = express.Router();

//GET all registers
router.get('/', async (req, res) => {
    console.log("GET / request received");
    try {
        const registers = await PetRegisterModel.find();
        console.log("Data fetched from MongoDB");
        res.json(registers);
    } catch (err) {
        console.error("Error fetching data from MongoDB:", err);
        res.status(500).json({ message: err.message });
    }
});

//GET a single register
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
        res.status(201).json({ message: 'Register created successfully', register: newRegister });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE a register
router.patch('/:id', getRegister, async (req, res) => {
    try {
        const { ownerInfo, petInfo } = req.body;
        if (ownerInfo) {
            res.register.ownerInfo = { ...res.register.ownerInfo, ...ownerInfo };
        }
        if (petInfo) {
            res.register.petInfo = { ...res.register.petInfo, ...petInfo };
        }
        const updatedRegister = await res.register.save();
        res.json(updatedRegister);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/:id', getRegister, async (req, res) => {
    try {
        const { ownerInfo, petInfo } = req.body;
        res.register.ownerInfo = ownerInfo || res.register.ownerInfo;
        res.register.petInfo = petInfo || res.register.petInfo;
        const updatedRegister = await res.register.save();
        res.json(updatedRegister);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE a register
router.delete('/:id', getRegister, async (req, res) => {
    try {
        await res.register.remove();
        res.json({ message: 'Register deleted' });
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
