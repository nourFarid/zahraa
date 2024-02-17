const roomsModel = require('../../../../DB/model/rooms/RoomsModel.js');
const userModel = require('../../../../DB/model/User.model.js');
const errorHandling = require('../../../utils/errorHandling.js');
const httpStatusText = require('../../../utils/httpStatusText.js');
const evacuation = require('../../../../DB/model/evacuation/evacuationModel.js');

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

  const studentName = student.studentName;

  const evacuated = await evacuation.create({
    studentName,
    evacuationReason,
    evacuationType,
    evacuationDate,
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

  await userModel.findByIdAndUpdate(studentId, { isHoused: false });

  return res.status(201).json({ status: httpStatusText.SUCCESS, data: { evacuated, updatedRoom } });
});

module.exports = {
  evacuateStudent,
};
