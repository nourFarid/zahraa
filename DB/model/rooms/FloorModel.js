const mongoose = require('mongoose')

const FloorSchema = new mongoose.Schema({
  Name : {type: String , required : true},
  BuildingId:{ type: mongoose.ObjectId, ref: 'Buildings' , required : true},
  createdBy: { type: mongoose.ObjectId, ref: 'Admin' },
  createdAt:{type: Date, default: Date.now()}
}, {
//  strictPopulate: false ,

  timestamps: true,
  toJSON :{virtuals:true},
  toObject:{virtuals : true}
})
FloorSchema.virtual('ROOMS' , {
localField : '_id',
foreignField :'FloorId',
ref: 'Rooms'
})


module.exports = mongoose.model('Floor', FloorSchema)