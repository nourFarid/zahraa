const roomsModel = require('../../../../DB/model/rooms/RoomsModel.js')
const errorHandling = require ('../../../utils/errorHandling.js')
const httpStatusText = require('../../../utils/httpStatusText.js')
const floorModel = require('../../../../DB/model/rooms/FloorModel.js')
const buildingModel = require('../../../../DB/model/rooms/BuildingsModel.js')
const userModel =  require('../../../../DB/model/User.model.js')

// const houseStudents = errorHandling.asyncHandler(async (req, res, next) => {
//   const { studentId, buildingId, floorId, roomId, housingDate, evacuationDate } = req.body;

//   const room = await roomsModel.findById(roomId);
//    const floor = await floorModel.findById(floorId);
//   const building = await buildingModel.findById(buildingId);
//   const student = await userModel.findById(studentId);

//   // to check that room exists
//   if (!room) {
//     return next(new Error(`In-valid room ID`, { cause: 400 }));
//   }
//   // to check that floor exists
//   if (!floor) {
//     return next(new Error(`In-valid floor ID`, { cause: 400 }));
//   }
//   // to check that building exists
//   if (!building) {
//     return next(new Error(`In-valid building ID`, { cause: 400 }));
//   }

//   if (student.expulsionStudent == true) {
//     return next(new Error(`This student is blocked from housing`, { cause: 400 }));
//   }
//   if (student.isHoused == true) {
//     return next(new Error(`This student is already housed`, { cause: 400 }));
//   }


//   const { statusOfOnlineRequests } = student;

//   if (statusOfOnlineRequests == 'accepted') {

//     if (building.Gender == student.gender) {
      
//       // to check that student is not in the room
//       if (!room.occupants.includes(studentId)) {
//         if (room.occupants.length < room.numOfBeds) {
//           // Check if housingDate is before evacuationDate
//           if (new Date(housingDate) < new Date(evacuationDate)) {
//             await roomsModel.findByIdAndUpdate(roomId, { $addToSet: { occupants: studentId } });

//             const updatedStudent = await userModel.findByIdAndUpdate(
//               studentId,
//               { isHoused: true, isEvacuated: false, buildingId, floorId, roomId, housingDate, evacuationDate },
//               { new: true ,select: 'studentName buildingId floorId roomId housingDate evacuationDate' }
//             );


//             return res.status(201).json({ status: httpStatusText.SUCCESS, data: { updatedStudent } });
//           } else {
//             return next(new Error(`Housing date must be before evacuation date`, { cause: 400 }));
//           }
//         }
//         return next(new Error(`This room is full`, { cause: 400 }));
//       }
//       return next(new Error(`Person already in this room`, { cause: 400 }));
//     }
//     return next(new Error(`Gender doesn't match`, { cause: 400 }));
//   }
//   return next(new Error(`Request for this student doesn't accept`, { cause: 400 }));
// });


const houseStudents = errorHandling.asyncHandler(async (req, res, next) => {
  const { studentId, buildingId, floorId, roomId, housingDate, evacuationDate } = req.body;
  
  const room = await roomsModel.findById(roomId);
  const floor = await floorModel.findById(floorId);
  const building = await buildingModel.findById(buildingId);
  const student = await userModel.findById(studentId);

  // to check that room exists
  if (!room) {
    return next(new Error(`In-valid room ID`, { cause: 400 }));
  }
  // to check that floor exists
  if (!floor) {
    return next(new Error(`In-valid floor ID`, { cause: 400 }));
  }
  // to check that building exists
  if (!building) {
    return next(new Error(`In-valid building ID`, { cause: 400 }));
  }

  if (student.expulsionStudent == true) {
    return next(new Error(`This student is blocked from housing`, { cause: 400 }));
  }
  if (student.isHoused == true) {
    return next(new Error(`This student is already housed`, { cause: 400 }));
  }
  if (student.transferred == true){
    return next (new Error (`this student transferred can't housing`,{cause:400}))
  }

  if ( student.statusOfOnlineRequests == 'accepted') {

    if (building.Gender == student.gender) {
      
      // to check that student is not in the room
      if (!room.occupants.includes(studentId)) {
        if (room.occupants.length < room.numOfBeds) {
          // Check if housingDate is before evacuationDate
          if (new Date(housingDate) < new Date(evacuationDate)) {
            await roomsModel.findByIdAndUpdate(roomId, { $addToSet: { occupants: studentId } });

            const updatedStudent = await userModel.findByIdAndUpdate(
              studentId,
              { 
                isHoused: true, 
                isEvacuated: false, 
                buildingName: building.Name,  
                floorName: floor.Name,        
                roomName : room.roomNumber,
                roomId,
                floorId,
                buildingId,
                housingDate, 
                evacuationDate ,
                
              },
              { new: true ,select: 'studentName floorName roomName buildingName housingDate evacuationDate' }
            );

            return res.status(201).json({ status: httpStatusText.SUCCESS, data: { updatedStudent } });
          } else {
            return next(new Error(`Housing date must be before evacuation date`, { cause: 400 }));
          }
        }
        return next(new Error(`This room is full`, { cause: 400 }));
      }
      return next(new Error(`Person already in this room`, { cause: 400 }));
    }
    return next(new Error(`Gender doesn't match`, { cause: 400 }));
  }
  return next(new Error(`Request for this request doesn't accept`, { cause: 400 }));
});


