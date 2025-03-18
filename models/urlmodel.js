const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    chotaUrl: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: false,
    }
})

urlSchema.index({ chotaUrl: 1 }, { unique: true });
urlSchema.index({ userId: 1 });

module.exports = mongoose.model('Url', urlSchema);