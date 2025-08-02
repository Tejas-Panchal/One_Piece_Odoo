const express = require('express');
const router = express.Router();
const { uploadFile } = require('../controllers/uploadController');
const upload = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');

// Route for a single file upload, protected by authentication
router.post('/', protect, upload.single('attachment'), uploadFile);

module.exports = router;