const mongoose = require('mongoose');
const reportSchema = require('../schema/report'); // Ensure this path is correct

const ReportStrayModel = mongoose.model('Report', reportSchemaSchema);

module.exports = ReportStrayModel;
