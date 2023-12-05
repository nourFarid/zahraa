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
  if (female == 'female'){
  const studentName = student.userName
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
}return res.status(404).json({message:"gender doesn't match"})
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
    if (male == 'male'){
    const studentName = student.userName
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
  }return res.status(404).json({message:"gender doesn't match"})
  }
  )

const cancel = errorHandling.asyncHandler(async(req,res,next)=>{
  const {studentId} = req.params
  const user = await userModel.findById(studentId)
  const student = await userModel.updateOne(
    { _id: studentId },
    { $set: { penalty: false } }
  );
  // student.expulsionStudent = true
  // const cancelExpulsion = student.expulsionStudent
  
  return res.json ({message:"success:panalty process is removed ",student})
})

module.exports = {pentalyFemale,pentalyMale,cancel}
