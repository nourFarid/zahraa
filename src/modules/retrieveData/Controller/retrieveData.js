const User = require("../../../../DB/model/User.model.js");
const errorHandling = require("../../../utils/errorHandling.js");
const httpStatusText = require("../../../utils/httpStatusText.js");

const retrieveStudentData = errorHandling.asyncHandler(async (req, res, next) => {
          try {
            const {studentName} = req.body;
            const query = {
                studentName  
          };
            console.log('Query:', query);
            const students = await User.find(query);
            console.log('Result:', students);
            res.json(students);
          } catch (error) {
            console.error('Error retrieving students:', error);
            res.status(500).json({ error: 'Internal Server Error' });
          }

      }
       
    );

  module.exports = { retrieveStudentData };









