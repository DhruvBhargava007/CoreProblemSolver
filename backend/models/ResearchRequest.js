const mongoose = require('mongoose');

const researchRequestSchema = new mongoose.Schema({
  requestType: {
    type: String,
    required: true,
    enum: ['trend_analysis', 'process_improvement', 'incident_investigation', 'performance_metrics', 'other']
  },
  problemStatement: {
    type: String,
    required: true
  },
  context: {
    background: String,
    objectives: [String],
    scope: String
  },
  dataRequirements: [{
    dataType: String,
    source: String,
    timeframe: String,
    priority: {
      type: String,
      enum: ['low', 'medium', 'high']
    }
  }],
  stakeholders: [{
    name: String,
    role: String,
    department: String,
    contactInfo: String
  }],
  timeline: {
    requestedBy: Date,
    expectedCompletion: Date,
    actualCompletion: Date
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'analysis_complete', 'review', 'completed'],
    default: 'pending'
  },
  findings: {
    summary: String,
    recommendations: [String],
    attachments: [{
      name: String,
      url: String,
      type: String
    }]
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

module.exports = mongoose.model('ResearchRequest', researchRequestSchema); 