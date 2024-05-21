const express = require('express');
const ReportStrayModel = require('../models/report');
const multer = require('multer');
const reportRouter = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware function to get a report by ID
async function getReport(req, res, next) {
    try {
        const report = await ReportStrayModel.findById(req.params.id);
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.report = report;
        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


//GET all registers
reportRouter.get('/report', async (req, res) => {
    try {
        const reports = await ReportStrayModelModel.find();
        res.json(reports);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET: Get a single stray dog report by ID
reportRouter.get('/report/:id', async (req, res) => {
    try {
        const report = await ReportStrayModel.findById(req.params.id);
        if (!report) {
            return res.status(404).json({ message: 'Stray dog report not found' });
        }
        res.json(report);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST: Create a new stray dog report
reportRouter.post('/report', upload.single('photo'), async (req, res) => {
    try {
        const { location, description } = req.body;
        const photo = req.file ? req.file.buffer : null;
        const newReport = new ReportStrayModel({ location, description, photo });
        await newReport.save();
        res.status(201).json({ message: 'Stray dog report created successfully', report: newReport });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE a register
reportRouter.patch('/:id', getReport, upload.single('petPhoto'), async (req, res) => {
    try {
        const { ownerInfo, petInfo } = req.body;
        if (ownerInfo) {
            res.register.ownerInfo = { ...res.register.ownerInfo, ...JSON.parse(ownerInfo) };
        }
        if (petInfo) {
            res.register.petInfo = { ...res.register.petInfo, ...petInfo };
            const updatedPetInfo = JSON.parse(petInfo);
            if (req.file) {
                updatedPetInfo.petPhoto = req.file.buffer;
            }
            res.register.petInfo = { ...res.register.petInfo, ...updatedPetInfo };
        }
        const updatedRegister = await res.register.save();
        res.json(updatedRegister);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

reportRouter.put('/:id', getReport, upload.single('petPhoto'), async (req, res) => {
    try {
        const { ownerInfo, petInfo } = req.body;
        const updatedOwnerInfo = ownerInfo ? JSON.parse(ownerInfo) : res.register.ownerInfo;
        const updatedPetInfo = petInfo ? JSON.parse(petInfo) : res.register.petInfo;
        if (req.file) {
            updatedPetInfo.petPhoto = req.file.buffer;
        }
        res.register.ownerInfo = updatedOwnerInfo;
        res.register.petInfo = updatedPetInfo;
        const updatedRegister = await res.register.save();
        res.json(updatedRegister);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE: Delete a stray dog report by ID
reportRouter.delete('/report/:id', async (req, res) => {
    try {
        const report = await ReportStrayModel.findById(req.params.id);
        if (!report) {
            return res.status(404).json({ message: 'Stray dog report not found' });
        }
        await report.remove();
        res.json({ message: 'Stray dog report deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = reportRouter;