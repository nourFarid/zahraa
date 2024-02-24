const roomsModel = require('../../../../DB/model/rooms/RoomsModel.js')
const userModel = require('../../../../DB/model/User.model.js')
const errorHandling = require ('../../../utils/errorHandling.js')
const httpStatusText = require('../../../utils/httpStatusText.js')
const penatlyModel = require('../../../../DB/model/penaltiesModel.js') 

const pentalyFemale = errorHandling.asyncHandler(async(req,res,next)=>{
  const{penaltyKind,reason,cancellation,createdAt}= req.body
  const {studentId} = req.params
  const student = await userModel.findById(studentId)
  const female = student.gender
  //const userId = req.user._id
  if(!student){
    return next (new Error (`In-valid student Id `,{cause:400}))
  }
  if (female == 'انثي'){
  const studentName = student.studentName
  const penatly = await penatlyModel.create({
    studentName,penaltyKind,reason , cancellation,
  //  ,createdBy:userId
    createdAt
   })
   const user = await userModel.updateOne(
    { _id: studentId },
    { $set: {penalty: true } }
  );

  return res.status(201).json({status : httpStatusText.SUCCESS , data : {penatly}})
}   return next (new Error (`gender doesn't match`,{cause:400}))
}
)


const pentalyMale = errorHandling.asyncHandler(async(req,res,next)=>{
    const{penaltyKind,reason,cancellation,createdAt}= req.body
    const {studentId} = req.params
    const student = await userModel.findById(studentId)
    const male = student.gender
    //const userId = req.user._id
    if(!student){
      return next (new Error (`In-valid student Id `,{cause:400}))
    }
    if (male == 'ذكر'){
    const studentName = student.studentName
    const penatly = await penatlyModel.create({
      studentName,penaltyKind,reason , cancellation,
    //  ,createdBy:userId
      createdAt
     })
     const user = await userModel.updateOne(
      { _id: studentId },
      { $set: {penalty: true } }
    );
  
    return res.status(201).json({status : httpStatusText.SUCCESS , data : {penatly}})
  }   return next (new Error (`gender doesn't match`,{cause:400}))
}
  )

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
  // student.expulsionStudent = true
  // const cancelExpulsion = student.expulsionStudent
  
  return res.status(200).json({status : httpStatusText.SUCCESS , message:`penalty has been removed`})
 })

// const penaltyForMultipleStudents = errorHandling.asyncHandler(async (req, res, next) => {
//   const { penaltyKind, reason, cancellation, createdAt } = req.body;
//   const { studentIds } = req.body;

//   if (!studentIds || !Array.isArray(studentIds) || studentIds.length === 0) {
//     return next(new Error(`Invalid student IDs provided`, { cause: 400 }));
//   }

//   const penaltiesApplied = [];

//   for (const studentId of studentIds) {
//     const student = await userModel.findById(studentId);

//     if (!student) {
//       return next(new Error(`Invalid student ID: ${studentId}`, { cause: 400 }));
//     }

   
//     const studentName = student.studentName;

   
//       const penalty = await penatlyModel.create({
//         studentName,
//         penaltyKind,
//         reason,
//         cancellation,
//         createdAt,
//       });

//       await userModel.updateOne(
//         { _id: studentId },
//         { $set: { penalty: true } }
//       );

//       penaltiesApplied.push({
//         studentId,
//         penalty,
//       });
    
//   }

//   return res.status(201).json({ status: httpStatusText.SUCCESS, data: { penaltiesApplied } });
// });



const penaltyForMultipleStudents = errorHandling.asyncHandler(async (req, res, next) => {
  const { penaltyKind, reason, cancellation, createdAt } = req.body;
  const { studentIds, academicYear, college, typeOfPenalty, dateOfPenalty } = req.body;

  if (!studentIds || !Array.isArray(studentIds) || studentIds.length === 0) {
    return next(new Error(`Invalid student IDs provided`, { cause: 400 }));
  }

  const penaltiesApplied = [];

  for (const studentId of studentIds) {
    const student = await userModel.findById(studentId);

    if (!student) {
      return next(new Error(`Invalid student ID: ${studentId}`, { cause: 400 }));
    }

    const studentName = student.studentName;
    
    const penalty = await penatlyModel.create({
      studentName,
      penaltyKind,
      reason,
      cancellation,
      createdAt,
      academicYear, // Add academic year to penalty model
      college, // Add college to penalty model
      typeOfPenalty, // Add type of penalty to penalty model
      dateOfPenalty, // Add date of penalty to penalty model
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

 

module.exports = {pentalyFemale,pentalyMale,cancel,penaltyForMultipleStudents,}
