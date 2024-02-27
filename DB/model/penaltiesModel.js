const mongoose = require('mongoose')

const penaltySchema = new mongoose.Schema({
  studentId : {type: mongoose.ObjectId, ref: 'User'},
  ofYear:{type:String},
  studentName:{type:String},
  reason:{type:String},
  penaltyKind:{
  type:String,
  enum:[ 'جزاء اداري' , 'جزاء سلوكي']},
  cancellationDate:{type:Date},
  createdBy: { type: mongoose.ObjectId, ref: 'Admin' },
  createdAt:{type: Date, default: Date.now()},
  PenaltyDate:{type:Date}
}, {
  timestamps: true,
})



module.exports = mongoose.model('Penalty', penaltySchema)