const Item = require('../models/Item');

// @desc    Get all available items
// @route   GET /api/items
// @access  Public
const getItems = async (req, res) => {
  try {
    const { category, status, q } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (status) filter.status = status;
    if (q) filter.title = { $regex: q, $options: 'i' };

    const items = await Item.find(filter)
      .populate('owner', 'name email')
      .sort({ createdAt: -1 });

    res.json({ status: 'success', count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// @desc    Get single item by ID
// @route   GET /api/items/:id
// @access  Public
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('owner', 'name email');
    if (!item) {
      return res.status(404).json({ status: 'error', message: 'Item not found' });
    }
    res.json({ status: 'success', data: item });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// @desc    Create a new item
// @route   POST /api/items
// @access  Private
const createItem = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    if (!title || !description) {
      return res.status(400).json({ status: 'error', message: 'Title and description are required' });
    }

    const item = await Item.create({
      title,
      description,
      category,
      owner: req.user._id,
    });

    res.status(201).json({ status: 'success', data: item });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// @desc    Update an item
// @route   PUT /api/items/:id
// @access  Private (owner only)
const updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ status: 'error', message: 'Item not found' });
    }

    if (item.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ status: 'error', message: 'Not authorized to update this item' });
    }

    const updated = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({ status: 'success', data: updated });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// @desc    Delete an item
// @route   DELETE /api/items/:id
// @access  Private (owner only)
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ status: 'error', message: 'Item not found' });
    }

    if (item.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ status: 'error', message: 'Not authorized to delete this item' });
    }

    await item.deleteOne();
    res.json({ status: 'success', message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// @desc    Get items listed by the logged-in user
// @route   GET /api/items/my-items
// @access  Private
const getMyItems = async (req, res) => {
  try {
    const items = await Item.find({ owner: req.user._id }).sort({ createdAt: -1 });
    res.json({ status: 'success', count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

module.exports = { getItems, getItemById, createItem, updateItem, deleteItem, getMyItems };
