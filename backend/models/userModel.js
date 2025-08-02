const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true, 
      match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    role: {
      type: String,
      required: true,
      enum: ['End User', 'Support Agent', 'Admin'], 
      default: 'End User', 
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model('User', userSchema);