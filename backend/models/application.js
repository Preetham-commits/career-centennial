const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job-Post',  // Reference the correct model name
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  /*coverLetter: {
    type: String,
    required: false
  },*/
  coverLetter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'uploads.files'
  },
  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'uploads.files', // reference the GridFS files collection
    required: true
  },
  applicantName: {
    type: String,
    required: true
  },
  applicantEmail: {
    type: String,
    required: true
  },
  appliedDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending'
  }
}, {
  timestamps: true
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
