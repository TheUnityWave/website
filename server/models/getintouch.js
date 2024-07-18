const mongoose = require('mongoose');

const GetInTouchSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String, 
        required: true
    },
    message: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('GetInTouch', GetInTouchSchema)