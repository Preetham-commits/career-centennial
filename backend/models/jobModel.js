const { model, Schema } = require('mongoose');

const jobPostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    
    type: {
        type: String,
        required: true
    },

    salaryRange: {
        type: String,
        required: true
    },

    applicationDeadline: {
        type: Date,
        required: true
    },

    contactEmail: {
        type: String,
        required: true
    },

    requiredSkills: {
        type: String,
        required: true
    },

    applied: {
        type: Boolean,
        default: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    accepted: {
        type: Boolean,
        default: false
    },

    appliedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Job-Seeker'
    },

    companyName: {
        type: String,
        required: true
    },

    employer: {
        type: String,
        required: true
    },

    
    description: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },
});

module.exports = model('Job-Post', jobPostSchema);