const mongoose = require('mongoose')

const typeOfSpecialHousing = new mongoose.Schema({
  

    typeOfHousing:{
        type:String,
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('typeOfSpecialHousing', typeOfSpecialHousing)

