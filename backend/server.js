const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const applicationRoutes = require('./routes/applications');
const { protect } = require('./middleware/authMiddleware');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, './frontend')));
app.use('/api/jobPosts', protect);
app.use('/api/jobApplications', protect);

app.use('/api/users', userRoutes);
app.use('/api/jobPosts', jobRoutes);
app.use('/api/jobApplications', applicationRoutes);

// All other requests are sent to the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './frontend', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
