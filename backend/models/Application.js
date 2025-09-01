const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
        trim: true
    },
    position: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['Applied', 'Interviewing', 'Offered', 'Rejected', 'Accepted', 'Withdrawn'],
        default: 'Applied'
    },
    dateApplied: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String,
        trim: true
    },
    location: {
        type: String,
        trim: true
    },
    salary: {
        type: Number
    },
    url: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Application', applicationSchema);