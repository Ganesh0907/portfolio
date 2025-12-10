// seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio_db';

const sampleProjects = [
  {
    title: 'Memory Card Game',
    description: 'A simple matching card game using JS, DOM, and local state.',
    image: '/images/memory-card.png',
    liveUrl: '#',
    repoUrl: 'https://github.com/yourusername/memory-card'
  },
  {
    title: 'Expense Tracker',
    description: 'Track income and expenses with localStorage.',
    image: '/images/expense-tracker.png',
    liveUrl: '#',
    repoUrl: 'https://github.com/yourusername/expense-tracker'
  },
  {
    title: 'Music Player',
    description: 'Custom audio player with playlist and controls.',
    image: '/images/music-player.png',
    liveUrl: '#',
    repoUrl: 'https://github.com/yourusername/music-player'
  },
  {
    title: 'GitHub Finder',
    description: 'Search GitHub users using the GitHub API.',
    image: '/images/github-finder.png',
    liveUrl: '#',
    repoUrl: 'https://github.com/yourusername/github-finder'
  }
];

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(async () => {
  console.log('Connected to DB, seeding projects...');
  await Project.deleteMany({});
  await Project.insertMany(sampleProjects);
  console.log('Seeding completed.');
  process.exit(0);
})
.catch(err => {
  console.error(err);
  process.exit(1);
});
