const mongoose = require('mongoose')

const excludedCountries = new mongoose.Schema({
    country: { type: String },
    distance:{type: Number},
    StatusOfDependentAreas:{type: String},


}, {
    timestamps: true
})

module.exports = mongoose.model('excludedCountries', excludedCountries)

