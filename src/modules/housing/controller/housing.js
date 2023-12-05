const roomsModel = require('../../../../DB/model/rooms/RoomsModel.js')
const errorHandling = require ('../../../utils/errorHandling.js')
const httpStatusText = require('../../../utils/httpStatusText.js')
const floorModel = require('../../../../DB/model/rooms/FloorModel.js')
const buildingModel = require('../../../../DB/model/rooms/BuildingsModel.js')
const userModel =  require('../../../../DB/model/User.model.js')

//تسكين الطالب
const updateStudent = errorHandling.asyncHandler(async(req,res,next)=>{
  const{studentId,buildingId, floorId,housingDate, evacuationDate, 
    evacuationType,evacuationReason , roomId}= req.body
  // const {roomId} = req.params
  const room =  await roomsModel.findById(roomId)
  const floor =  await floorModel.findById(floorId)
  const building =  await buildingModel.findById(buildingId)
  const student = await userModel.findById(studentId)

  //to check that room exist
  if(!room){
    return next (new Error (`In-valid room ID`,{cause:400}))
  }
  //to check that floor exist
  if(!floor){
    return next (new Error (`In-valid floor ID`,{cause:400}))
  }
  //to check that building exist
  if(!building){
    return next (new Error (`In-valid building ID`,{cause:400}))
  }

  // to check that building gender is same as student gender
  if (building.Gender == student.gender){
  const gender = student.gender
  const userName = student.userName
  //to check that student is not in room
  if(!room.occupants.includes(studentId) ){
    if((room.occupants.length< room.numOfBeds)){
    //  room.occupants.push(studentId);
      const updatedRoom = await roomsModel.findByIdAndUpdate(roomId,{$addToSet:{occupants:studentId}}, {studentId,buildingId, gender,userName,
        floorId,housingDate, evacuationDate, evacuationType,evacuationReason},{new:true})
  
      return res.status(201).json({status : httpStatusText.SUCCESS , data : {updatedRoom , gender , userName}})
    }  
      return next (new Error (`this room is full`,{cause:400}))
  }  
    return next (new Error (`person already in this room`,{cause:400}))
}
  return next (new Error (`gender doesn't match`,{cause:400}))
} )

const getStudentMale = errorHandling.asyncHandler( async(req,res,next)=>{
  const males = await userModel.find({gender:'male'}, {"__v":false})
  if(!males){
    return next (new Error (`no males found! please try again later`,{cause:404}))
  }
  return res.status(200).json({status : httpStatusText.SUCCESS , data : {males}})
})

const getStudentFemale = errorHandling.asyncHandler( async(req,res,next)=>{
  const females = await userModel.find({gender:'female'}, {"__v":false})
  if(!females){
    return next (new Error (`no females found! please try again later`,{cause:404}))
  }
  return res.status(200).json({status : httpStatusText.SUCCESS , data : {females}})
})
//تعديل بيانات الطالب الساكن
const updateHousedMale = errorHandling.asyncHandler(async(req,res,next)=>
    {
        const {userId} = req.params
        const {studentName,buildingId, floorId,housingDate, evacuationDate, 
          evacuationType,evacuationReason,roomId}=req.body
        const user = await userModel.findById(userId)
        const male = user.gender
          if (male == 'male'){
            const student = await userModel.findByIdAndUpdate({ _id:userId},{studentName,buildingId, floorId,housingDate, evacuationDate, 
            evacuationType,evacuationReason,roomId },{new:true})
            if(!student){
              return next (new Error (`no student found with that ID`,{cause:400}))
              //res.status(400).json({status: httpStatusText.ERROR , message : 'No floor found with that ID'})
            }
          return res.status(200).json({status : httpStatusText.SUCCESS , data : {student}})
        }
        return res.status(200).json({message:"gender doesn't match"})
      
    } 
    
)

const updateHousedFemale = errorHandling.asyncHandler(async(req,res,next)=>
    {
        const {userId} = req.params
        const {studentName,buildingId, floorId,housingDate, evacuationDate, 
          evacuationType,evacuationReason,roomId}=req.body
        const user = await userModel.findById(userId)
        const male = user.gender
          if (male == 'female'){
            const student = await userModel.findByIdAndUpdate({ _id:userId},{studentName,buildingId, floorId,housingDate, evacuationDate, 
            evacuationType,evacuationReason,roomId },{new:true})
            if(!student){
              return next (new Error (`no student found with that ID`,{cause:400}))
              //res.status(400).json({status: httpStatusText.ERROR , message : 'No floor found with that ID'})
            }
          return res.status(200).json({status : httpStatusText.SUCCESS , data : {student}})
        }
        return res.status(200).json({message:"gender doesn't match"})
      
    } 
    
)

module.exports = {updateStudent ,getStudentFemale , getStudentMale , updateHousedMale,updateHousedFemale}