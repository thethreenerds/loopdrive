const express = require('express');
const router = express.Router();
const upload = require('../middleware/multerConfig');
const verifyToken = require('../middleware/verifyToken');
const { handleUpload, getMyUploads, searchSamples, updateSample, deleteSample } = require('../controllers/uploadController');

router.post('/upload', verifyToken, upload.single('audio'), handleUpload);
router.get('/my-uploads', verifyToken, getMyUploads);
router.get('/search', verifyToken, searchSamples);
router.put('/:id', verifyToken, updateSample);
router.delete('/:id', verifyToken, deleteSample);
module.exports = router;