const mongoose = require('mongoose')

const roomsSchema = new mongoose.Schema({
  roomNumber : {type: Number , required: true},
  studentId : {type: mongoose.ObjectId, ref: 'User'},
  roomType: {type: String , enum: ['Normal', 'Special'] },
  occupants :[{type:String}], // room feha kam hd 
  Type : {type: String },
  numOfBeds : {type : Number},
  Capacity : {type: String },
  FloorId:{ type: mongoose.ObjectId, ref: 'Floor'},
  createdBy: { type: mongoose.ObjectId, ref: 'Admin' },
  createdAt:{type: Date, default: Date.now()},
}, {
  timestamps: true
})


module.exports = mongoose.model('Rooms', roomsSchema)
