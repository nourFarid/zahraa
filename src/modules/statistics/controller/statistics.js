const errorHandling = require("../../../utils/errorHandling.js");
const httpStatusText = require("../../../utils/httpStatusText.js");
const User = require("../../../../DB/model/User.model.js");
const mealsModel = require("../../../../DB/model/meals/mealsModel.js");
const xlsx = require("xlsx");

const dotenv = require("dotenv");
const { compare } = require("../../../utils/HashAndCompare.js");

dotenv.config();
const collegesString = process.env.COLLEGES;
const colleges = collegesString.split(",");

//اعداد المتقدمين
const getNumberOfAppliers = errorHandling.asyncHandler(
  async (req, res, next) => {
    var {
      ofYear,
      College,
      pending,
      rejected,
      waitingForClassification,
      accepted,
      egyptions,
      expartriates,
      muslim,
      christian,
      normalHousing,
      specialHousing,
      oldStudent,
      newStudent,
      grade,
      gradePercentage,

      residentsOfTheYreviousYear,
    } = req.query;

    var onlineRequests = [];
    var years = [];

    if (pending === "true") {
      onlineRequests.push("pending");
    }
    if (rejected === "true") {
      onlineRequests.push("rejected");
    }

    if (accepted === "true") {
      onlineRequests.push("accepted");
    }
    var housingTypes = [];
    if (normalHousing === "true") {
      housingTypes.push("عادى");
    }

    if (specialHousing === "true") {
      housingTypes.push("سكن مميز فردى طلبة");
    }

    var religions = [];
    if (muslim === "true") {
      religions.push("مسلم");
    }
    if (christian === "true") {
      religions.push("مسيحى");
    }

    // Dynamically set residentsOfTheYreviousYear based on ofYear
    if (residentsOfTheYreviousYear) {
      var [startYear, endYear] = ofYear.split("-");
      residentsOfTheYreviousYear = `${parseInt(startYear) - 1}-${
        parseInt(endYear) - 1
      }`;
      console.log("====================================");
      console.log("residentsOfTheYreviousYear: " + residentsOfTheYreviousYear);
      console.log("====================================");
      years.push(residentsOfTheYreviousYear);
      console.log(query);
    }
    if (ofYear) {
      years.push(ofYear);
    }

    var query = {
      gender: "ذكر",
      role: "User",
    };
    if (College) {
      query.College = College;
    }
    if (egyptions) {
      query.egyptions = egyptions;
    }
    if (expartriates) {
      query.expartriates = expartriates;
    }
    if (oldStudent) {
      query.oldStudent = oldStudent;
    }
    if (newStudent) {
      query.newStudent = newStudent;
    }
    if (grade) {
      query.grade = { $exists: true };
    }
    if (gradePercentage) {
      query.gradePercentage = { $exists: true };
    }
    if (housingTypes.length > 0) {
      query.HousingType = { $in: housingTypes };
    }

    if (housingTypes.length > 0) {
      query.HousingType = { $in: housingTypes };
    }

    if (onlineRequests.length > 0) {
      query.statusOfOnlineRequests = { $in: onlineRequests };
    }
    if (religions.length > 0) {
      query.religion = { $in: religions };
    }
    if (years.length > 0) {
      query.ofYear = { $in: years };
    }

    if (waitingForClassification) {
      query.waitingForClassification = waitingForClassification;
    }

    // Loop over each key-value pair in the query object
    for (const key in query) {
      if (query.hasOwnProperty(key)) {
        // If the value is 0, remove the key-value pair from the object
        if (
          query[key] == "false" ||
          query[key] === "undefined" ||
          query[key] == false ||
          query[key] == undefined
        ) {
          delete query[key];
        }
      }
    }

    const students = await User.find(query);
    const count = students.length;

    // Object to store counts for each college
    const collegeCounts = {};
    students.forEach((student) => {
      // Count statuses for each college
      if (colleges.includes(student.College)) {
        if (!collegeCounts[student.College]) {
          collegeCounts[student.College] = {
            rejected: 0,
            pending: 0,
            waitingForClassification: 0,
            isClassified: 0, //فى انتظار السكن
            all: 0,
          };
        }

        switch (student.statusOfOnlineRequests) {
          case "rejected":
            collegeCounts[student.College].rejected++;
            break;
          case "pending":
            collegeCounts[student.College].pending++;
            break;
        }

        if (
          student.waitingForClassification &&
          !student.isClassified &&
          !student.isHoused
        ) {
          collegeCounts[student.College].waitingForClassification++;
        }
        if (student.isClassified) {
          collegeCounts[student.College].isClassified++;
        }

        collegeCounts[student.College].all =
          collegeCounts[student.College].rejected +
          collegeCounts[student.College].pending +
          collegeCounts[student.College].waitingForClassification +
          collegeCounts[student.College].isClassified;
      }
    });

    console.log("====================================");
    console.log(query);
    console.log(count);
    console.log("====================================");

    return res
      .status(200)
      .json({ status: httpStatusText.SUCCESS, data: { collegeCounts } });
  }
);

