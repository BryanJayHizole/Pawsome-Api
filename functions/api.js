// api.js
const express = require('express');
const serverless = require('serverless-http');
const registerRouter = require('./routes/register'); // Renamed from 'router'
const reportRouter = require('./routes/report'); // Renamed from 'router'
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Your MongoDB Cloud URL
const dbCloudUrl = 'mongodb+srv://bryanhizole:bryan142001@cluster0.ogfgkgo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbLocalUrl = 'mongodb://localhost:27017/Pawsome';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(dbCloudUrl || dbLocalUrl)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Failed to connect to MongoDB', error));

app.use('/.netlify/functions/api/', registerRouter); // Register router
app.use('/.netlify/functions/api/', reportRouter); // Report router

module.exports.handler = serverless(app);
