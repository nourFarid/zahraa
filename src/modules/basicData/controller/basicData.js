const User = require("../../../../DB/model/User.model.js");
const errorHandling = require("../../../utils/errorHandling.js");
const httpStatusText = require("../../../utils/httpStatusText.js");
//gender: { $in: ["انثي", "أنثي", "انثى", "أنثى"]
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
                statusOfOnlineRequests = 'pending';
            } 
             if(acceptedApplications === 'true') {
                statusOfOnlineRequests = 'accepted';
            }
            // else{
            //     statusOfOnlineRequests = 'pending';
            // }

            query = {
                //     ofYear,
                //   College,
                //   egyptions,
                //   expartriates, 
                
                //   oldStudent,
                //   newStudent,
                //   statusOfOnlineRequests,
                role:"User",
                  gender: "ذكر"
    
              };
            if (ofYear){
                query.ofYear = ofYear;

            }

           

            if(College)
            {
                query.College = College;
            }
            if(egyptions)
            {
                query.egyptions = egyptions
            }
            if(expartriates)
            {
                query.expartriates = expartriates
            }
            if (housingTypes.length > 0) {
                query.HousingType = { $in: housingTypes };
            }
            
            if(oldStudent){
                query.oldStudent = oldStudent
            }
            if(newStudent){
                query.newStudent = newStudent
            }
            if(statusOfOnlineRequests)
            {
                query.statusOfOnlineRequests = statusOfOnlineRequests
            }
            
     
      
      // Loop over each key-value pair in the query object
for (const key in query) {
    if (query.hasOwnProperty(key)) {
        // If the value is 0, remove the key-value pair from the object
        if (query[key] == "false"|| query[key] ==="false"|| query[key] == false|| query[key] =="undefined") {
            delete query[key];
        }
    }
}

    
          
            console.log(Object.keys(req.query).length > 0);
            let students
            if(Object.keys(req.query).length > 0) {
                console.log('====================================');
                console.log("in if");
                console.log('Query:', query);
                console.log('====================================');
                 students = await User.find(query);
            }
            else{
                console.log('====================================');
                console.log("in else");
                console.log('====================================');
                 students = await User.find({role:"User",gender: "ذكر"});
            }

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
        housingTypes.push('سكن مميز فردى طالبات');
    }
    let statusOfOnlineRequests;

    if (appliers === 'true') {
        statusOfOnlineRequests = 'pending';
    } 
    else if(acceptedApplications === 'true') {
        statusOfOnlineRequests = 'accepted';
    }
    else{
        statusOfOnlineRequests = 'pending';
    }
    
     query = {
        ofYear,
      College,
      egyptions,
      expartriates, 
    
      oldStudent,
      newStudent,
      statusOfOnlineRequests,
      gender: { $in: ["انثي", "أنثي", "انثى", "أنثى"]}

  };

  if (housingTypes.length > 0) {
    query.HousingType = { $in: housingTypes };
}

// Loop over each key-value pair in the query object
// for (const key in query) {
//     if (query.hasOwnProperty(key)) {
//         // If the value is undefined, set it to false
//         if (query[key] === undefined) {
//             query[key] = false;
//         }
//     }
// }

  
    console.log(Object.keys(req.query).length > 0);
    let students
    if(Object.keys(req.query).length > 0) {
        console.log('====================================');
        console.log("in if");
        console.log('Query:', query);
        console.log('====================================');
         students = await User.find(query);
    }
    else{
        console.log('====================================');
        console.log("in else");
        console.log('====================================');
         students = await User.find({role:"User",   gender: { $in: ["انثي", "أنثي", "انثى", "أنثى"]}});
    }

    return res.status(200).json({ status: httpStatusText.SUCCESS, data: { students } });
   } 
       
    );


 

const searchMales = errorHandling.asyncHandler(async (req, res, next) => {
    const { studentName, nationalID, studentCode } = req.query;

    const conditions = [];

    if (studentName) {
        conditions.push({ studentName: { $regex: studentName, $options: 'i' } });
    }
    if (nationalID) {
        conditions.push({ nationalID: { $regex: nationalID, $options: 'i' } });
    }
    if (studentCode) {
        conditions.push({ studentCode: { $regex: studentCode, $options: 'i' } });
    }

    try {
        const results = await User.find({ $or: conditions,  gender:"ذكر"});

        return res.status(200).json({ status: httpStatusText.SUCCESS, data: { results } });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
const searchFemales = errorHandling.asyncHandler(async (req, res, next) => {
    const { studentName, nationalID, studentCode } = req.query;

    const conditions = [];

    if (studentName) {
        conditions.push({ studentName: { $regex: studentName, $options: 'i' } });
    }
    if (nationalID) {
        conditions.push({ nationalID: { $regex: nationalID, $options: 'i' } });
    }
    if (studentCode) {
        conditions.push({ studentCode: { $regex: studentCode, $options: 'i' } });
    }

    try {
        const results = await User.find({ $or: conditions ,gender: { $in: ["انثي", "أنثي", "انثى", "أنثى"]}});

        return res.status(200).json({ status: httpStatusText.SUCCESS, data: { results } });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

  

  module.exports = { getBasicDataMales ,getBasicDataFemales,searchMales,searchFemales};