//اعداد المقيمين
const getNumberOfResidents = errorHandling.asyncHandler(
  async (req, res, next) => {
    // Extract query parameter
    var {
      ofYear,
      egyptions,
      expartriates,
      normalHousing,
      specialHousing,
      oldStudent,
      newStudent,
      isEvacuated,
      isHoused,
      transformed,
    } = req.query;
    const housingTypes = [];
    var query = {};
    query = {
      role: "User",
      gender: "ذكر",
    };

    if (normalHousing === "true") {
      housingTypes.push("عادى");
    }
    if (specialHousing === "true") {
      housingTypes.push("سكن مميز فردى طلبة");
    }

    if (housingTypes.length > 0) {
      query.HousingType = { $in: housingTypes };
    }
    if (egyptions) {
      query.egyptions = egyptions;
    }
    if (expartriates) {
      query.expartriates = expartriates;
    }
    if (ofYear) {
      query.ofYear = ofYear;
    }
    if (oldStudent) {
      query.oldStudent = oldStudent;
    }
    if (newStudent) {
      query.newStudent = newStudent;
    }
    if (isEvacuated) {
      query.isEvacuated = isEvacuated;
    }
    if (isHoused) {
      query.isHoused = isHoused;
    }
    if (transformed) {
      query.transformed = transformed;
    }
    // Loop over each key-value pair in the query object
    for (const key in query) {
      if (query.hasOwnProperty(key)) {
        // If the value is 0, remove the key-value pair from the object
        if (
          query[key] == "false" ||
          query[key] === "undefined" ||
          query[key] == false ||
          query[key] == undefined
        ) {
          delete query[key];
        }
      }
    }
    const students = await User.find(query);
    const count = students.length;

    // Object to store counts for each college
    const collegeCounts = {};
    students.forEach((student) => {
      // Count statuses for each college
      if (colleges.includes(student.College)) {
        if (!collegeCounts[student.College]) {
          collegeCounts[student.College] = {
            isHoused: 0,
          };
        }

        if (student.isHoused) {
          collegeCounts[student.College].isHoused++;
        }
      }
    });

    console.log("====================================");
    console.log(query);
    console.log(count);
    console.log("====================================");

    return res
      .status(200)
      .json({ status: httpStatusText.SUCCESS, data: { collegeCounts } });
  }
);

