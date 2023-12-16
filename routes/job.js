const express = require('express');
const { isAuthenticated } = require('../middleware/auth');
const Job = require('../models/JobModel');

const router = express.Router();

router.post('/create', isAuthenticated, async (req, res) => {
  try {
    const {
      companyName,
      logoURL,
      position,
      salary,
      jobType,
      remote,
      location,
      description,
      aboutCompany,
      skills,
      recruiterName,
    } = req.body;
    console.log(
      companyName,
      logoURL,
      position,
      salary,
      jobType,
      remote,
      location,
      description,
      aboutCompany,
      skills,
      recruiterName
    );
    if (
      !companyName ||
      !logoURL ||
      !position ||
      !salary ||
      !jobType ||
      !remote ||
      !location ||
      !description ||
      !aboutCompany ||
      !skills ||
      !recruiterName
    ) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    let skillsArray = skills;
    if (typeof skills === 'string') {
      skillsArray = skills.split(',').map((skill) => skill.trim());
    }
    console.log(req.body);
    await Job.create({
      companyName,
      logoURL,
      position,
      salary,
      jobType,
      remote,
      location,
      description,
      aboutCompany,
      skills: skillsArray,
      recruiterName,
    });

    res.send({
      status: 'SUCCESS',
      message: 'Job posted successfully',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

//  edit

router.put('/update/:id', isAuthenticated, async (req, res) => {
  try {
    const id = req.params.id;
    const { position, salary, description, skills, recruiterName } = req.body;

    if (!position || !salary || !description || !skills || !recruiterName) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    let skillsArray = skills;
    if (typeof skills === 'string') {
      skillsArray = skills.split(',').map((skill) => skill.trim());
    }

    const updatedJob = await Job.findByIdAndUpdate(
      id,
      {
        position,
        salary,
        description,
        skills: skillsArray,
        recruiterName,
      },
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }

    return res.json({
      status: 'SUCCESS',
      message: 'Job post updated successfully',
      updatedJob,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Get Job Posts with Filters API
router.get('/get-jobs', async (req, res) => {
  const { jobType, skills } = req.query;

  console.log(skills);
  // return res.status(200).json({ message: 'Test' });
  try {
    let query = {};

    if (jobType) {
      query.jobType = jobType;
    }

    if (skills) {
      query.skills = { $in: skills };
    }
    console.log(query);
    const jobs = await Job.find(query).sort({ createdAt: -1 });

    return res.json({ jobs });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
