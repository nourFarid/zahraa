const OldStudents = require("../../../../DB/model/User.model.js");

const errorHandling = require("../../../utils/errorHandling.js");
const httpStatusText = require("../../../utils/httpStatusText.js");
const {
  getCoordinatesAndCalculateDistance,
} = require("../../../utils/getCoordinates.js");

const classifyOldMaleStudents = errorHandling.asyncHandler(
  async (req, res, next) => {
    const oldStudents = await OldStudents.find({
      $and: [
        {
          $or: [{ oldEgyption: true }, { oldExpartriates: true }],
        },
        { gender: "ذكر" },
      ],
    }).lean();

    // Calculate distances and ages for all students
    const studentsWithDistancesAndAges = await Promise.all(
      oldStudents.map(async (student) => {
        const distance = await getCoordinatesAndCalculateDistance(
          student.residence // replace with the actual property
        );

        // Calculate age from date of birth
        const birthDate = new Date(student.birthDate);
        console.log('====================================');
        console.log(student.birthDate);
        console.log(birthDate);
        console.log('====================================');
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();

        return { ...student, distance, age };
      })
    );

    // Sort first by distance, then by age, gradePercentage, and grade
    const sortedAllOld = studentsWithDistancesAndAges.sort((a, b) => {
      if (a.grade !== b.grade) {
        return b.grade - a.grade; // Sort by grade (highest to lowest)
      } else if (a.gradePercentage !== b.gradePercentage) {
        return b.gradePercentage - a.gradePercentage; // Sort by gradePercentage (highest to lowest)
      } else if (a.age !== b.age) {
        return b.age - a.age; // Sort by age (youngest to oldest)
      } else {
        return b.distance - a.distance; // Sort by distance (biggest to smallest)
      }
    });

    return res
      .status(201)
      .json({ status: httpStatusText.SUCCESS, data: { sortedAllOld } });
  }
);

const classifyOldFemaleStudents = errorHandling.asyncHandler(
  async (req, res, next) => {
    const oldStudents = await OldStudents.find({
      $and: [
        {
          $or: [{ oldEgyption: true }, { oldExpartriates: true }],
        },
        { gender: { $in: ["انثي", "أنثي", "انثى", "أنثى"] } },
      ],
    }).lean();

    // Calculate distances and ages for all students
    const studentsWithDistancesAndAges = await Promise.all(
      oldStudents.map(async (student) => {
        const distance = await getCoordinatesAndCalculateDistance(
          student.residence // replace with the actual property
        );

        // Calculate age from date of birth
        const birthDate = new Date(student.birthDate);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();

        return { ...student, distance, age };
      })
    );

    // Sort first by distance, then by age, gradePercentage, and grade
    const sortedAllOld = studentsWithDistancesAndAges.sort((a, b) => {
      if (a.grade !== b.grade) {
        return b.grade - a.grade; // Sort by grade (highest to lowest)
      } else if (a.gradePercentage !== b.gradePercentage) {
        return b.gradePercentage - a.gradePercentage; // Sort by gradePercentage (highest to lowest)
      } else if (a.age !== b.age) {
        return b.age - a.age; // Sort by age (youngest to oldest)
      } else {
        return b.distance - a.distance; // Sort by distance (biggest to smallest)
      }
    });

    return res
      .status(201)
      .json({ status: httpStatusText.SUCCESS, data: { sortedAllOld } });
  }
);

module.exports = { classifyOldMaleStudents, classifyOldFemaleStudents };
