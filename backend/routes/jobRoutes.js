// routes/jobRoutes.js
const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { getJobs, getJobDetails, submitApplication,appliedJobs,getJobById, createJob, updateJob, deleteJob } = require('../controllers/jobController');

const router = express.Router();

router.get('/employerjobs', getJobs);
//router.get('/:id', getJobById);
router.post('/', createJob);
router.put('/update/:id', updateJob);
router.delete('/delete/:id', deleteJob);


router.get('/jobs', getJobs);
router.get('/jobs/:id', getJobDetails);
router.post('/jobs/:id/apply',protect,
     submitApplication);
router.get('/applied-jobs',protect, appliedJobs);
module.exports = router;
