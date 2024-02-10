const mongoose = require('mongoose')

const BuildingSchema = new mongoose.Schema({
  Name : {type: String , required : true},
  Gender : { type: String , enum: ['انثي', 'ذكر']  , required : true ,lowercase: true },
  UniversityCityId:{ type: mongoose.ObjectId, ref: 'UniversityCity' , required : true},
  sportsHall:{ type: Number,default:1 },
  sportsHall:{ type: Number,default:1 },
  InternetHall:{ type: Number,default:1 },
  AdministrativeRooms:{ type: Number,default:1 },
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