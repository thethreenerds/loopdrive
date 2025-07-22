const express = require('express');
const app = express();
const sampleRoutes = require('./routes/sampleRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use('/api/samples', sampleRoutes);
app.use('/api/users', userRoutes);

module.exports = app;