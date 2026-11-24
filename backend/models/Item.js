const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title for the item'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'borrowed'],
    default: 'available',
  },
  category: {
    type: String,
    enum: ['electronics', 'books', 'sports', 'other'],
    default: 'other',
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Item', itemSchema);
