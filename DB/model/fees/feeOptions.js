const mongoose = require("mongoose");

const feeOptions = new mongoose.Schema(
  {
    
    startingDay:{
        type:String,
    },
    delayWithFoodTillDay:{
        type:String,
    },
    delayWithoutFoodTillDay:{
        type:String,
    },
    //اعادة تسكين مع غرامة
    rehousingWithFineTillDay:{
        type:String,
    },
    maximumFeedingAllowanceRefund:{
        type:String,
    },
    createdOrEditedBy:{
        type:String
    },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("feeOptions", feeOptions);
