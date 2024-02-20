const errorHandling = require ('../../../utils/errorHandling.js')
const httpStatusText = require('../../../utils/httpStatusText.js')
const User = require('../../../../DB/model/User.model')

const socialResearchcases= errorHandling.asyncHandler(async(req, res, next) => {
    // Extract query parameter
    var {
         oldStudent,
         newStudent,
         distance,
         divorce,
         death,
         social,
         sick,
         id,
       
        } = req.query;
  
    var query = {};
    const cases = [];
  if (distance === 'true') {
        cases.push('بعد المسافة');
    }
  if (divorce === 'true') {
        cases.push("انفصال");
    }
  if (death === 'true') {
        cases.push("وفاة");
    }
  if (social === 'true') {
        cases.push("اجتماعي");
    }
  if (sick === 'true') {
        cases.push("مرضي");
    }

  const user= await User.findById(id)


  
  

  
    // if (housingTypes.length > 0) {
    //     query.HousingType = { $in: housingTypes };
    // }
  
    // Loop over each key-value pair in the query object
    // for (const key in query) {
    //     if (query.hasOwnProperty(key)) {
    //         // If the value is undefined, set it to false
    //         if (query[key] === undefined) {
    //             query[key] = false;
    //         }
    //     }
    // }
    const count = user.length;
  
    // console.log('====================================');
    // console.log(query);
    // console.log(count);
    // console.log('====================================');
  
    return res.status(200).json({ status: httpStatusText.SUCCESS, data: { user,count } });
  
  });

  module.exports={
    socialResearchcases

  }