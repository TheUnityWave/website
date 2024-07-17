const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeVerificationSchema = new Schema({
    EmployeePhoto: { type: String, default: '' },
    hometownAddress: { type: String, default: '' },
    currentAddress: { type: String, default: '' },
    AdhaarCard: { type: String, default: '' }, 
    policeVerificationDetails: {
        question1: { type: String, default: '' },
        question2: { type: String, default: '' },
        question3: { type: String, default: '' }
    }
}, { timestamps: true });

module.exports = mongoose.model('EmployeeVerification', EmployeeVerificationSchema);
