const Job = require('../models/jobModel');
const Application = require('../models/application');

const applyForJob = async (req, res) => {
    const { resumeId, coverLetter, applicantName, applicantEmail } = req.body;
    const { id } = req.params; // Job ID

    try {
        const job = await Job.findById(id);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        const application = await Application.create({
            resumeId,
            coverLetter,
            applicantName,
            applicantEmail,
            jobId: id,
            userId: req.user._id
        });

        res.status(201).json(application);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getApplications = async (req, res) => {
    try {
        const { userType, _id: userId } = req.user;
        console.log(userType);
        
        let applications;
        if (userType === 'jobSeeker') {
            // Find applications for the job seeker and populate jobId with job details
            applications = await Application.find({ userId: userId })
                .populate('jobId', 'title companyName location description'); // Populate jobId with required fields
        } else if (userType === 'employer') {
            // Find jobs posted by the employer
            const jobs = await Job.find({ employer: userId });
            const jobIds = jobs.map(job => job._id);

            // Find applications for the jobs posted by the employer and populate jobId with job details
            applications = await Application.find({ jobId: { $in: jobIds } })
                .populate('jobId', 'title companyName location description'); // Populate jobId with required fields
        } else {
            return res.status(403).json({ message: 'Access denied' });
        }

        res.json(applications);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getApplicationById = async (req, res) => {
    const { id } = req.params;

    try {
        const application = await Application.findById(id);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.json(application);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
const updateApplication = async (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    try {
        const application = await Application.findById(id);

        if (application && application.userId.toString() === req.user._id.toString()) {
            Object.keys(changes).forEach(key => {
                application[key] = changes[key];
            });

            const updatedApplication = await application.save();
            res.json(updatedApplication);
        } else {
            res.status(404).json({ message: 'Application not found or unauthorized update attempt' });
        }

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteApplication = async (req, res) => {
    const { id } = req.params;
   // console.log('delete id');
   // console.log(req.user);
    
    try {
        const application = await Application.findById(id).populate('jobId');
        
        //console.log(application);
        if (application && (
            application.userId.toString() === req.user._id.toString() ||
            application.jobId.employer.toString() === req.user._id.toString()
        )) {
            console.log(application);
            await Application.findByIdAndDelete(id);
            res.json({ message: 'Application removed' });
        } else {
            res.status(404).json({ message: 'Application not found or unauthorized delete attempt' });
        }

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const acceptOrRejectApplication = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    
    try {
        console.log('accpete or reject applicaition');
        const application = await Application.findById(id).populate('jobId');
      
        if (application && application.jobId.employer.toString() === req.user._id.toString()) {
            console.log(application);
            console.log(status);
            application.status = status;
            const updatedApplication = await application.save();
            const jobs = await Job.find({ employer: req.user._id });
            const jobIds = jobs.map(job => job._id);

            // Find applications for the jobs posted by the employer and populate jobId with job details
            const updatedApplications = await Application.find({ jobId: { $in: jobIds } })
                .populate('jobId', 'title companyName location description'); 
                console.log(updatedApplications);
            res.json(updatedApplications);
        } else {
            res.status(404).json({ message: 'Application not found or unauthorized update attempt' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(400).json({ message: error.message });
    }
};



module.exports = {
    applyForJob,
    getApplications,
    getApplicationById,
    updateApplication,
    deleteApplication,
    acceptOrRejectApplication
    
};
