const mongoose = require('mongoose')

const studentExpulsionSchema = new mongoose.Schema({
  studentId : {type: mongoose.ObjectId, ref: 'User'},
  nameOfStudent:{type:String},
  roomId:{type: mongoose.ObjectId, ref: 'Rooms'},
  penaltyKind:{type:String},
  reason:{
  type:String,
  enum:[ 'جزاء اداري' , 'جزاء سلوكي']},
  cancellation:{type:String},
  createdBy: { type: mongoose.ObjectId, ref: 'Admin' },
  createdAt:{type: Date, default: Date.now()}
}, {
  timestamps: true,
})



module.exports = mongoose.model('expulsion', studentExpulsionSchema)