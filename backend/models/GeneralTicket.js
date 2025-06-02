const mongoose = require('mongoose');

const generalTicketSchema = new mongoose.Schema({
  ticketId: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true
  },
  subCategory: String,
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    required: true
  },
  status: {
    type: String,
    enum: ['open', 'in_progress', 'pending', 'resolved', 'closed'],
    default: 'open'
  },
  description: {
    type: String,
    required: true
  },
  reportedBy: {
    name: String,
    department: String,
    contactInfo: String
  },
  assignedTo: {
    name: String,
    department: String,
    contactInfo: String
  },
  timeline: {
    created: {
      type: Date,
      default: Date.now
    },
    lastUpdated: Date,
    dueDate: Date
  },
  attachments: [{
    name: String,
    url: String,
    type: String,
    uploadedAt: Date
  }],
  actionItems: [{
    description: String,
    assignedTo: String,
    dueDate: Date,
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed']
    },
    completedAt: Date
  }],
  communications: [{
    from: String,
    to: String,
    message: String,
    timestamp: Date,
    type: {
      type: String,
      enum: ['email', 'chat', 'phone', 'in_person']
    }
  }],
  resolution: {
    description: String,
    resolvedBy: String,
    verifiedBy: String
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

// Auto-generate ticket ID before saving
generalTicketSchema.pre('save', function(next) {
  if (!this.ticketId) {
    this.ticketId = 'GT-' + Date.now().toString().slice(-6);
  }
  next();
});

module.exports = mongoose.model('GeneralTicket', generalTicketSchema); 