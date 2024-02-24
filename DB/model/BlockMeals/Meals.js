const mongoose = require('mongoose')

const mealSchema = new mongoose.Schema({
  studentIds: {
    type: mongoose.ObjectId , required: true, ref: 'User'},
  studentName:{type:String},
  dateFrom:{type: Date},
  dateTo:{type: Date},
  meals: {
    type: {
      type: String,
      enum: ["عشاء", "غداء"],
    },
    default: [],
  },
  reason:{type:String},
  day:{type:String},
  hasBlocked:{type:Boolean,default:false},
}, 
{
    timestamps: true
})

module.exports = mongoose.model('BlockMeals', mealSchema)