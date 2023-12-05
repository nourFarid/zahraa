const mongoose = require("mongoose");

const timingNewFemalesSchema = new mongoose.Schema(
  {
    to: {
      type: String,
      required: [true, "date is required"],
    },
    from: {
      type: String,
      required: [true, "date is required"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model(
  "TimingNewFemalesSchema",
  timingNewFemalesSchema
);
