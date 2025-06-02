const mongoose = require('mongoose');

const liveProblemSolveErrorSchema = new mongoose.Schema({
  palletLocation: {
    type: String,
    required: true
  },
  errorType: {
    type: String,
    required: true
  },
  timeToResolve: {
    type: Number, // in minutes
    required: true
  },
  palletFillLevel: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  staffInvolved: [{
    name: String,
    role: String
  }],
  additionalStaffingNeeded: {
    type: Boolean,
    default: false
  },
  escalationDetails: {
    escalated: {
      type: Boolean,
      default: false
    },
    escalatedTo: String,
    escalationReason: String,
    escalationTime: Date
  },
  actionTaken: {
    type: String,
    required: true
  },
  resolution: {
    type: String,
    required: true
  },
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

module.exports = mongoose.model('LiveProblemSolveError', liveProblemSolveErrorSchema); 