const mongoose = require('mongoose');

const CareerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  jobCategory: {
    type: String,
    required: true,
  },
  resumeFile: {
    type: String,
    required: true,
  },
  // viewableResumeFile: {
  //   type: String,
  //   required: true,
  // },
  sendCredentials: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Check if the model already exists before defining it
module.exports = mongoose.models.Career || mongoose.model('Career', CareerSchema);
