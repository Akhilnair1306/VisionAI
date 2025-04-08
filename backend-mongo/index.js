// index.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const User = require('./models/User')
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/authroutes')
const dataRoutes = require('./routes/dataroutes')

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], 
}));

// const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: '50mb' }));// Parse JSON requests

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });


app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use('/auth', authRoutes);
app.use('/data', dataRoutes)
// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

