const BorrowRequest = require('../models/BorrowRequest');
const Item = require('../models/Item');

// @desc    Create a borrow request
// @route   POST /api/borrow
// @access  Private
const createBorrowRequest = async (req, res) => {
  try {
    const { itemId, startDate, endDate, message } = req.body;

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ status: 'error', message: 'Item not found' });
    }

    if (item.status !== 'available') {
      return res.status(400).json({ status: 'error', message: 'Item is not available for borrowing' });
    }

    if (item.owner.toString() === req.user._id.toString()) {
      return res.status(400).json({ status: 'error', message: 'You cannot borrow your own item' });
    }

    const request = await BorrowRequest.create({
      item: itemId,
      borrower: req.user._id,
      owner: item.owner,
      startDate,
      endDate,
      message,
    });

    res.status(201).json({ status: 'success', data: request });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// @desc    Get borrow requests made BY the logged-in user
// @route   GET /api/borrow/my-requests
// @access  Private
const getMyBorrowRequests = async (req, res) => {
  try {
    const requests = await BorrowRequest.find({ borrower: req.user._id })
      .populate('item', 'title category status')
      .populate('owner', 'name email')
      .sort({ createdAt: -1 });

    res.json({ status: 'success', count: requests.length, data: requests });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// @desc    Get borrow requests FOR the logged-in user's items (owner view)
// @route   GET /api/borrow/incoming
// @access  Private
const getIncomingRequests = async (req, res) => {
  try {
    const requests = await BorrowRequest.find({ owner: req.user._id })
      .populate('item', 'title category')
      .populate('borrower', 'name email')
      .sort({ createdAt: -1 });

    res.json({ status: 'success', count: requests.length, data: requests });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// @desc    Update status of a borrow request (approve/reject/returned)
// @route   PUT /api/borrow/:id/status
// @access  Private (owner only)
const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ['approved', 'rejected', 'returned'];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ status: 'error', message: 'Invalid status value' });
    }

    const request = await BorrowRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ status: 'error', message: 'Borrow request not found' });
    }

    if (request.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ status: 'error', message: 'Not authorized' });
    }

    request.status = status;
    await request.save();

    // Update item status accordingly
    const item = await Item.findById(request.item);
    if (item) {
      if (status === 'approved') item.status = 'borrowed';
      if (status === 'returned' || status === 'rejected') item.status = 'available';
      await item.save();
    }

    res.json({ status: 'success', data: request });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

module.exports = {
  createBorrowRequest,
  getMyBorrowRequests,
  getIncomingRequests,
  updateRequestStatus,
};
