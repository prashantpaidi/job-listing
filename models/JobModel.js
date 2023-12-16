const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  companyName: { type: String, required: true },
  logoURL: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract'],
    required: true,
  },
  remote: {
    type: Boolean,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    required: true,
  },
  aboutCompany: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  recruiterName: { type: String, required: true },
});
const Job = mongoose.model('job', JobSchema);
module.exports = Job;
