const { Router } = require('express');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const { applyForJob, getApplications, getApplicationById, updateApplication, deleteApplication, acceptOrRejectApplication } = require('../controllers/applicationController');

const router = Router();

const { GridFSBucket } = require('mongodb');

let gfsBucket;
// Initialize GridFS
const conn = mongoose.connection;

conn.once('open', () => {
    gfsBucket = new GridFSBucket(conn.db, {
        bucketName: 'uploads',
    });
});
// Route to get and download a file (resume or cover letter)
router.get('/files/:id', async (req, res) => {
    try {
        const _id = new mongoose.Types.ObjectId(req.params.id);

        const files = await conn.db.collection('uploads.files').findOne({ _id });

        if (!files || files.length === 0) {
            return res.status(404).json({ err: 'No file exists' });
        }

        const downloadStream = gfsBucket.openDownloadStream(_id);

        res.set('Content-Type', files.contentType);
        downloadStream.pipe(res);
    } catch (err) {
        console.error('Error retrieving file:', err.message);
        res.status(500).json({ err: 'Error retrieving file', details: err.message });
    }
});


// Application routes
router.get('/', getApplications);
router.get('/:id', getApplicationById);



module.exports = router;
