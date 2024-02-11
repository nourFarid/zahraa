const User = require("../../../../DB/model/User.model.js");
const errorHandling = require("../../../utils/errorHandling.js");
const httpStatusText = require("../../../utils/httpStatusText.js");

const getBasicDataMales = errorHandling.asyncHandler(async (req, res, next) => {
        
            const { ofYear
                ,College
                ,egyptions, expartriates, normalHousing, specialHousing,
              oldStudent,newStudent,appliers,
             acceptedApplications
            
            } = req.query;
            const housingTypes = [];
            var query = {};
          
            if (normalHousing === 'true') {
                housingTypes.push('عادى');
            }
          
            if (specialHousing === 'true') {
                housingTypes.push('سكن مميز فردى طلبة');
            }
            let statusOfOnlineRequests;

            if (appliers === 'true') {
                statusOfOnlineRequests = 'bending';
            } 
            if(acceptedApplications === 'true') {
                statusOfOnlineRequests = 'accepted';
            }
            
            var query = {
                ofYear,
              College,
              egyptions,
              expartriates, 
            
              oldStudent,
              newStudent,
              statusOfOnlineRequests,
              gender: "ذكر"

          };
     
          if (housingTypes.length > 0) {
            query.HousingType = { $in: housingTypes };
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
    
            console.log('Query:', query);
            const students = await User.find(query);
            if(!students){
              return next (new Error (`CAN't retrieve any students `,{cause:400}))
            }
            console.log('Result:', students);
            return res.status(200).json({ status: httpStatusText.SUCCESS, data: { students } });
          } 
       
    );
const getBasicDataFemales = errorHandling.asyncHandler(async (req, res, next) => {
        
            const { ofYear
                ,College
                ,egyptions, expartriates, normalHousing, specialHousing,
              oldStudent,newStudent,appliers,
             acceptedApplications
            
            } = req.query;
            const housingTypes = [];
            var query = {};
          
            if (normalHousing === 'true') {
                housingTypes.push('عادى');
            }
          
            if (specialHousing === 'true') {
                housingTypes.push('سكن مميز فردى طلبة');
            }
            let statusOfOnlineRequests;

            if (appliers === 'true') {
                statusOfOnlineRequests = 'bending';
            } 
            if(acceptedApplications === 'true') {
                statusOfOnlineRequests = 'accepted';
            }
            
            var query = {
                ofYear,
              College,
              egyptions,
              expartriates, 
            
              oldStudent,
              newStudent,
              gender: { $in: ["انثي", "أنثي", "انثى", "أنثى"] } 

          };
     
          if (housingTypes.length > 0) {
            query.HousingType = { $in: housingTypes };
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
    
            console.log('Query:', query);
            const students = await User.find(query);
            if(!students){
              return next (new Error (`CAN't retrieve any students `,{cause:400}))
            }
            console.log('Result:', students);
            return res.status(200).json({ status: httpStatusText.SUCCESS, data: { students } });
          } 
       
    );

  module.exports = { getBasicDataMales ,getBasicDataFemales};