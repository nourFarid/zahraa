const mongoose = require("mongoose");
const logsSchema = new mongoose.Schema(
  {
adminID:{
    type:mongoose.ObjectId, 
    ref: 'admin',
   
  },

  adminUserName:{
    type:String,
  },
  endDateOfEmployment:{

    type:Date,
  },
  action:{
    type:String,
  },
  objectName:{
    type:String,
  },

}

  
,
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("logs", logsSchema);
