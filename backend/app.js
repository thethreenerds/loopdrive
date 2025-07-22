const express = require('express');
const app = express();
const sampleRoutes = require('./routes/sampleRoutes');
const userRoutes = require('./routes/userRoutes');

const authRoutes = require('./routes/authRoutes');


app.use(express.json());
app.use('/api/samples', sampleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;