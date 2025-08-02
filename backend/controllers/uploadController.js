const cloudinary = require('../config/cloudinaryConfig');

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    // The file is available at req.file.path thanks to Multer
    const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'quickdesk_attachments', // Optional: saves files in a specific folder in Cloudinary
    });

    res.status(200).json({
      message: 'File uploaded successfully',
      url: result.secure_url, // The secure URL of the uploaded file
    });
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    res.status(500).json({ message: 'Error uploading file.', error: error.message });
  }
};

module.exports = {
  uploadFile,
};