//احصائيات البطاقات المطبوعة للذكر
const getNumberOfPrintedCardsForMales = errorHandling.asyncHandler(
  async (req, res, next) => {
    // Extract query parameter
    var { ofYear, isEvacuated, isHoused, dateOfPrinting } = req.query;
    var query = {};
    query = {
      role: "User",
      gender: "ذكر",
    };

    if (ofYear) {
      query.ofYear = ofYear;
    }
    if (isEvacuated) {
      query.isEvacuated = isEvacuated;
    }
    if (isHoused) {
      query.isHoused = isHoused;
    }
    if (dateOfPrinting) {
      query.dateOfPrinting = dateOfPrinting;
    }
    // Loop over each key-value pair in the query object
    for (const key in query) {
      if (query.hasOwnProperty(key)) {
        // If the value is 0, remove the key-value pair from the object
        if (
          query[key] == "false" ||
          query[key] === "undefined" ||
          query[key] == false ||
          query[key] == undefined
        ) {
          delete query[key];
        }
      }
    }
    const users = await User.find(query);
    const count = users.length;
    const collegeCounts = {};
    users.forEach((student) => {
      // Count statuses for each college
      if (colleges.includes(student.College)) {
        if (!collegeCounts[student.College]) {
          collegeCounts[student.College] = {
            printedCard: 0,
          };
        }
        // Count housing status
        if (student.printedCard) {
          collegeCounts[student.College].printedCard++;
        }
      }
    });

    console.log("====================================");
    console.log(query);
    console.log(count);
    console.log("====================================");

    return res
      .status(200)
      .json({ status: httpStatusText.SUCCESS, data: collegeCounts });
  }
);

//احصائيات الطلاب المطبوعة انثي
const getNumberOfPrintedCardsForFemales = errorHandling.asyncHandler(
  async (req, res, next) => {
    // Extract query parameter
    var { ofYear, isEvacuated, isHoused, dateOfPrinting } = req.query;
    var query = {};
    query = {
      role: "User",
      gender: { $in: ["انثي", "أنثي", "انثى", "أنثى"] },
    };

    if (ofYear) {
      query.ofYear = ofYear;
    }
    if (isEvacuated) {
      query.isEvacuated = isEvacuated;
    }
    if (isHoused) {
      query.isHoused = isHoused;
    }
    if (dateOfPrinting) {
      query.dateOfPrinting = dateOfPrinting;
    }
    // Loop over each key-value pair in the query object
    for (const key in query) {
      if (query.hasOwnProperty(key)) {
        // If the value is 0, remove the key-value pair from the object
        if (
          query[key] == "false" ||
          query[key] === "undefined" ||
          query[key] == false ||
          query[key] == undefined
        ) {
          delete query[key];
        }
      }
    }

    const users = await User.find(query);
    const count = users.length;
    const collegeCounts = {};
    users.forEach((student) => {
      // Count statuses for each college
      if (colleges.includes(student.College)) {
        if (!collegeCounts[student.College]) {
          collegeCounts[student.College] = {
            printedCard: 0,
          };
        }
        // Count housing status
        if (student.printedCard) {
          collegeCounts[student.College].printedCard++;
        }
      }
    });

    console.log("====================================");
    console.log(query);
    console.log(count);
    console.log("====================================");

    return res
      .status(200)
      .json({ status: httpStatusText.SUCCESS, data: collegeCounts });
  }
);

