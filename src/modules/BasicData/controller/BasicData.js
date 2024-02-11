const User = require("../../../../DB/model/User.model.js");
const errorHandling = require("../../../utils/errorHandling.js");
const httpStatusText = require("../../../utils/httpStatusText.js");

const getBasicData = errorHandling.asyncHandler(async (req, res, next) => {
          try {
            const { College ,HousingType} = req.body;
            const query = {
               College,
               HousingType,
          };
          const projection = {
            studentName: 1
          };
            console.log('Query:', query);
            const students = await User.find(query,projection);
            console.log('Result:', students);
            res.json(students);
          } catch (error) {
            console.error('Error retrieving students:', error);
            res.status(500).json({ error: 'Internal Server Error' });
          }

      }
       
    );

  module.exports = { getBasicData };














  // const query = {};
    // if (nationality) {
    //   query.nationality = nationality;
    // 


    // if (College) {
    //   query.college = College;
    // }
    // if (HousingType) {
    //   query.housingType = HousingType;
    // }
    // const students = await User.find({ $and: [query] });
    //      res.json(students);
    //   }
    /// const students = await User.find(query);
        

        //const students = await User.find(query);
       // res.json(students);






  