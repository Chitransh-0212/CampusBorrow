const mongoose = require('mongoose');

const borrowRequestSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true,
  },
  borrower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  startDate: {
    type: Date,
    required: [true, 'Please provide a start date'],
  },
  endDate: {
    type: Date,
    required: [true, 'Please provide an end date'],
  },
  message: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'returned'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('BorrowRequest', borrowRequestSchema);
