const roomsModel = require('../../../../DB/model/rooms/RoomsModel.js');
const userModel = require('../../../../DB/model/User.model.js');
const errorHandling = require('../../../utils/errorHandling.js');
const httpStatusText = require('../../../utils/httpStatusText.js');
const evacuation = require('../../../../DB/model/evacuation/evacuationModel.js');


const dotenv = require('dotenv');

dotenv.config();
const collegesString = process.env.COLLEGES;
const colleges = collegesString.split(',');


const evacuateStudent = errorHandling.asyncHandler(async (req, res, next) => {
  const { evacuationReason, evacuationType, evacuationDate, roomId } = req.body;
  const { studentId } = req.params;

  const room = await roomsModel.findById(roomId);

  if (!room.occupants.includes(studentId)) {
    return next(new Error(`This student is not in the room`, { cause: 400 }));
  }

  const student = await userModel.findById(studentId);

  if (!student) {
    return next(new Error(`Invalid student Id`, { cause: 400 }));
  }

  const userModelEvacuationDate = student.evacuationDate instanceof Date
    ? student.evacuationDate.toISOString().split('T')[0]
    : null;

  if (evacuationDate !== userModelEvacuationDate) {
    return next(new Error(`Evacuation date does not match`, { cause: 400 }));
  }

  const evacuated = await evacuation.create({
    studentName: student.studentName,
    College: student.College,
    evacuationReason,
    evacuationType,
    evacuationDate
  });

  const user = await userModel.updateOne(
    { _id: studentId },
    { $set: { isEvacuated: true } }
  );

  const updatedRoom = await roomsModel.findByIdAndUpdate(
    roomId,
    { $pull: { occupants: studentId } },
    { new: true }
  );

  await userModel.findByIdAndUpdate(studentId, {
    isHoused: false,
    roomId: null,
    floorId: null,
    buildingId: null,
    roomName:null,
    floorName:null,
    buildingName:null
  });

  return res.status(201).json({ status: httpStatusText.SUCCESS, data: { evacuated } });
});

// get all housedStudents
const getAllHousedStudents = errorHandling.asyncHandler(async (req, res, next) => {
  const { ofYear, College, evacuationDate } = req.query;

  var query = {
    ofYear,
    role: 'User',
    isHoused: true,
    isEvacuated: false
  };

  if (College) {
    query.College = College;
  }
  if (evacuationDate) {
    query.evacuationDate = evacuationDate;
  }

  // Loop over each key-value pair in the query object
  for (const key in query) {
    if (query.hasOwnProperty(key)) {
      // If the value is undefined, set it to false
      if (query[key] === undefined) {
        query[key] = false;
      }
    }
  }

  const users = await userModel.find(query);

  console.log('====================================');
  console.log(query);
  console.log('====================================');

  return res.status(200).json({ status: httpStatusText.SUCCESS, data: { users } });
});


//إخلاء جماعي
const evacuateAllStudents = errorHandling.asyncHandler(async (req, res, next) => {

  const { studentIds } = req.body;

  const studentIdsArray = studentIds.split(',');


    const students = await userModel.find({ _id: { $in: studentIdsArray } });

    if (students.length !== studentIdsArray.length) {
      return next(new Error(`One or more invalid student Ids`, { cause: 400 }));
    }

    // Create evacuation records for each student
    const evacuationRecords = await Promise.all(
      students.map(async (student) => {
        const evacuated = await evacuation.create({
          studentName: student.studentName,
          College: student.College,
          evacuationDate: student.evacuationDate,
        });

        // Update the student to mark as evacuated
        await userModel.updateOne({ _id: student._id }, { $set: { isEvacuated: true } });

        return evacuated;
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
      { $set: { isHoused: false, roomId: null, floorId: null, buildingId: null,
        roomName:null,
      floorName:null,
      buildingName:null } }
    );

    return res.status(201).json({ status: httpStatusText.SUCCESS, data: { evacuationRecords } });
});


module.exports = {
  evacuateStudent,
  getAllHousedStudents,
  evacuateAllStudents
};
