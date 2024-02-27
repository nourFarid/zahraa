const roomsModel = require('../../../../DB/model/rooms/RoomsModel.js')
const userModel = require('../../../../DB/model/User.model.js')
const errorHandling = require ('../../../utils/errorHandling.js')
const httpStatusText = require('../../../utils/httpStatusText.js')
const penatlyModel = require('../../../../DB/model/penaltiesModel.js') 

const penaltyFemale = errorHandling.asyncHandler(async (req, res, next) => {
  const { penaltyKind, reason, cancellationDate, PenaltyDate } = req.body;
  const { studentId } = req.params;
  const student = await userModel.findById(studentId);

  // Check if the student exists
  if (!student) {
      return next(new Error(`Invalid student Id`, { cause: 400 }));
  }

  // Check if the student is housed
  if (student.isHoused) {
      const female = student.gender;

      // Check if the gender is female
      if (female === 'انثي') {
          const studentName = student.studentName;

          // Check if PenaltyDate is before cancellationDate
          if (PenaltyDate < cancellationDate) {
              // Create penalty record
              const penalty = await penatlyModel.create({
                  studentName,
                  ofYear: student.ofYear,
                  penaltyKind,
                  reason,
                  cancellationDate,
                  PenaltyDate,
              });

              // Update student to mark as penalized
              await userModel.updateOne({ _id: studentId }, { $set: { penalty: true } });

              return res.status(201).json({ status: httpStatusText.SUCCESS, data: { penalty } });
          } else {
              return next(new Error(`PenaltyDate must be before cancellationDate`, { cause: 400 }));
          }
      } else {
          return next(new Error(`Gender doesn't match`, { cause: 400 }));
      }
  } else {
      return next(new Error(`Student is not housed`, { cause: 400 }));
  }
});


const penaltyMale = errorHandling.asyncHandler(async (req, res, next) => {
  const { penaltyKind, reason, cancellationDate, PenaltyDate } = req.body;
  const { studentId } = req.params;
  const student = await userModel.findById(studentId);

  // Check if the student exists
  if (!student) {
      return next(new Error(`Invalid student Id`, { cause: 400 }));
  }

  // Check if the student is housed
  if (student.isHoused) {
      // Check if the gender is male
      const male = student.gender;
      if (male === 'ذكر') {
          const studentName = student.studentName;

          // Check if PenaltyDate is before cancellationDate
          if (PenaltyDate < cancellationDate) {
              // Create penalty record
              const penalty = await penatlyModel.create({
                  studentName,
                  ofYear: student.ofYear,
                  penaltyKind,
                  reason,
                  cancellationDate,
                  PenaltyDate,
              });

              // Update student to mark as penalized
              await userModel.updateOne({ _id: studentId }, { $set: { penalty: true } });

              return res.status(201).json({ status: httpStatusText.SUCCESS, data: { penalty } });
          } else {
              return next(new Error(`PenaltyDate must be before cancellationDate`, { cause: 400 }));
          }
      } else {
          return next(new Error(`Gender doesn't match`, { cause: 400 }));
      }
  } else {
      return next(new Error(`Student is not housed`, { cause: 400 }));
  }
});



const cancel = errorHandling.asyncHandler(async(req,res,next)=>{
  const {studentId} = req.params
  const user = await userModel.findById(studentId)
  if(!user){
   return next (new Error (`In-valid student Id `,{cause:400}))
 }
 if(user.penalty == true){
  const student = await userModel.updateOne(
    { _id: studentId },
    { $set: { penalty: false } }
  )} else{
    return next (new Error (`no penalties found to this student `,{cause:400}))
  }

  return res.status(200).json({status : httpStatusText.SUCCESS , message:`penalty has been removed`})
 })
 
 

module.exports = {penaltyFemale,penaltyMale,cancel}
