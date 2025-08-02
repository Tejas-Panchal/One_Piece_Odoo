const Ticket = require('../models/ticketModel');
const User = require('../models/userModel');
const Category = require('../models/categoryModel');

const getTickets = async (req, res) => {
  try {
    let query;

    // If user is an agent or admin, the query is empty (find all)
    // Otherwise, the query filters for tickets by the logged-in user's ID
    if (req.user.role === 'Support Agent' || req.user.role === 'Admin') {
      query = Ticket.find({});
    } else {
      query = Ticket.find({ user: req.user.id });
    }

    const tickets = await query
      .populate('user', 'name email')
      .populate('category', 'name')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 }); 

    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getTicketById = async (req, res) => {
  try {
    
    const ticket = await Ticket.findById(req.params.id)
      .populate('user', 'name email')
      .populate('category', 'name')
      .populate('assignedTo', 'name email'); 

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    if (ticket.user._id.toString() !== req.user.id && req.user.role === 'End User') {
      return res.status(403).json({ message: 'User not authorized' });
    }

    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createTicket = async (req, res) => {
  try {
    const { subject, description, category, attachments } = req.body;

    if (!subject || !description || !category) {
      return res.status(400).json({ message: 'Please include subject, description, and category' });
    }

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
        return res.status(400).json({ message: 'Invalid category' });
    }

    const ticket = await Ticket.create({
      user: req.user.id,
      subject,
      description,
      category,
      attachments
    });

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateTicket = async (req, res) => {
    try {
        // Get status, comment, or assignedTo from the request body
        const { status, comment, assignedTo } = req.body;

        const ticket = await Ticket.findById(req.params.id);

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        // An End User can only add a comment to their own ticket
        if (ticket.user.toString() !== req.user.id && req.user.role === 'End User') {
            return res.status(403).json({ message: 'User not authorized' });
        }

        // --- AGENT/ADMIN ONLY ACTIONS ---
        if (req.user.role === 'Support Agent' || req.user.role === 'Admin') {
            if (status) {
                ticket.status = status;
            }
            if (assignedTo) {
                ticket.assignedTo = assignedTo;
            }
        } else { // If user is not an agent, they cannot change status or assign
            if (status || assignedTo) {
                return res.status(403).json({ message: 'Not authorized to perform this action' });
            }
        }

        // Anyone authorized can add a comment
        if (comment) {
            const commentObj = {
                user: req.user.id,
                text: comment,
                createdAt: new Date(),
            };
            ticket.comments.push(commentObj);
        }

        const updatedTicket = await ticket.save();
        // Populate user details in the response
        const populatedTicket = await Ticket.findById(updatedTicket._id)
                                                .populate('user', 'name email')
                                                .populate('category', 'name')
                                                .populate('assignedTo', 'name email');
        res.status(200).json(populatedTicket);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


module.exports = {
  getTickets,
  getTicketById,
  createTicket,
  updateTicket,
};