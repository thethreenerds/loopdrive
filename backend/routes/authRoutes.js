

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Use controller here instead of inline function
router.post('/register', authController.register);


module.exports = router;