const getStudentMale = errorHandling.asyncHandler(async (req, res, next) => {
  const males = await userModel.find({ gender: 'ذكر' }).select('studentName');

  if (!males) {
    return next(new Error(`No males found! Please try again later`, { cause: 404 }));
  }

  return res.status(200).json({ status: httpStatusText.SUCCESS, data: { males } });
});


const getStudentFemale = errorHandling.asyncHandler( async(req,res,next)=>{
  const females = await userModel.find({gender:'انثي'}).select('studentName')
  if(!females){
    return next (new Error (`no females found! please try again later`,{cause:404}))
  }
  return res.status(200).json({status : httpStatusText.SUCCESS , data : {females}})
})

//تعديل بيانات الطالب الساكن
const updateHousedMale = errorHandling.asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const { buildingId, floorId, housingDate, evacuationDate, roomId } = req.body;

  const user = await userModel.findById(userId);

  if (!user) {
      return res.status(400).json({ status: httpStatusText.ERROR, message: 'No student found with that ID' });
  }

  const room = await roomsModel.findById(roomId);
  const floor = await floorModel.findById(floorId);
  const building = await buildingModel.findById(buildingId);

  const oldrRoom = user.roomId

  await roomsModel.findByIdAndUpdate(oldrRoom, { $pull: { occupants: userId } }, { new: true });

  if (user.gender === 'ذكر') {
      const updatedStudent = await userModel.findByIdAndUpdate(
          userId,
          {
            buildingName: building.Name,  
            floorName: floor.Name,        
            roomName : room.roomNumber,
            roomId,
            floorId,
            buildingId,
            housingDate, 
            evacuationDate ,
          },
          { new: true }
      );

      await roomsModel.findByIdAndUpdate(roomId, { $addToSet: { occupants: userId } });

      return res.status(200).json({ status: httpStatusText.SUCCESS, data: { student: updatedStudent } });
  }

  return res.status(400).json({ message: "Gender doesn't match" });
});

const updateHousedFemale = errorHandling.asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const { buildingId, floorId, housingDate, evacuationDate, roomId } = req.body;

  const user = await userModel.findById(userId);

  if (!user) {
      return res.status(400).json({ status: httpStatusText.ERROR, message: 'No student found with that ID' });
  }

  const room = await roomsModel.findById(roomId);
  const floor = await floorModel.findById(floorId);
  const building = await buildingModel.findById(buildingId);

  const oldrRoom = user.roomId

  await roomsModel.findByIdAndUpdate(oldrRoom, { $pull: { occupants: userId } }, { new: true });

  if (user.gender === 'انثي') {
      const updatedStudent = await userModel.findByIdAndUpdate(
          userId,
          {
            buildingName: building.Name,  
            floorName: floor.Name,        
            roomName : room.roomNumber,
            roomId,
            floorId,
            buildingId,
            housingDate, 
            evacuationDate ,
          },
          { new: true }
      );

      await roomsModel.findByIdAndUpdate(roomId, { $addToSet: { occupants: userId } });

      return res.status(200).json({ status: httpStatusText.SUCCESS, data: { student: updatedStudent } });
  }

  return res.status(400).json({ message: "Gender doesn't match" });
});

//امر تسكين
const housingOrderMale = errorHandling.asyncHandler(async (req, res, next) => {
  const { studentId } = req.params; 

  const { ofYear } = req.query;

  var query = {
      ofYear,
      role: "User",
      gender:"ذكر",
      isHoused: true,
      _id: studentId 
  };

  const user = await userModel.find(query).select('studentName roomName buildingName housingDate studentCode College HousingType')

  return res.status(200).json({ status: 'success', user });
});

const housingOrderFemale = errorHandling.asyncHandler(async (req, res, next) => {
  const { studentId } = req.params; 

  const { ofYear } = req.query;

  var query = {
      ofYear,
      role: "User",
      gender:{ $in: ["انثي", "أنثي", "انثى", "أنثى"] } ,
      isHoused: true,
      _id: studentId 
  };

  const user = await userModel.find(query).select('studentName roomName buildingName housingDate studentCode College HousingType')

  return res.status(200).json({ status: 'success', user });
});

module.exports = {houseStudents ,
  getStudentFemale , 
  getStudentMale , 
  updateHousedMale,
  updateHousedFemale,
  housingOrderMale,
  housingOrderFemale
}

