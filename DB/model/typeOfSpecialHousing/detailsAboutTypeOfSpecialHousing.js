const mongoose = require('mongoose')

const detailsAboutTypeOfSpecialHousing = new mongoose.Schema({
  

    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "typeOfSpecialHousing",
      },
      name:{
        type:String,
      },
      cityType:{

        type:String,
      },

      capacity:{
        type:Number,
      }


}, {
    timestamps: true
})

module.exports = mongoose.model('detailsAboutTypeOfSpecialHousing', detailsAboutTypeOfSpecialHousing)

