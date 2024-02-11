const User = require("../../../../DB/model/User.model.js");
const errorHandling = require("../../../utils/errorHandling.js");
const httpStatusText = require("../../../utils/httpStatusText.js");


const retrieveSomeStudentData = errorHandling.asyncHandler(async (req, res, next) => {
    try {
      const { studentName } = req.body;
  
      const query = {
        studentName,
      };
  
      const projection = {
        studentName:1,
        gender:1,
        birthDate:1,
        religion:1,
        email:1,
        College :1,
        year:1,
        grade:1,
        detailedAddress:1,
        Accepting:1,
        guardianName:1,
        guardianNationalId:1,
        guardianPhone:1,
      };
  
      console.log('Query:', query);
      const students = await User.find(query, projection);
      console.log('Result:', students);
  
      res.json(students);
    } catch (error) {
      console.error('Error retrieving students:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  const retrieveHousingData = errorHandling.asyncHandler(async (req, res, next) => {
    try {
      const { studentName } = req.body;
  
      const query = {
        studentName,
      };
  
      const projection = {
        buildingId:1,
        housingDate:1,
        evacuationDate:1,
      };
  
      console.log('Query:', query);
      const students = await User.find(query, projection);
      console.log('Result:', students);
  
      res.json(students);
    } catch (error) {
      console.error('Error retrieving students:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  module.exports = { retrieveHousingData,retrieveSomeStudentData };
  







































