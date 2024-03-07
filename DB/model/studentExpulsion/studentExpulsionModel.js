const mongoose = require('mongoose')

const studentExpulsionSchema = new mongoose.Schema({
  studentId : {type: mongoose.ObjectId, ref: 'User'},
  studentName:{type:String},
  roomId:{type: mongoose.ObjectId, ref: 'Rooms'},
  penaltyKind:{type:String},
  reason:{
  type:String,
  // enum:[ 'اخلاء مؤقت' , 'اخلاء نهائي']
},
  cancellation:{type:String},
  expulsionDate: {
    type: Date,
    default: Date.now,
  },
  createdBy: { type: mongoose.ObjectId, ref: 'Admin' },
  createdAt:{type: Date, default: Date.now()}
}, {
  timestamps: true,
})



module.exports = mongoose.model('expulsion', studentExpulsionSchema)