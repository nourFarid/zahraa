const mongoose = require('mongoose')

const universityCitySchema = new mongoose.Schema({
  Name : {type: String , required:true , unique: [true , "Please enter another city name"] },
  BuildingId:{ type: mongoose.ObjectId, ref: 'Buildings' , required : true},
  FloorId:{ type: mongoose.ObjectId, ref: 'Floor'},
  RoomId:{ type: mongoose.ObjectId, ref: 'Rooms'},
  Gender : { type: String , enum: ['طالبات', 'طلاب']  , required : true ,lowercase: true },
  family :{type : Number , defult : 1},
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