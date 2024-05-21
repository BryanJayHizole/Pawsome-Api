const express = require('express');
const Report = require('../models/report');
const multer = require('multer');
const reportRouter = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware function to get a report by ID
async function getReport(req, res, next) {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.report = report;
        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// GET: Get all stray dog reports
reportRouter.get('/report', async (req, res) => {
    try {
        const reports = await Report.find();
        res.json(reports);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET: Get a single stray dog report by ID
reportRouter.get('/report/:id', async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) {
            return res.status(404).json({ message: 'Stray dog report not found' });
        }
        res.json(report);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST: Create a new stray dog report
reportRouter.post('/report', upload.none(), async (req, res) => {
    try {
        const { barangay, purok, dogGender, dogColor, dogBreed, dogTag, description } = req.body;
        const newReport = new Report({ barangay, purok, dogGender, dogColor, dogBreed, dogTag, description });
        await newReport.save();
        res.status(201).json({ message: 'Stray dog report created successfully', report: newReport });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE: Delete a stray dog report by ID
reportRouter.delete('/report/:id', async (req, res) => {
    try {
        const report = await Report.findById(req.params.id);
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
