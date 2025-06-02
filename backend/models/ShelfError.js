const mongoose = require('mongoose');

const shelfErrorSchema = new mongoose.Schema({
  shelfId: {
    type: String,
    required: true
  },
  errorType: {
    type: String,
    required: true,
    enum: ['missing_data', 'incorrect_location', 'capacity_issue', 'system_error', 'other']
  },
  productDetails: {
    sku: String,
    componentId: String,
    itemId: String
  },
  shelfPage: {
    type: String,
    required: true
  },
  reproductionSteps: [{
    step: String,
    expectedResult: String,
    actualResult: String
  }],
  screenshot: {
    url: String,
    timestamp: Date
  },
  requestDetails: {
    requestId: String,
    submissionDate: Date,
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical']
    }
  },
  actionTaken: {
    type: String,
    required: true
  },
  supportTicket: {
    ticketId: String,
    status: String
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

module.exports = mongoose.model('ShelfError', shelfErrorSchema); 