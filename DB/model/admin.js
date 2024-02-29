const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema(
  {
name:{
    type:String,
    required: [true, "name is required"],
  },

  nationalID:{
    type:String,
    required: [true, "nationalID is required"],
    unique: true,
  },
  endDateOfEmployment:{

    type:Date,
  },
  userName:{
    type:String,
    required: [true, "userName is required"],
    unique: true,
  },
  password:{
    type:String,
    required: [true, "password is required"],
  },
  accountEndDate:{
    type:Date,
  }

}

  
,
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("admin", adminSchema);
