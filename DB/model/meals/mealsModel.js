const mongoose = require('mongoose')

const mealsSchema = new mongoose.Schema({
  studentName: { type: String },
  studentId : {type: mongoose.ObjectId, ref: 'User'},
  mealsName:{type:String},
  mealsKind:{type:String},
  cancellation:{type:String},
  mealStartTime:{type: Date},
  mealEndTime:{type: Date},
  RamadanMeal:{type:Boolean},
  mealReligion:{type:String, enum:[ "مسلم","مسيحي"]},
  studentReligion:{type:String, enum:[ "مسلم","مسيحي"]},
  mealAfterSubsidy:{type:String},
  mealBeforeSubsidy:{type:String},
  editAndAdd:{type: mongoose.ObjectId, ref: 'Admin'},
  createdAt:{type: Date, default: Date.now()},
  RamadanMeal:{type: Boolean}

}, {
  timestamps: true,
})



module.exports = mongoose.model('Meals', mealsSchema)