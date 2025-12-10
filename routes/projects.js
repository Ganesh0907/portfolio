// routes/projects.js
const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// GET /api/projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, title: 1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
