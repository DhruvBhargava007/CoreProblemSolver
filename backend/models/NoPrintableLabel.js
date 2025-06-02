const mongoose = require('mongoose');

const noPrintableLabelSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true
  },
  orderDetails: {
    orderId: {
      type: String,
      required: true
    },
    orderDate: Date,
    customerType: String
  },
  reachOperationsGuide: {
    stepsTaken: [{
      step: String,
      completed: Boolean,
      result: String
    }],
    guideVersion: String
  },
  labelType: {
    type: String,
    required: true
  },
  errorCode: String,
  systemChecks: {
    catalogCheck: Boolean,
    printServerCheck: Boolean,
    templateCheck: Boolean
  },
  actionTaken: {
    type: String,
    required: true
  },
  supportTicket: {
    ticketId: String,
    status: String,
    priority: String
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

module.exports = mongoose.model('NoPrintableLabel', noPrintableLabelSchema); 