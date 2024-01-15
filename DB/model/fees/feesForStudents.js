const mongoose = require("mongoose");

const feesForStudents = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    studentName: { type: String },
    //بيدفع رسوم عشان عمل اية او لاية
    kind: {
      type: String,
    },
    //شهرى ولا اية
    paymenttype: {
      type: String,
    },
    ofMonth: {
      type: String,
    },
    ofYear: {
      type: Number,
    },
    //غالبا ال id بتاع الفاتورة اللي دفع بيها
    PaymentValueNumber: {
      type: Number,
    },
    paymentDate: {
      type: String,
    },
    //دفع قد اية
    paymentValue: {
      type: Number,
    },
    //يسدده الطالب
    payment: {
      type: String,
    },
    ePay: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("feesForStudents", feesForStudents);
