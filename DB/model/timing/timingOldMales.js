const mongoose = require("mongoose");

const timingOldMalesSchema = new mongoose.Schema({
  ofYear:{
    type:String,
    
  },

  to: {
    type: String,
    required: [true, "String is required"],
  },
  from: {
    type: String,
    required: [true, "String is required"],
    // default: new String(),
  },
});
module.exports = mongoose.model("timingOldMalesSchema", timingOldMalesSchema);
