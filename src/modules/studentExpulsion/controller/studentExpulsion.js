const roomsModel = require('../../../../DB/model/rooms/RoomsModel.js')
const userModel = require('../../../../DB/model/User.model.js')
const errorHandling = require ('../../../utils/errorHandling.js')
const httpStatusText = require('../../../utils/httpStatusText.js')
const studentExpulsion = require('../../../../DB/model/studentExpulsion/studentExpulsionModel.js') // فصل الطلاب

const createExpulsionfemale = errorHandling.asyncHandler(async(req,res,next)=>{
  const{penaltyKind,reason,roomId,cancellation}= req.body
  const {studentId} = req.params
  const room =  await roomsModel.findById(roomId)
  const student = await userModel.findById(studentId)
  const female = student.gender
  //const userId = req.user._id
  if(!student){
    return next (new Error (`In-valid student Id `,{cause:400}))
  }
  if (female == 'انثي'){
  const nameOfStudent = student.studentName
  const expulsion = await studentExpulsion.create({
    nameOfStudent,penaltyKind,reason , cancellation
  //  ,createdBy:userId
   })
   if(!room.occupants.includes(studentId)){
    return next (new Error (`this student is not in the room`,{cause:400}))
   }
   const user = await userModel.updateOne(
    { _id: studentId },
    { $set: { expulsionStudent: true } }
  );
   const updatedRoom = await roomsModel.findByIdAndUpdate(roomId,{$pull:{occupants:studentId}} ,{new:true})
   student.expulsionStudent==true
  return res.status(201).json({status : httpStatusText.SUCCESS , data : {expulsion,updatedRoom}})
}   return next (new Error (`gender doesn't match`,{cause:400}))
}
)

const createExpulsionMale = errorHandling.asyncHandler(async(req,res,next)=>{
  const{penaltyKind,reason,roomId,cancellation}= req.body
  const {studentId} = req.params
  const room =  await roomsModel.findById(roomId)
  const student = await userModel.findById(studentId)
  const male = student.gender
  //const userId = req.user._id
  if(!student){
    return next (new Error (`In-valid student Id `,{cause:400}))
  }
 
  if (male == 'ذكر'){
  const nameOfStudent = student.studentName
  const expulsion = await studentExpulsion.create({
    nameOfStudent,penaltyKind,reason , cancellation
  //  ,createdBy:userId
   })
   if(!room.occupants.includes(studentId)){
    return next (new Error (`this student is not in the room`,{cause:400}))
  }
  const user = await userModel.updateOne(
    { _id: studentId },
    { $set: { expulsionStudent: true } }
  );
  const updatedRoom = await roomsModel.findByIdAndUpdate(roomId,{$pull:{occupants:studentId}} ,{new:true})
 
 return res.status(201).json({status : httpStatusText.SUCCESS , data : {expulsion,updatedRoom}})
}    return next (new Error (`gender doesn't match`,{cause:400}))

}
)

const cancel = errorHandling.asyncHandler(async(req,res,next)=>{
 const {studentId} = req.params
 const user = await userModel.findById(studentId)
 if(!user){
  return next (new Error (`In-valid student Id `,{cause:400}))
}
if(user.expulsionStudent == true){
  const student = await userModel.updateOne(
    { _id: studentId },
    { $set: { expulsionStudent: false } }
  )} else{
    return next (new Error (`no expulsion found to this student `,{cause:400}))
  }
 return res.status(200).json({status : httpStatusText.SUCCESS , message:`Expulsion has been removed`})
})


module.exports = {createExpulsionfemale,createExpulsionMale,cancel}