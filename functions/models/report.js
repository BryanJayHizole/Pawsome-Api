const mongoose = require('mongoose');
const reportSchema = require('../schema/report'); // Ensure this path is correct

const ReportStrayModel = mongoose.model('Report', reportSchema);

module.exports = ReportStrayModel;