const mongoose = require('mongoose');

const referSchema = new mongoose.Schema({
    referrerName: { type: String, required: true },
    candidateName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    purpose: { type: String, required: true },
    designation: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Refer', referSchema);
