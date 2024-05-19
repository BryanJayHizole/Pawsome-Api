// api.js
const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes-register');

const app = express();

// your mongoDB Cloud URL
const dbCloudUrl = 'mongodb+srv://bryanhizole:bryan142001@cluster0.ogfgkgo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbLocalUrl = 'mongodb://localhost:27017/Pawsome';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Optimize MongoDB connection
let isConnectedBefore = false;
const connectToDatabase = async () => {
    if (!isConnectedBefore) {
        try {
            await mongoose.connect(dbCloudUrl || dbLocalUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            isConnectedBefore = true;
            console.log('Connected to MongoDB');
        } catch (error) {
            console.error('Failed to connect to MongoDB', error);
        }
    }
};

// Middleware to ensure database connection
app.use(async (req, res, next) => {
    await connectToDatabase();
    next();
});

app.use('/.netlify/functions/api', router);

// Increase the Lambda timeout setting
module.exports.handler = serverless(app, {
    timeout: 30,  // Set timeout to 30 seconds or as needed
});
