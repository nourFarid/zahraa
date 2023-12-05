const mongoose = require("mongoose");
const timingNewMalesSchema = new mongoose.Schema({
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
