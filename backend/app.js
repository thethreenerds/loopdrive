const express = require('express');
const app = express();
const sampleRoutes = require('./routes/sampleRoutes');
const userRoutes = require('./routes/userRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const authRoutes = require('./routes/authRoutes');


app.use(express.json());
app.use('/api/samples', sampleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/uploads', uploadRoutes);

module.exports = app;