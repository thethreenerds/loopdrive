const verifyToken = require('../middleware/verifyToken');
const express = require('express');
const router = express.Router();

router.get('/protected', verifyToken, (req, res) => {
    res.json({message: 'You accessed a protected route', user: req.user});
})
router.get('/', (req, res) => {
    res.json({message: 'Sample route working!'});
});

module.exports = router;