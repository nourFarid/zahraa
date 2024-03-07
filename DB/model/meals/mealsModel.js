const mongoose = require('mongoose')

const mealsSchema = new mongoose.Schema({
  mealsName:{type:String},
  mealsKind:{type:String},
  cancellation:{type:String},
  mealStartTime:{type: Date},
  mealEndTime:{type: Date},
  RamadanMeal:{type:Boolean},
  mealReligion:{type:String, enum:[ "مسلم","مسيحي"]},
  studentReligion:{type:String, enum:[ "مسلم","مسيحي"]},
  mealAfterSubsidy:{type: Date},
  mealBeforeSubsidy:{type: Date},
  editAndAdd:{type: mongoose.ObjectId, ref: 'Admin'},
  createdAt:{type: Date, default: Date.now()},
  RamadanMeal:{type: Boolean},
  //حجز الوجبات اكسيل
  file:{type: String},
  data:{type: Buffer},
  ofYear:{type:String},
  ofWhichMeal:{type:String},
  dateOfBookingMeals:{type:String},

  
  

}, {
  timestamps: true,
})



module.exports = mongoose.model('Meals', mealsSchema)