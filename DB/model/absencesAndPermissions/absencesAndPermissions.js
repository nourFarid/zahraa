const mongoose = require('mongoose')

const absencesSchema = new mongoose.Schema({
  StudentId : {type: mongoose.ObjectId , required: true, ref: 'User'},
  studentName:{type:String},
  dateFrom:{type: Date},
  dateTo:{type: Date},
  TypeOfAbsence:{type:String},
  PaymentValueNumber:{type:String},
  paymentDate:{type:String},
  notes:{type:String},
  hasBlocked:{type:Boolean},
}, {
    timestamps: true
})

module.exports = mongoose.model('Absence&Permissions', absencesSchema)