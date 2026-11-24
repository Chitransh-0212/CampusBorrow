const express = require('express');
const router = express.Router();
const {
  createBorrowRequest,
  getMyBorrowRequests,
  getIncomingRequests,
  updateRequestStatus,
} = require('../controllers/borrowController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, createBorrowRequest);
router.get('/my-requests', protect, getMyBorrowRequests);
router.get('/incoming', protect, getIncomingRequests);
router.put('/:id/status', protect, updateRequestStatus);

module.exports = router;
