const mongoose = require('mongoose');

const generalStorageProblemSchema = new mongoose.Schema({
  palletId: {
    type: String,
    required: true
  },
  fillLevel: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  oldPalletId: {
    type: String,
    required: true
  },
  newPalletId: {
    type: String,
    required: true
  },
  problemSolver: {
    type: String,
    required: true
  },
  locationBefore: {
    type: String,
    required: true
  },
  locationAfter: {
    type: String,
    required: true
  },
  actionTaken: {
    type: String,
    required: true
  },
  escalatedTo: String,
  notes: String,
  timestamp: {
    type: Date,
    default: Date.now
  },
  resolvedAt: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('GeneralStorageProblem', generalStorageProblemSchema); 