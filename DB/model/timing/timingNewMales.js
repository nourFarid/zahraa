const mongoose = require("mongoose");
const timingNewMalesSchema = new mongoose.Schema({
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
  },
});

module.exports = mongoose.model("TimingNewMalesSchema", timingNewMalesSchema);
