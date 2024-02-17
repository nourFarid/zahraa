const httpStatusText = require('../../../utils/httpStatusText.js');
const errorHandling = require('../../../utils/errorHandling.js');
const userModel = require('../../../../DB/model/User.model.js');
const feesModel = require('../../../../DB/model/fees/feesForStudents.js');
const absencesPermissionModel = require('../../../../DB/model/absencesAndPermissions/absencesAndPermissions.js');


const AcceptanceNotification = errorHandling.asyncHandler(async (req, res, next) => {
  const { studentId } = req.params;
  const student = await userModel.findById(studentId);

  if (!student) {
    return next(new Error(`User not found`, { cause: 400 }));
  }

  const { statusOfOnlineRequests } = student;

  if (statusOfOnlineRequests === "accepted") {
    const { studentName, College, studentCode } = student;

    return res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: {
        studentName,
        College,
        studentCode,
      },
    });
  }
  if (statusOfOnlineRequests === "pending"){
    return res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: {
        message: 'Online request is Still pending for this student.',
   } })
  }
  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: {
      message: 'Online request is not accepted for this student.',
    },
  });

});


module.exports = { AcceptanceNotification};
