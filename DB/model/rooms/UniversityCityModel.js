const mongoose = require('mongoose')

const universityCitySchema = new mongoose.Schema({
  Name : {type: String , required:true , unique: [true , "Please enter another city name"] },
  createdBy: { type: mongoose.ObjectId, ref: 'Admin' },
  createdAt:{type: Date, default: Date.now()}
}, {
    timestamps: true,
    toJSON :{virtuals:true},
    toObject:{virtuals : true}
})
universityCitySchema.virtual('BUILDINGS' , {
  localField : '_id',
  foreignField :'UniversityCityId',
  ref: 'Buildings'
})

module.exports = mongoose.model('UniversityCity', universityCitySchema)