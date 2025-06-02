const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  problemType: {
    type: String,
    required: true
  },
  palletId: {
    type: String,
    required: true
  },
  description: {
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

module.exports = mongoose.model('Problem', problemSchema); 