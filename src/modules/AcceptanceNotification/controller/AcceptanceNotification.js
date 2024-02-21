const httpStatusText = require('../../../utils/httpStatusText.js');
const errorHandling = require('../../../utils/errorHandling.js');
const userModel = require('../../../../DB/model/User.model.js');


const AcceptanceNotification = errorHandling.asyncHandler(async (req, res, next) => {
  const { ofYear, nationalIds } = req.body;

  if (!nationalIds) {
    // Retrieve all housed students based on ofYear if no national IDs are provided
    const housedStudents = await userModel.find({ ofYear, isHoused: true, statusOfOnlineRequests: 'accepted' });

    if (housedStudents.length === 0) {
      return res.status(200).json({
        status: httpStatusText.SUCCESS,
        data: {
          message: `No housed students found for the academic year ${ofYear}.`,
        },
      });
    }

    const responseArray = housedStudents.map((student) => {
      const { studentName, College, studentCode } = student;

      return {
        status: httpStatusText.SUCCESS,
        data: {
          studentName,
          College,
          studentCode,
        },
      };
    });

    return res.status(200).json({ responseArray });
  }

  // Convert nationalIds to an array
  const nationalIdsArray = nationalIds.split(',');

  // Get housed students with the specified national IDs and ofYear
  const housedStudents = await userModel.find({
    nationalID: { $in: nationalIdsArray },
    ofYear,
    isHoused: true,
    statusOfOnlineRequests: 'accepted',
  });

  // Check if there are students
  if (housedStudents.length === 0) {
    return next(new Error('No valid housed students found', { cause: 404 }));
  }

  const responseArray = housedStudents.map((student) => {
    const { studentName, College, studentCode } = student;

    return {
      status: httpStatusText.SUCCESS,
      data: {
        studentName,
        College,
        studentCode,
      },
    };
  });

  return res.status(200).json({ responseArray });
});


const PrintAcceptanceNotification = errorHandling.asyncHandler(async (req, res, next) => {
  const { ofYear, year, gradeOfLastYear, HousingType, nationalIds } = req.body;

  // Build the filter criteria based on the provided data
  const filterCriteria = {
    ofYear,
    statusOfOnlineRequests: 'accepted',
  };

  if (nationalIds) {
    filterCriteria.nationalID = { $in: nationalIds.split(',') };
  }

  if (year) {
    filterCriteria.year = year;
  }

  if (gradeOfLastYear) {
    filterCriteria.gradeOfLastYear = gradeOfLastYear;
  }

  if (HousingType) {
    filterCriteria.HousingType = HousingType;
  }

  // Retrieve students based on the filter criteria
  const students = await userModel.find(filterCriteria);

  if (students.length === 0) {
    return res.status(200).json({
      status: httpStatusText.SUCCESS,
      data: {
        message: `No students found for the specified criteria.`,
      },
    });
  }

  const responseArray = students.map((student) => {
    const { studentName, College, studentCode, HousingType, gradeOfLastYear } = student;

    return {
      status: httpStatusText.SUCCESS,
      data: {
        studentName,
        College,
        studentCode,
        HousingType,
        gradeOfLastYear,
      },
    };
  });

  return res.status(200).json({ responseArray });
});

module.exports = { AcceptanceNotification , PrintAcceptanceNotification};
