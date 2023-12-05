const mongoose = require('mongoose')

const penaltySchema = new mongoose.Schema({
  studentId : {type: mongoose.ObjectId, ref: 'User'},
  studentName:{type:String},
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



module.exports = mongoose.model('Penalty', penaltySchema)