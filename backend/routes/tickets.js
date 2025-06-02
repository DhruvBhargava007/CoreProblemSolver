const express = require('express');
const router = express.Router();
const GeneralTicket = require('../models/GeneralTicket');
const ResearchRequest = require('../models/ResearchRequest');
const BrandFeedback = require('../models/BrandFeedback');

// Log that routes are being set up
console.log('Setting up ticket routes...');

// Helper function to get model by ticket type
const getTicketModel = (type) => {
  switch (type) {
    case 'general':
      return GeneralTicket;
    case 'research':
      return ResearchRequest;
    case 'brand':
      return BrandFeedback;
    default:
      throw new Error('Invalid ticket type');
  }
};

// Create a new ticket
router.post('/:type', async (req, res) => {
  try {
    console.log('POST /:type route hit');
    console.log('Route params:', req.params);
    console.log('Received ticket data:', req.body);
    console.log('Ticket type:', req.params.type);
    
    const Model = getTicketModel(req.params.type);
    
    // Generate a ticket ID based on type
    const prefix = req.params.type === 'general' ? 'GT' : 
                  req.params.type === 'research' ? 'RR' : 'BF';
    const ticketId = `${prefix}-${Date.now().toString().slice(-6)}`;
    
    // Map the incoming form data to match the schema
    const ticketData = {
      ticketId,
      description: req.body.description || req.body.actionTaken || 'No description provided',
      status: 'open',
      reportedBy: {
        name: req.body.problemSolver || 'Anonymous',
        department: 'Operations'
      },
      category: req.body.problemType || 'General',
      priority: req.body.priority || 'medium',
      timeline: {
        created: req.body.timestamp || new Date(),
        lastUpdated: new Date()
      },
      notes: req.body.notes || '',
      timestamp: req.body.timestamp || new Date(),
      resolvedAt: req.body.resolvedAt || new Date(),
      // Additional fields based on ticket type
      ...(req.params.type === 'general' && {
        subCategory: req.body.subCategory || 'Other',
        actionItems: [{
          description: req.body.actionTaken,
          status: 'completed',
          completedAt: new Date()
        }]
      }),
      ...(req.params.type === 'research' && {
        researchType: req.body.researchType || 'General',
        urgency: req.body.priority || 'normal',
        findings: req.body.notes || ''
      }),
      ...(req.params.type === 'brand' && {
        brandName: req.body.brandName || 'Unknown',
        feedbackType: req.body.feedbackType || 'other',
        severity: req.body.priority || 'medium'
      })
    };
    
    console.log('Creating ticket with data:', ticketData);
    
    const ticket = new Model(ticketData);
    await ticket.save();
    
    console.log('Ticket saved successfully:', ticket);
    res.status(201).json(ticket);
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(400).json({ 
      message: error.message,
      details: error.errors ? Object.values(error.errors).map(err => err.message) : []
    });
  }
});

// Get all tickets of a specific type
router.get('/:type', async (req, res) => {
  try {
    const Model = getTicketModel(req.params.type);
    const tickets = await Model.find().sort({ timestamp: -1 });
    res.json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get all tickets across all collections
router.get('/', async (req, res) => {
  try {
    const [generalTickets, researchTickets, brandTickets] = await Promise.all([
      GeneralTicket.find(),
      ResearchRequest.find(),
      BrandFeedback.find()
    ]);

    const allTickets = [
      ...generalTickets.map(t => ({ ...t.toObject(), ticketType: 'general' })),
      ...researchTickets.map(t => ({ ...t.toObject(), ticketType: 'research' })),
      ...brandTickets.map(t => ({ ...t.toObject(), ticketType: 'brand' }))
    ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    res.json(allTickets);
  } catch (error) {
    console.error('Error fetching all tickets:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update ticket status
router.patch('/:type/:id', async (req, res) => {
  try {
    const Model = getTicketModel(req.params.type);
    const ticket = await Model.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    res.json(ticket);
  } catch (error) {
    console.error('Error updating ticket:', error);
    res.status(400).json({ message: error.message });
  }
});

// Log all routes being registered
console.log('Routes registered:');
router.stack.forEach((route) => {
  if (route.route) {
    console.log(`${Object.keys(route.route.methods).join(', ').toUpperCase()} ${route.route.path}`);
  }
});

module.exports = router; 