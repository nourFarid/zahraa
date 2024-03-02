const httpStatusText = require('../../../utils/httpStatusText.js');
const errorHandling = require('../../../utils/errorHandling.js');
const userModel = require('../../../../DB/model/User.model.js');
const feesModel = require('../../../../DB/model/fees/feesForStudents.js');
const absencesPermissionModel = require('../../../../DB/model/absencesAndPermissions/absencesAndPermissions.js');
// const { ObjectId } = require('mongoose').Types;


const absencePermissions = errorHandling.asyncHandler(async (req, res, next) => {
  const {dateFrom, dateTo, TakeMeal, notes, TypeOfAbsence } = req.body;
  const { studentId } = req.params;

  const student = await userModel.findById(studentId);

  if (!student) {
    return res.status(400).json({ status: httpStatusText.ERROR, message: "In-valid student Id" });
  }

  // Check if the student is housed
  if (!student.isHoused) {
    return res.status(400).json({ status: httpStatusText.ERROR, message: "This student is not currently housed. Cannot grant absence permission" });
  }

  // Check if dateFrom is before dateTo
  if (new Date(dateFrom) >= new Date(dateTo)) {
    return res.status(400).json({ status: httpStatusText.ERROR, message: "The start date must be before the end date" });
  }

  // Check if there is a feePayment for the student
  const feePayment = await feesModel.findOne({ id: studentId });
  if (!feePayment || !feePayment.paymentDate || !feePayment.PaymentValueNumber) {
    return res.status(400).json({ status: httpStatusText.ERROR, message: "This student didn't pay his fees" });
  }

  const absence = await absencesPermissionModel.find({ StudentId: studentId });

  if (absence.length === 0) {
    const absencePermission = await absencesPermissionModel.create({
      StudentId: studentId,
      studentName: student.studentName,
      ofYear: student.ofYear,
      dateFrom,
      dateTo,
      TakeMeal,
      notes,
      paymentDate: feePayment.paymentDate,
      PaymentValueNumber: feePayment.PaymentValueNumber,
      TypeOfAbsence,
    });
    return res.status(201).json({ status: httpStatusText.SUCCESS, data: { absencePermission } });
  } else {
    const absencePermission = await absencesPermissionModel.findOneAndUpdate(
      { StudentId: studentId },
      {
        $set: {
          dateFrom,
          dateTo,
          TakeMeal,
          notes,
          TypeOfAbsence,
        },
      },
      { upsert: true, new: true }
    );
    return res.status(201).json({ status: httpStatusText.SUCCESS, data: { absencePermission } });
  }
});


const getPermissions = errorHandling.asyncHandler( async(req,res,next)=>{
  
  const permission = await absencesPermissionModel.find({}, {"__v":false , "isCancelled":false ,
  "TakeMeal":false , "notes":false , "_id":false , "StudentId":false , "paymentDate":false , "PaymentValueNumber":false})

  if(!permission){
    return next (new Error (`لا يوجد اجازات`,{cause:404}))

  }
  return res.status(200).json({status : httpStatusText.SUCCESS , data : {permission}})
})


//تصريح جماعي
const allAbsencePermissions = errorHandling.asyncHandler(async (req, res, next) => {
  const { dateFrom, dateTo, TakeMeal, notes, TypeOfAbsence, studentIds } = req.body;

  // Convert studentIds to an array
  const studentIdsArray = studentIds.split(',');

  const housedStudents = await userModel.find({ _id: { $in: studentIdsArray }, isHoused: true });

  // Check if there are housed students
  if (housedStudents.length === 0) {
    return res.status(404).json({ status: httpStatusText.FAIL, message: "No valid housed students found" });
  }

  const absencePermissionsArray = [];

  // Iterate through each housed student
  for (const student of housedStudents) {
    const { _id, studentName } = student;

    // Check if dateFrom is before dateTo
    if (new Date(dateFrom) >= new Date(dateTo)) {
      return res.status(400).json({ status: httpStatusText.ERROR, message: "The start date must be before the end date" });
    }

    // Use the studentId in the findOneAndUpdate query
    const AllabsencePermission = await absencesPermissionModel.findOneAndUpdate(
      { StudentId: _id },
      {
        $set: {
          dateFrom,
          dateTo,
          TakeMeal,
          notes,
          TypeOfAbsence,
          studentName,
        },
      },
      { upsert: true, new: true }
    );

    absencePermissionsArray.push(AllabsencePermission);
  }

  return res.status(201).json({ status: httpStatusText.SUCCESS, data: { AllabsencePermission: absencePermissionsArray } });
});



module.exports = { absencePermissions , 
  getPermissions,
  allAbsencePermissions,
};
