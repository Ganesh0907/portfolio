// models/Project.js
const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String }, // URL or static path in /public/images
  liveUrl: { type: String },
  repoUrl: { type: String },
  order: { type: Number, default: 0 }
});

module.exports = mongoose.model('Project', ProjectSchema);
