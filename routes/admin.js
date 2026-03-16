const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Models
const Project = require('../models/Project');
const Achievement = require('../models/Achievement');
const Certification = require('../models/Certification');
const Skill = require('../models/Skill');
const Training = require('../models/Training');
const Experience = require('../models/Experience');
const SocialPost = require('../models/SocialPost');
const Hero = require('../models/Hero');
const About = require('../models/About');
const models = {
  project: Project,
  achievement: Achievement,
  certification: Certification,
  skill: Skill,
  training: Training,
  experience: Experience,
  socialpost: SocialPost,
  hero: Hero,
  about: About
};

// Generic POST route for any model
// e.g. /api/admin/project
router.post('/:model', auth, async (req, res) => {
  try {
    const modelName = req.params.model.toLowerCase();
    const Model = models[modelName];

    if (!Model) return res.status(400).json({ msg: 'Invalid model type' });

    const newRecord = new Model(req.body);
    const savedRecord = await newRecord.save();
    res.json(savedRecord);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Generic PUT route for any model
router.put('/:model/:id', auth, async (req, res) => {
  try {
    const modelName = req.params.model.toLowerCase();
    const Model = models[modelName];

    if (!Model) return res.status(400).json({ msg: 'Invalid model type' });

    const updatedRecord = await Model.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedRecord);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Generic DELETE route for any model
router.delete('/:model/:id', auth, async (req, res) => {
  try {
    const modelName = req.params.model.toLowerCase();
    const Model = models[modelName];

    if (!Model) return res.status(400).json({ msg: 'Invalid model type' });

    await Model.findByIdAndDelete(req.params.id);
    res.json({ msg: `${modelName} removed` });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
