const express = require('express');
const router = express.Router();
const upload = require('../middleware/multerConfig');
const { handleUpload } = require('../controllers/uploadController');
const verifyToken = require('../middleware/verifyToken');

router.post('/upload', verifyToken, upload.single('audio'), handleUpload);

module.exports = router;