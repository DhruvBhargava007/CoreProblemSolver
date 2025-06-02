const mongoose = require('mongoose');

const sellerBlockedSchema = new mongoose.Schema({
  sellerId: {
    type: String,
    required: true
  },
  affectedPallets: [{
    palletId: {
      type: String,
      required: true
    },
    location: String,
    status: {
      type: String,
      enum: ['blocked', 'staged', 'reintroduced', 'resolved'],
      required: true
    }
  }],
  escalation: {
    escalatedTo: {
      type: String,
      required: true
    },
    escalationTime: {
      type: Date,
      required: true
    },
    responseTime: Date
  },
  receiverStations: [{
    stationId: String,
    stagingTime: Date,
    reintroductionTime: Date
  }],
  blockReason: {
    type: String,
    required: true
  },
  impactAssessment: {
    type: String,
    required: true
  },
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

module.exports = mongoose.model('SellerBlocked', sellerBlockedSchema); 