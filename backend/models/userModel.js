const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    userType: {
        type: String,
        required: true,
        enum: ['jobSeeker', 'employer'],
      },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    companyName: {
        type: String,
      },
      companyAddress: {
        type: String,
      },
});



module.exports = mongoose.model('User', userSchema);
