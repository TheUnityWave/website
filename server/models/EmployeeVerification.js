const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeVerificationSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    mobile: { type: String },
    job: { type: String },
    experience: { type: String },
    password: { type: String },
    isAdmin: { type: Boolean},
    EmployeePhoto: { type: String, default: '' },
    hometownAddress: { type: String, default: '' },
    currentAddress: { type: String, default: '' },
    AdhaarCard: { type: String, default: '' },
    policeVerification: {
        type: String, default: ''
    }
}, { timestamps: true });

module.exports = mongoose.model('EmployeeVerification', EmployeeVerificationSchema);