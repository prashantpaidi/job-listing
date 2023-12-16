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

module.exports = router;
