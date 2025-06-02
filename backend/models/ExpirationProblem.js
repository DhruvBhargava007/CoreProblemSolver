const mongoose = require('mongoose');

const expirationProblemSchema = new mongoose.Schema({
  sku: {
    type: String,
    required: true
  },
  orderId: {
    type: String,
    required: true
  },
  expirationDate: {
    type: String,
    required: true,
    match: /^\d{2}\/\d{4}$/ // MM/YYYY format
  },
  brandManager: {
    type: String,
    required: true
  },
  catalogUpdated: {
    type: Boolean,
    default: false
  },
  escalatedToAsana: {
    type: Boolean,
    default: false
  },
  asanaTaskId: String,
  screenshotUrl: String,
  actionTaken: {
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

module.exports = mongoose.model('ExpirationProblem', expirationProblemSchema); 