//اعداد جميع الطلاب
const getNumberOfAllStudents = errorHandling.asyncHandler(
  async (req, res, next) => {
    const {
      ofYear,
      egyptions,
      expartriates,
      oldStudent,
      newStudent,
      normalHousing,
      specialHousing,
      withSpecialNeeds,
    } = req.query;
    var students;
    const housingTypes = [];
    if (normalHousing === "true") {
      housingTypes.push("عادى");
    }

    if (specialHousing === "true") {
      housingTypes.push("سكن مميز فردى طلبة");
    }

    var query = {
      ofYear,
      gender: "ذكر",
      role: "User",
    };

    if (housingTypes.length > 0) {
      query.HousingType = { $in: housingTypes };
    }
    if (egyptions) {
      query.egyptions = egyptions;
    }
    if (expartriates) {
      query.expartriates = expartriates;
    }
    if (oldStudent) {
      query.oldStudent = oldStudent;
    }
    if (newStudent) {
      query.newStudent = newStudent;
    }
    if (withSpecialNeeds) {
      query.withSpecialNeeds = withSpecialNeeds;
    }
    // Loop over each key-value pair in the query object
    for (const key in query) {
      if (query.hasOwnProperty(key)) {
        // If the value is 0, remove the key-value pair from the object
        if (
          query[key] == "false" ||
          query[key] === "undefined" ||
          query[key] == false ||
          query[key] == undefined
        ) {
          delete query[key];
        }
      }
    }

    students = await User.find(query);

    // Object to store counts for each college
    const collegeCounts = {};
    students.forEach((student) => {
      // Count statuses for each college
      if (colleges.includes(student.College)) {
        if (!collegeCounts[student.College]) {
          collegeCounts[student.College] = {
            rejected: 0,
            pending: 0,
            waitingForClassification: 0,
            isClassified: 0, //فى انتظار السكن
            isHoused: 0,
            isEvacuated: 0,
            all: 0,
          };
        }

        switch (student.statusOfOnlineRequests) {
          case "rejected":
            collegeCounts[student.College].rejected++;
            break;
          case "pending":
            collegeCounts[student.College].pending++;
            break;
        }

        // Count housing status
        if (
          student.statusOfOnlineRequests == "accepted" &&
          student.waitingForClassification &&
          !student.isClassified &&
          !student.isHoused
        ) {
          collegeCounts[student.College].waitingForClassification++;
        }
        if (student.isClassified && !student.isHoused) {
          collegeCounts[student.College].isClassified++;
        }
        if (
          student.statusOfOnlineRequests == "accepted" &&
          student.isHoused &&
          student.isClassified &&
          student.waitingForClassification
        ) {
          collegeCounts[student.College].isHoused++;
        }
        if (student.isEvacuated) {
          collegeCounts[student.College].isEvacuated++;
        }

        collegeCounts[student.College].all =
          collegeCounts[student.College].rejected +
          collegeCounts[student.College].pending +
          collegeCounts[student.College].waitingForClassification +
          collegeCounts[student.College].isClassified +
          collegeCounts[student.College].isHoused +
          collegeCounts[student.College].isEvacuated;
      }
    });

    // Return the counts along with the student data
    return res
      .status(200)
      .json({ status: httpStatusText.SUCCESS, data: collegeCounts });
  }
);

