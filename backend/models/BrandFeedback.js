const mongoose = require('mongoose');

const brandFeedbackSchema = new mongoose.Schema({
  brandName: {
    type: String,
    required: true
  },
  productDetails: {
    sku: {
      type: String,
      required: true
    },
    productName: String,
    category: String
  },
  issueType: {
    type: String,
    required: true,
    enum: ['mislabeled', 'missing_barcode', 'packaging_quality', 'product_quality', 'documentation', 'other']
  },
  description: {
    type: String,
    required: true
  },
  photos: [{
    url: String,
    description: String,
    timestamp: Date
  }],
  brandManagerDetails: {
    name: {
      type: String,
      required: true
    },
    email: String,
    department: String
  },
  impactLevel: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    required: true
  },
  actionTaken: {
    type: String,
    required: true
  },
  followUpRequired: {
    type: Boolean,
    default: false
  },
  followUpDetails: {
    dueDate: Date,
    assignedTo: String,
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

module.exports = mongoose.model('BrandFeedback', brandFeedbackSchema); 