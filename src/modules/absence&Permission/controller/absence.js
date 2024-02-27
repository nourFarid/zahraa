const httpStatusText = require('../../../utils/httpStatusText.js');
const errorHandling = require('../../../utils/errorHandling.js');
const userModel = require('../../../../DB/model/User.model.js');
const feesModel = require('../../../../DB/model/fees/feesForStudents.js');
const absencesPermissionModel = require('../../../../DB/model/absencesAndPermissions/absencesAndPermissions.js');

const absencePermissions = errorHandling.asyncHandler(async (req, res, next) => {
  const { dateFrom, dateTo ,TakeMeal,notes, TypeOfAbsence } = req.body;
  const { studentId } = req.params;

  const student = await userModel.findById(studentId);
  if (!student) {
    return next(new Error(`In-valid student Id`, { cause: 400 }));
  }

  const {studentName} = student
  const [feePayment] = await feesModel.find({ id: studentId });
  const paymentDate = feePayment.paymentDate;
  const PaymentValueNumber = feePayment.PaymentValueNumber;

  const absence = await absencesPermissionModel.find({StudentId:studentId})
  if(absence.length === 0){
    const absencePermission = await absencesPermissionModel.create({
      StudentId: studentId,
      studentName: studentName,
      dateFrom,
      dateTo,
      TakeMeal,
      notes,
      paymentDate: paymentDate,
      PaymentValueNumber: PaymentValueNumber,
      TypeOfAbsence 
    });
    return res.status(201).json({ status: httpStatusText.SUCCESS,data : {absencePermission }})
  }
    else{
        const absencePermission = await absencesPermissionModel.findOneAndUpdate(
          { StudentId: studentId },
          {
            $set: {
              dateFrom,
              dateTo,
              TakeMeal,
              notes,
              TypeOfAbsence 
            }
          },
          { upsert: true, new: true }
        );
        return res.status(201).json({ status: httpStatusText.SUCCESS , data :{absencePermission}})
    
  
}});


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
  const { dateFrom, dateTo, TakeMeal, notes, TypeOfAbsence } = req.body;

  // Get all students
  const students = await userModel.find();

  // Check if there are students
  if (students.length === 0) {
    return next(new Error('No students found', { cause: 404 }));
  }

  const absencePermissionsArray = [];

  // Iterate through each student
  for (const student of students) {
    const { _id, studentName } = student;

    // Use the studentId in the findOneAndUpdate query
    const AllabsencePermission = await absencesPermissionModel.findOneAndUpdate(
      { StudentId: _id }, // <-- Corrected here
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


module.exports = { absencePermissions , getPermissions,allAbsencePermissions};
