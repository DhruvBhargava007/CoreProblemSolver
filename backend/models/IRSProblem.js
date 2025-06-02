const mongoose = require('mongoose');

const irsProblemSchema = new mongoose.Schema({
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
  irsPOC: {
    type: String,
    required: true
  },
  notificationTime: {
    type: Date,
    required: true
  },
  responseTime: Date,
  problemSolver: {
    type: String,
    required: true
  },
  irsArea: {
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

module.exports = mongoose.model('IRSProblem', irsProblemSchema); 