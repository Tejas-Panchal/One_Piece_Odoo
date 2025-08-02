const express = require('express');
const router = express.Router();
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');

const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', getCategories);

router.post('/', protect, admin, createCategory);
router.put('/:id', protect, admin, updateCategory);
router.delete('/:id', protect, admin, deleteCategory);

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Category API' });
});

module.exports = router;