//routes/author.js
const express = require('express');
const PetRegisterModel = require('../models/register');

const router = express.Router();

//GET all authors
router.get('/', async (req, res) => {
    try {
        const registers = await PetRegisterModel.find();
        res.json(registers);
    }catch (err) {
        res.status(500).json({message: err.message});
    }
});

//GET a single author
router.get('/:id', getRegister, (req, res) => {
    res.json(res.register);
});

// CREATE an author
router.post('/', async (req, res) => {
    try {
        // Validate request body
        if (!req.body.name || !req.body.age) {
            return res.status(400).json({message: 'Name and age are required '});
        }

        // Check if the author's name already exists
        const existingRegister = await PetRegisterModel.findOne({ name: req.body.name});
        if (existingRegister) {
            return res.status(400).json({message: 'Register already exists'});
        }

        const register = new PetRegisterModel(req.body);
        const newRegister = await register.save();
        res
            .status(201)
            .json({ message: 'Register created successfully', register: newRegister});
    }catch (err) {
        res.status(400).json({message: err.message});
    }
});

// UPDATE an author
router.patch('/:id', getRegister, async (req, res) => {
    try {
        if (req.body.name != null) {
            res.register.name = req.body.name;
        }
        const updatedRegister = await res.register.save();
        res.json(updatedRegister);
    } catch (err) {
        res.status(400).json({ message: err.message});
    }
});

router.put('/:id', getRegister, async (req, res) => {
    try {
        const updatedRegister = await PetRegisterModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true}
        );
        res.json(updatedRegister);
    } catch (err) {
        res.status(400).json({ message: err.message});
    }
});

// DELETE an author
router.delete('/:id', getRegister, async (req, res) => {
    try {
        await PetRegisterModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Register deleted'});
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
});

// Middleware function to get a single author by ID
async function getRegister(req, res, next) {
    try {
        const register = await PetRegisterModel.findById(req.params.id);
        if (!register) {
            return res.status(404).json({ message: 'Register not found'});
        }
        res.register = register;
        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = router;