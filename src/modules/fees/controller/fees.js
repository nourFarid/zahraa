const errorHandling = require("../../../utils/errorHandling.js");
const httpStatusText = require("../../../utils/httpStatusText.js");
const User = require("../../../../DB/model/User.model.js");
const Fees = require("../../../../DB/model/fees.js");
const addFees = errorHandling.asyncHandler(async (req, res, next) => {
  const { id, ...fee } = req.body;

  const user = await User.findById(id);
  if (!user) {
    return next(new Error(`User not found`, { cause: 400 }));
  }
  const { studentName } = user;

  const fees = new Fees({
    ...fee,
    id,
    studentName: studentName,
  });

  await fees.save();
  return res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { fees } });
});

module.exports = {
  addFees,
};
