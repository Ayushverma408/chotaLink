const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    chotaUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
})

urlSchema.index({ chotaUrl: 1 }, { unique: true });

module.exports = mongoose.model('Url', urlSchema);