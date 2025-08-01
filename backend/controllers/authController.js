const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { findUserByEmail, createUser } = require('../models/userModel');


exports.register = async (req, res) => {
    const {email, password} = req.body;

    try {
        const existingUser = await findUserByEmail(email);
        if (existingUser) return res.status(400).json({ message: 'Email already in use'});

        const hashedPassword = await bcrypt.hash(password, 10);
        await createUser(email, hashedPassword);

        res.status(201).json({ message: 'User registered Successfully'});
    } catch (err) {
        res.status(500).json({message: 'Server error', error: err.message})
        }
};





exports.login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await findUserByEmail(email);
        if (!user) return res.status(400).json({message: 'Invalid Credentials'});

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if(!isMatch) return res.status(400).json({message: 'Invalid credentials'});

        const token = jwt.sign({ id: user.id}, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({message: 'Login successful', token});
    } catch (err) {
        res.status(500).json({message: 'Server error', error: err.message});
    }
};