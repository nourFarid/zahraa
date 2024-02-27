const mongoose = require('mongoose')

const universityPhotos = new mongoose.Schema({
    
    name: String,
    data: Buffer,
    contentType: String,
    whatFor: String,
   


}, {
    timestamps: true
})

module.exports = mongoose.model('universityPhotos', universityPhotos)

