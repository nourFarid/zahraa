const mongoose = require("mongoose");

const feeTypes = new mongoose.Schema(
  {
    
    feeType:{
        type:String,
    },
    
    necessaryForFeeding:{
        type:Boolean,
    },
    natonality:{
        type:String,
    },
    paymentType:{
        type:String,
    },
    out_inSideUniversity:{
        type:String,
    },
    collageDepartment:{
        type:String,
    },
    //for old
    GPA:{
        type:String,
    },
    //for new
    HighSchoolDivision:{
        type:String,
    },
    applyingToWhome:{
        type:String,
    },
    admissionsType:{
        type:String,
    },
    housingType:{
        type:String,
    },
    housingWithFood:{
        type:String,
    },
    housingInPreviousYears:{
        type:String,
    },
    theAmount:{
        type:String,
    },
    active:{
        type:Boolean
    },
    createdOrEditedBy:{
        type:String
    },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("FeeTypes", feeTypes);
