const Job = require('../models/jobModel');
const Application = require('../models/application');
const multer = require('multer');
const { uploadFile } = require('../services/gridfsService');

// Setup multer for file uploads
const storage = multer.memoryStorage();
//const upload = multer({ storage }).single('resume');
const upload = multer({ storage }).fields([
  { name: 'resume', maxCount: 1 },
  { name: 'coverLetter', maxCount: 1 }
]);
const getJobs = async (req, res) => {
try {
  console.log('get jobs:' + req.user);
        const { userType } = req.user;

        const jobs = userType === 'jobSeeker'
            ? await Job.find({})
            : await Job.find({ employer: req.user._id });

        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  /*try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load jobs' });
  }*/
};

const getJobDetails = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load job details' });
  }
};

const appliedJobs = async (req, res) => {
  try {
    const applications = await Application.find({ userId: req.user.id });
    console.log(applications);
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load applied jobs' });
  }
};
/*
const submitApplication = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to upload resume' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Resume is required' });
    }

    try {
      const { jobId, coverLetter } = req.body;

      const existingApplication = await Application.findOne({ jobId, userId: req.user.id });
      if (existingApplication) {
        return res.status(400).json({ message: 'You have already applied for this job' });
      }

      console.log('Resume file:', req.file);

      const resumeFile = await uploadFile(req.file);
      if (!resumeFile || !resumeFile._id) {
        throw new Error('Failed to upload resume file');
      }

      console.log('Resume file ID:', resumeFile._id);
      console.log('user ID:', req.user.id);

      const application = new Application({
        jobId,
        userId: req.user.id,
        coverLetter,
        resumeId: resumeFile._id,
        applicantName: req.user.name,
        applicantEmail: req.user.email
      });

      await application.save();
      res.status(201).json({ message: 'Application submitted successfully!' });
    } catch (error) {
      console.error('Error during application submission:', error);
      res.status(500).json({ message: 'Failed to submit application' });
    }
  });
};*/
const submitApplication = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to upload files' });
    }
  
    // Check if the resume file is present
    if (!req.files || !req.files.resume || req.files.resume.length === 0) {
      return res.status(400).json({ message: 'Resume is required' });
    }
  
    try {
      const { jobId } = req.body;
      let coverLetterFile = null;
  
      // Check if the user has already applied for the job
      const existingApplication = await Application.findOne({ jobId, userId: req.user.id });
      if (existingApplication) {
        return res.status(400).json({ message: 'You have already applied for this job' });
      }
  
      // Upload resume file
      console.log('Resume file:', req.files.resume[0]);
      const resumeFile = await uploadFile(req.files.resume[0]);
      if (!resumeFile || !resumeFile._id) {
        throw new Error('Failed to upload resume file');
      }
  
      console.log('Resume file ID:', resumeFile._id);
      console.log('user ID:', req.user.id);
  
      // If a cover letter is provided, upload it
      if (req.files.coverLetter && req.files.coverLetter.length > 0) {
        console.log('Cover letter file:', req.files.coverLetter[0]);
        coverLetterFile = await uploadFile(req.files.coverLetter[0]);
        if (!coverLetterFile || !coverLetterFile._id) {
          throw new Error('Failed to upload cover letter file');
        }
        console.log('Cover letter file ID:', coverLetterFile._id);
      }
  
      // Create and save the application
      const application = new Application({
        jobId,
        userId: req.user.id,
        coverLetter: coverLetterFile ? coverLetterFile._id : null,
        resumeId: resumeFile._id,
        applicantName: req.user.name,
        applicantEmail: req.user.email
      });
  
      await application.save();
      res.status(201).json({ message: 'Application submitted successfully!' });
    } catch (error) {
      console.error('Error during application submission:', error);
      res.status(500).json({ message: 'Failed to submit application' });
    }
  });
};

const createJob = async (req, res) => {
    const { title, type, salaryRange, applicationDeadline, contactEmail, requiredSkills, companyName, description, location } = req.body;
    
    try {
        const employer = req.user._id;
        const job = await Job.create({ title, type, salaryRange, applicationDeadline, contactEmail, requiredSkills, companyName, description, location, employer: req.user._id });
        res.status(201).json(job);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const getJobById = async (req, res) => {
    const { id } = req.params;
    try {
        const job = await Job.findById(id);
        res.json(job);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const updateJob = async (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    try {
        const employer = req.user._id;
        const job = await Job.findById(id);

        if (job && job.employer.toString() === employer.toString()) {
            
            const keys = Object.keys(changes);

            for (let i = 0; i < keys.length; i++) {
                const field = keys[i];
                job[field] = changes[field];
            }

            const updatedJob = await job.save();
            res.json(updatedJob);
        } else {
            res.status(404).json({ message: 'Job is either not editable for you or it does not exist' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteJob = async (req, res) => {
    const { id } = req.params;

    try {
        const employer = req.user._id;
        const job = await Job.findById(id);

        if (job && job.employer.toString() === employer.toString()) {
            await job.remove();
            res.json({ message: 'Job removed' });
        } else {
            res.status(404).json({ message: 'Either Job cannot be deleted by you or it does not exist.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { 
 createJob,
    getJobs,
    getJobById,
    updateJob,
    deleteJob
    , getJobDetails, submitApplication, appliedJobs };
