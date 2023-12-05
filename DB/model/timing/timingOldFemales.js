const mongoose = require("mongoose");

const timingOldFemalesSchema = new mongoose.Schema({
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
module.exports = mongoose.model(
  "timingOldFemalesSchema",
  timingOldFemalesSchema
);
