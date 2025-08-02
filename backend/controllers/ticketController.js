const Ticket = require('../models/ticketModel');
const User = require('../models/userModel');
const Category = require('../models/categoryModel');

const getTickets = async (req, res) => {
  try {
    let tickets;
    if (req.user.role === 'Support Agent' || req.user.role === 'Admin') {
      tickets = await Ticket.find({}).populate('user', 'name email').populate('category', 'name');
    } else {
      tickets = await Ticket.find({ user: req.user.id }).populate('user', 'name email').populate('category', 'name');
    }
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate('user', 'name').populate('category', 'name');

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
    const { subject, description, category } = req.body;

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
    });

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateTicket = async (req, res) => {
    try {
        const { status, comment } = req.body;

        const ticket = await Ticket.findById(req.params.id);

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        if (ticket.user.toString() !== req.user.id && req.user.role === 'End User') {
            return res.status(403).json({ message: 'User not authorized' });
        }

        if (status && req.user.role !== 'Support Agent' && req.user.role !== 'Admin') {
            return res.status(403).json({ message: 'Not authorized to change ticket status' });
        }

        if (status) {
            ticket.status = status;
        }
        
        if (comment) {
            const commentObj = {
                user: req.user.id,
                text: comment,
                createdAt: new Date(),
            };
            ticket.comments.push(commentObj);
        }

        const updatedTicket = await ticket.save();
        res.status(200).json(updatedTicket);

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