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
                  studentId: studentId,
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
                  studentId: studentId,
                  studentName,
                  ofYear: student.ofYear,
                  penaltyKind,
                  reason,
                  cancellationDate,
                  PenaltyDate,
              });

              // Update student to mark as penalized
              await userModel.updateOne({ _id: studentId }, { $set: { penalty: true } });
              console.log('====================================');
              console.log(penalty);
              console.log('====================================');

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

const getPenalty = errorHandling.asyncHandler(async (req, res, next) => {
  const { studentId } = req.params;

  const student = await penatlyModel.find({studentId}).select('penaltyKind reason PenaltyDate')

  if (!student) {
    return next(new Error(`No student found with that ID`, { cause: 400 }));
  }
    // If the student is not housed, return the success message
    return res.status(200).json({ status: httpStatusText.SUCCESS, data: student });
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


const penaltyForMultipleStudents = errorHandling.asyncHandler(async (req, res, next) => {
  const {ofYear,  reason, cancellationDate } = req.body;
  const { studentIds, penaltyKind, PenaltyDate } = req.body;

  if (!studentIds || !Array.isArray(studentIds) || studentIds.length === 0) {
    return next(new Error(`Invalid student IDs provided`, { cause: 400 }));
  }

  const penaltiesApplied = [];

  for (const studentId of studentIds) {
    const student = await userModel.findById(studentId);

    if (!student) {
      return next(new Error(`Invalid student ID: ${studentId}`, { cause: 400 }));
    }

    // const studentName = student.studentName;
    
    const penalty = await penatlyModel.create({
      studentId :studentId,
      studentName: student.studentName,
      penaltyKind,
      reason,
      ofYear,
      cancellationDate, 
      penaltyKind,
      PenaltyDate, 
    });

    await userModel.updateOne(
      { _id: studentId },
      { $set: { penalty: true } }
    );

    penaltiesApplied.push({
      studentId,
      penalty,
    });
  }

  return res.status(201).json({ status: httpStatusText.SUCCESS, data: { penaltiesApplied } });
});

 


module.exports = {penaltyFemale,penaltyMale,cancel,penaltyForMultipleStudents, getPenalty}
