const mongoose = require('mongoose')

const mealSchema = new mongoose.Schema({
  studentId : {type: mongoose.ObjectId , required: true, ref: 'User'},
  studentName:{type:String},
  dateFrom:{type: Date},
  dateTo:{type: Date},
  meals:{type: String,enum: ["عشاء", "غداء"]},
  reason:{type:String},
  hasBlocked:{type:Boolean,default:false},
}, {
    timestamps: true
})

module.exports = mongoose.model('BlockMeals', mealSchema)