const express = require('express');
const path = require('path');
const app = express();
const sampleRoutes = require('./routes/sampleRoutes');
const userRoutes = require('./routes/userRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const authRoutes = require('./routes/authRoutes');


app.use(express.json());

//adding line to serve uploaded files
app.use('/uploads', express.static(path,join(__dirname, 'uploads')));

app.use('/api/samples', sampleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/uploads', uploadRoutes);

module.exports = app;