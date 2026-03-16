const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
  // Hero Section
  heroName: { type: String, default: 'Satvic\nReddy' },
  heroTitle1: { type: String, default: 'ANDROID' },
  heroSubtitle1: { type: String, default: 'DEVELOPER' },
  heroTitle2: { type: String, default: 'ML/AI' },
  heroSubtitle2: { type: String, default: 'ENGINEER' },
  heroDescription: { type: String, default: 'Crafting immersive digital experiences with\nprecision and performant code.' }
}, { timestamps: true });

module.exports = mongoose.models.Hero || mongoose.model('Hero', heroSchema);
