// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const projectsRoute = require('./routes/projects');
const contactRoute = require('./routes/contact');

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/projects', projectsRoute);
app.use('/api/contact', contactRoute);

// Serve static frontend
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// For SPA/fallback to index.html
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ message: 'API route not found' });
  }
  res.sendFile(path.join(publicPath, 'index.html'));
});

// Connect DB + start server
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => {
  console.error('MongoDB connection error:', err.message);
});
