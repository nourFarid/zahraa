const mongoose = require('mongoose')

const BuildingSchema = new mongoose.Schema({
  Name : {type: String , required : true  , unique: [true , "Please enter another building name"]},
  Gender : { type: String , enum: ['انثي', 'ذكر']  , required : true ,lowercase: true },
  UniversityCityId:{ type: mongoose.ObjectId, ref: 'UniversityCity' , required : true},
  createdBy: { type: mongoose.ObjectId, ref: 'Admin' },
  createdAt:{type: Date, default: Date.now()}
}, {
//  strictPopulate: false ,

  timestamps: true,
  toJSON :{virtuals:true},
  toObject:{virtuals : true}
})
BuildingSchema.virtual('FLOORS' , {
localField : '_id',
foreignField :'BuildingId',
ref: 'Floor'
})


module.exports = mongoose.model('Buildings', BuildingSchema)