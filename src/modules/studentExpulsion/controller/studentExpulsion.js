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
  //const userId = req.user._id
  if(!student){
    return next (new Error (`In-valid student Id `,{cause:400}))
  }
  if (student.gender == 'انثي'){
  const expulsion = await studentExpulsion.create({
    nameOfStudent: student.studentName,
    penaltyKind,reason , cancellation
  //  ,createdBy:userId
   })
   if(!room.occupants.includes(studentId)){
    return next (new Error (`this student is not in the room`,{cause:400}))
   }
   const user = await userModel.updateOne(
    { _id: studentId },
    { $set: { expulsionStudent: true } }
  );
    await roomsModel.findByIdAndUpdate(roomId,{$pull:{occupants:studentId}} ,{new:true})

   await userModel.findByIdAndUpdate(studentId, { isHoused: false , roomId: null, floorId: null, buildingId: null,
    roomName:null,
    floorName:null,
    buildingName:null});

   return res.status(201).json({status : httpStatusText.SUCCESS , data : {expulsion}})
}   return next (new Error (`gender doesn't match`,{cause:400}))
}
)

const createExpulsionMale = errorHandling.asyncHandler(async(req,res,next)=>{
  const{penaltyKind,reason,roomId,cancellation}= req.body
  const {studentId} = req.params
  const room =  await roomsModel.findById(roomId)
  const student = await userModel.findById(studentId)
  //const userId = req.user._id
  if(!student){
    return next (new Error (`In-valid student Id `,{cause:400}))
  }
 
  if (student.gender == 'ذكر'){
  const expulsion = await studentExpulsion.create({
    nameOfStudent: student.studentName,
    penaltyKind,reason , cancellation
  //  ,createdBy:userId
   })
   if(!room.occupants.includes(studentId)){
    return next (new Error (`this student is not in the room`,{cause:400}))
  }
  const user = await userModel.updateOne(
    { _id: studentId },
    { $set: { expulsionStudent: true } }
  );
  await roomsModel.findByIdAndUpdate(roomId,{$pull:{occupants:studentId}} ,{new:true})

  await userModel.findByIdAndUpdate(studentId, { isHoused: false, roomId: null, floorId: null, buildingId: null,  roomName:null,
    floorName:null,
    buildingName:null });

 return res.status(201).json({status : httpStatusText.SUCCESS , data : {expulsion}})
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
  await userModel.updateOne(
    { _id: studentId },
    { $set: { expulsionStudent: false } }
  )
} else{
    return next (new Error (`no expulsion found to this student `,{cause:400}))
  }
 return res.status(200).json({status : httpStatusText.SUCCESS , message:`Expulsion has been removed`})
})

const getAllStudentsNotPaid = errorHandling.asyncHandler(async (req, res, next) => {
  const { ofYear } = req.body;

  // Build the filter criteria
  const filterCriteria = {
    ofYear: ofYear,
    isHoused: true,
    isEvacuated:false,
    isHousingFeePaied:false
  };

    const students = await userModel.find(filterCriteria).select('studentName');

    return res.status(200).json({ status: httpStatusText.SUCCESS, data: { students } });

});

//فصل
const expulsionAllStudents = errorHandling.asyncHandler(async (req, res, next) => {
  const { studentIds, reason } = req.body;
  const studentIdsArray = studentIds.split(',');

  const students = await userModel.find({ _id: { $in: studentIdsArray } });

  const expulsionRecord = await Promise.all(
    students.map(async (student) => {
      console.log('Processing Student:', student);

      if (!student.isHousingFeePaid && student.isHoused) {
        const expulsioned = await studentExpulsion.create({
          nameOfStudent: student.studentName,
          reason,
        });

        await userModel.updateOne({ _id: student._id }, { $set: { isEvacuated: true, expulsionStudent: true } });

        return expulsioned;
      }
    })
  );

  // Remove students from the room's occupants
  await roomsModel.updateMany(
    { occupants: { $in: studentIdsArray } },
    { $pullAll: { occupants: studentIdsArray } },
    { new: true }
  );

  // Clear housed information for evacuated students
  await userModel.updateMany(
    { _id: { $in: studentIdsArray } },
    { $set: { isHoused: false, roomId: null, floorId: null, buildingId: null,  roomName:null,
      floorName:null,
      buildingName:null } }
  );

  return res.status(201).json({ status: httpStatusText.SUCCESS, data: { expulsionRecord } });
});




module.exports = {
  createExpulsionfemale,
  createExpulsionMale,
  cancel,
  getAllStudentsNotPaid,
  expulsionAllStudents
}