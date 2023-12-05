const mongoose = require('mongoose')

const acceptanceInstructionsSchema = new mongoose.Schema({
    contextOfInstructions: { type: String, required: true },
    createdBy: { type: mongoose.ObjectId, ref: 'User', required: false },
    
}, {
    timestamps: true
})

module.exports = mongoose.model('acceptanceInstructions', acceptanceInstructionsSchema)

