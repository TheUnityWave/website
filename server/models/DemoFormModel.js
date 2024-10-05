const mongoose = require('mongoose');

const DemoFormSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('DemoForm', DemoFormSchema);