//تجهيز الوجبات
const MealPreparation = errorHandling.asyncHandler(async (req, res, next) => {
  const { ofYear, ofWhichMeal, dateOfBookingMeals } = req.query;

  var query = {
    ofYear,
  };

  if (dateOfBookingMeals) {
    query.dateOfBookingMeals = dateOfBookingMeals;
  }

  if (ofWhichMeal) {
    query.ofWhichMeal = ofWhichMeal;
  }

  const mealData = await mealsModel.find(query);

  const excelData = mealData.map((meal) => meal.data);

  // Convert the Excel data to JSON
  const jsonData = excelData.reduce((acc, excel) => {
    const workbook = xlsx.read(excel, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const mealJsonData = xlsx.utils.sheet_to_json(worksheet);
    return acc.concat(mealJsonData);
  }, []);

  // Log the first row of jsonData to inspect the structure
  console.log(
    "First row of jsonData:",
    jsonData.length > 0 ? jsonData[0] : null
  );

  // Count studentCode entries for each buildingName
  const StudentCounts = jsonData.reduce((counts, row) => {
    const buildingName = row.buildingName;
    const studentCode = row.studentCode;

    // If the buildingName entry doesn't exist, create it with a count of 1
    if (!counts[buildingName]) {
      counts[buildingName] = 1;
    } else {
      // If the buildingName entry exists, increment the count
      counts[buildingName]++;
    }

    return counts;
  }, {});

  return res.status(200).json({ status: "success", jsonData, StudentCounts });
});

//احصائيات استلام الوجبات

//اعداد الطلاب حسب نوع السكن
const NumberOfStudentsBasedOnHousingType = errorHandling.asyncHandler(
  async (req, res, next) => {
    const { ofYear, egyptions, expartriates, oldStudent, newStudent } =
      req.query;

    var query = {
      ofYear,
    };

    if (dateOfReceivingMeals) {
      query.dateOfReceivingMeals = dateOfReceivingMeals;
    }

    if (ofWhichMeal) {
      query.ofWhichMeal = ofWhichMeal;
    }

    const mealData = await mealsModel.find(query);

    const excelData = mealData.map((meal) => meal.data);

    // Convert the Excel data to JSON
    const jsonData = excelData.reduce((acc, excel) => {
      const workbook = xlsx.read(excel, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const mealJsonData = xlsx.utils.sheet_to_json(worksheet);
      return acc.concat(mealJsonData);
    }, []);
    console.log(jsonData);

    const numberOfReceivedMeals = jsonData.reduce((counts, row) => {
      const buildingName = row.buildingName;
      const studentCode = row.studentCode;

      // If the buildingName entry doesn't exist, create it with a count of 1
      if (!counts[buildingName]) {
        counts[buildingName] = 1;
      } else {
        // If the buildingName entry exists, increment the count
        counts[buildingName]++;
      }

      return counts;
    }, {});

    return res.status(200).json({ status: "success", numberOfReceivedMeals });
  }
);

//اعداد الطلاب حسب نوع السكن
// const NumberOfStudentsBasedOnHousingType = errorHandling.asyncHandler(
//   async (req, res, next) => {
//     const { ofYear, egyptions, expartriates, oldStudent, newStudent } =
//       req.query;

//     var query = {
//       ofYear,
//       role: "User",
//     };

//     if (egyptions) {
//       query.egyptions = egyptions;
//     }
//     if (expartriates) {
//       query.expartriates = expartriates;
//     }
//     if (oldStudent) {
//       query.oldStudent = oldStudent;
//     }
//     if (newStudent) {
//       query.newStudent = newStudent;
//     }
//     // Loop over each key-value pair in the query object
//     for (const key in query) {
//       if (query.hasOwnProperty(key)) {
//         // If the value is 0, remove the key-value pair from the object
//         if (
//           query[key] == "false" ||
//           query[key] === "undefined" ||
//           query[key] == false ||
//           query[key] == undefined
//         ) {
//           delete query[key];
//         }
//       }
//     }

//     const students = await User.find(query);

//     // Object to store counts for each HousingType
//     const countsByHousingType = {};

//     students.forEach((student) => {
//       // Count statuses for each HousingType
//       if (student.HousingType) {
//         if (!countsByHousingType[student.HousingType]) {
//           countsByHousingType[student.HousingType] = {
//             pending: 0,
//             rejected: 0,
//             isHoused: 0,
//             isEvacuated: 0,
//             waitingForClassification: 0,
//             waitingForHousing: 0,
//           };
//         }

//         switch (student.statusOfOnlineRequests) {
//           case "pending":
//             countsByHousingType[student.HousingType].pending++;
//             break;
//           case "rejected":
//             countsByHousingType[student.HousingType].rejected++;
//             break;
//         }

//         // Count housing status
//         if (student.isHoused) {
//           countsByHousingType[student.HousingType].isHoused++;
//         }
//         if (student.isEvacuated) {
//           countsByHousingType[student.HousingType].isEvacuated++;
//         }

//         // Count waitingForClassification
//         if (!student.waitingForClassification) {
//           countsByHousingType[student.HousingType].waitingForClassification++;
//         }

//         // Count cases where statusOfOnlineRequests is true but isHoused is false
//         if (student.statusOfOnlineRequests && !student.isHoused) {
//           countsByHousingType[student.HousingType].waitingForHousing++;
//         }
//       }
//     });

//     // Return the counts along with the student data
//     return res
//       .status(200)
//       .json({ status: httpStatusText.SUCCESS, data: countsByHousingType });
//   }
// );

module.exports = {
  getNumberOfResidents,
  getNumberOfAllStudents,
  getNumberOfAppliers,
  NumberOfStudentsBasedOnHousingType,
  getNumberOfPrintedCardsForMales,
  getNumberOfPrintedCardsForFemales,
  MealPreparation,
  MealTakingStatisticsMale,
  MealTakingStatisticsFemale,
  numberOfReceivedMeals,
};
