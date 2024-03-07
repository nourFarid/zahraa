const User = require("../../../../DB/model/User.model.js");
const absencesPermissionModel = require('../../../../DB/model/absencesAndPermissions/absencesAndPermissions.js');
const Buildings =require("../../../../DB/model/rooms/BuildingsModel.js")
const errorHandling = require("../../../utils/errorHandling.js");
const httpStatusText = require("../../../utils/httpStatusText.js");

const StatementOfTheSituation = errorHandling.asyncHandler(async (req, res, next) => {
  
      const { id } = req.params;
var building
      const student = await User.findById(id);

      if (!student) {
        return next (new Error (`user not found`,{cause:400}))
      }
      // const {buildingId}= student
      // console.log(buildingId);
      // if (buildingId) {
      //      building = await Buildings.find({_id:buildingId});
      //     console.log(building);
        
      //   }
         
      //   else {
      //     console.log('No buildingId found for this student');
      // } 

      const permission = await absencesPermissionModel.find({StudentId:id}, {"__v":false , "isCancelled":false ,
    "TakeMeal":false , "notes":false , "_id":false  , "paymentDate":false , "PaymentValueNumber":false});
  
console.log(permission);

    if(!permission){
      return next (new Error (`لا يوجد اجازات`,{cause:404}))
  
    }
  
    const calculateDurationWithoutFriday = (dateFrom, dateTo) => {
      let durationInDays = 0;
      let currentDate = new Date(dateFrom);

      // Iterate through each day between dateFrom and dateTo
      while (currentDate <= dateTo) {
          const dayOfWeek = currentDate.getDay();
          if (dayOfWeek !== 5) { // Check if the day is not Friday
              durationInDays++;
          }
          currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
      }

      return durationInDays;
  };


  // Calculate both durations for each permission
  const permissionsWithDuration = permission.map(permission => {
      const dateFrom = new Date(permission.dateFrom);
      const dateTo = new Date(permission.dateTo);
      
      // Calculate original duration
      const originalDurationInMilliseconds = dateTo - dateFrom;
       const originalDurationInDays = parseInt(originalDurationInMilliseconds / (1000 * 60 * 60 * 24)); 

      // Calculate duration excluding Fridays
      const durationWithoutFriday = calculateDurationWithoutFriday(dateFrom, dateTo);
       console.log(durationWithoutFriday);

      return {
          ...permission.toObject(),
          originalDurationInDays,
          durationWithoutFriday
      };
  });
  return res.status(200).json({status : httpStatusText.SUCCESS , data:{student,permissionsWithDuration,}
    });
      } )
    
      

   



  

//   const getPermissions = errorHandling.asyncHandler( async(req,res,next)=>{
  
//     const permission = await absencesPermissionModel.find({}, {"__v":false , "isCancelled":false ,
//     "TakeMeal":false , "notes":false , "_id":false  , "paymentDate":false , "PaymentValueNumber":false});
  
// console.log(permission);

//     if(!permission){
//       return next (new Error (`لا يوجد اجازات`,{cause:404}))
  
//     }
  
//     const calculateDurationWithoutFriday = (dateFrom, dateTo) => {
//       let durationInDays = 0;
//       let currentDate = new Date(dateFrom);

//       // Iterate through each day between dateFrom and dateTo
//       while (currentDate <= dateTo) {
//           const dayOfWeek = currentDate.getDay();
//           if (dayOfWeek !== 5) { // Check if the day is not Friday
//               durationInDays++;
//           }
//           currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
//       }

//       return durationInDays;
//   };

//   // Calculate both durations for each permission
//   const permissionsWithDuration = permission.map(permission => {
//       const dateFrom = new Date(permission.dateFrom);
//       const dateTo = new Date(permission.dateTo);
      
//       // Calculate original duration
//       const originalDurationInMilliseconds = dateTo - dateFrom;
//       const originalDurationInDays = parseInt(originalDurationInMilliseconds / (1000 * 60 * 60 * 24)); 

//       // Calculate duration excluding Fridays
//       const durationWithoutFriday = calculateDurationWithoutFriday(dateFrom, dateTo);

//       return {
//           ...permission.toObject(),
//           originalDurationInDays,
//           durationWithoutFriday
//       };
//   });
//   return res.status(200).json({status : httpStatusText.SUCCESS , data:{permissions:permissionsWithDuration}
//     });
//   });
  
  module.exports = { StatementOfTheSituation };
  





























    // const permissionsWithDuration = permission.map(permission => {
    //   const dateFrom = new Date(permission.dateFrom);
    //   const dateTo = new Date(permission.dateTo);
    //   const durationInMilliseconds = dateTo - dateFrom;
    //   const durationInDays = durationInMilliseconds / (1000 * 60 * 60 * 24); 
    //   return {
    //       ...permission.toObject(), // Convert Mongoose document to plain object
    //       durationInDays
    //   };






    // (async (req, res, next) => {
    //   try {
    //     const { studentName } = req.body;
    
    //     const query = {
    //       studentName,
    //     };
    
    //     const projection = {
    //       studentName:1,
    //       gender:1,
    //       birthDate:1,
    //       religion:1,
    //       email:1,
    //       College :1,
    //       year:1,
    //       grade:1,
    //       detailedAddress:1,
    //       Accepting:1,
    //       guardianName:1,
    //       guardianNationalId:1,
    //       guardianPhone:1,
    //     };
    
    //     console.log('Query:', query);
    //     const student = await User.find(query, projection);
    //     console.log('Result:', student);
    
    //     res.json(student);
    //   } catch (error) {
    //     console.error('Error retrieving student:', error);
    //     res.status(500).json({ error: 'Internal Server Error' });
    //   }
    // });
    


   // const retrieveSomeStudentDataMales = errorHandling.asyncHandler
// (async (req, res, next) => { 
//   const { ofYear
//     ,College
//     ,egyptions, expartriates,
//   appliers,acceptedApplications,
//   oldStudent,newStudent,
//  normalHousing, specialHousing,
//  isHoused,isEvacuated,

// } = req.query;
// const housingTypes = [];
// if (normalHousing === 'true') {
//     housingTypes.push('عادى');
// }
// if (specialHousing === 'true') {
//     housingTypes.push('سكن مميز فردى طلبة');
// }
// let statusOfOnlineRequests;
// if (appliers === 'true') {
//     statusOfOnlineRequests = 'pending';
// } 
// if(acceptedApplications === 'true') {
//     statusOfOnlineRequests = 'accepted';
// }

// var query = {
//   role:"User",
//   gender: "ذكر"
// };
// if(ofYear){
//   query.ofYear = ofYear
// }
// if(College){
//   query.College = College
// }
// if(egyptions){
//   query.egyptions = egyptions
// }
// if(expartriates){
//   query.expartriates = expartriates
// }
// if(statusOfOnlineRequests){
//   query.statusOfOnlineRequests = statusOfOnlineRequests
// }
// if(oldStudent){
//   query.oldStudent = oldStudent
// }
// if(newStudent){
//   query.newStudent = newStudent
// }
// if (housingTypes.length > 0) {
// query.HousingType = { $in: housingTypes };
// }
// if(isHoused){
//   query.isHoused = isHoused
// }
// if(isEvacuated){
//   query.isEvacuated = isEvacuated
// }

// // Loop over each key-value pair in the query object
//       // Loop over each key-value pair in the query object
//       for (const key in query) {
//         if (query.hasOwnProperty(key)) {
//             // If the value is 0, remove the key-value pair from the object
//             if (query[key] == "false"|| query[key] ==="false"|| query[key] == false|| query[key] =="undefined") {
//                 delete query[key];
//             }
//         }
//     }

// let student
// if(Object.keys(req.query).length > 0) {
//     console.log('====================================');
//     console.log("in if");
//     console.log('Query:', query);
//     console.log('====================================');
//      student = await User.find(query);
// }
// else{
//     console.log('====================================');
//     console.log("in else");
//     console.log('====================================');
//      student = await User.find({role:"User",   gender:"ذكر"});
// }

// return res.status(200).json({ status: httpStatusText.SUCCESS, data: { student } });

// } 

// );
//     const retrieveSomeStudentDataFemales = errorHandling.asyncHandler(async (req, res, next) => {

//     const { ofYear
//       ,College
//       ,egyptions, expartriates, normalHousing, specialHousing,
//     oldStudent,newStudent,appliers,
//     acceptedApplications

//     } = req.query;
//     const housingTypes = [];
//     var query = {};

//     if (normalHousing === 'true') {
//       housingTypes.push('عادى');
//     }

//     if (specialHousing === 'true') {
//       housingTypes.push('سكن مميز فردى طلبة');
//     }
//     let statusOfOnlineRequests;

//     if (appliers === 'true') {
//       statusOfOnlineRequests = 'bending';
//     } 
//     if(acceptedApplications === 'true') {
//       statusOfOnlineRequests = 'accepted';
//     }

//     var query = {
//       ofYear,
//     College,
//     egyptions,
//     expartriates, 

//     oldStudent,
//     newStudent,
//     gender: { $in: ["انثي", "أنثي", "انثى", "أنثى"] } 

//     };

//     if (housingTypes.length > 0) {
//     query.HousingType = { $in: housingTypes };
//     }

//     // Loop over each key-value pair in the query object
//     for (const key in query) {
//     if (query.hasOwnProperty(key)) {
//       // If the value is undefined, set it to false
//       if (query[key] === undefined) {
//           query[key] = false;
//       }
//     }
//     }

//     console.log('Query:', query);
//     const student = await User.find(query);
//     if(!student){
//     return next (new Error (`CAN't retrieve any student `,{cause:400}))
//     }
//     console.log('Result:', student);
//     return res.status(200).json({ status: httpStatusText.SUCCESS, data: { student } });
//     } 

//     );



// const retrieveHousingData = errorHandling.asyncHandler(async (req, res, next) => {
//   try {
//     const { studentName } = req.body;

//     const query = {
//       studentName,
//     };

//     const projection = {
//       buildingId:1,
//       housingDate:1,
//       evacuationDate:1,
//     };

//     console.log('Query:', query);
//     const student = await User.find(query, projection);
//     console.log('Result:', student);

//     res.json(student);
//   } catch (error) {
//     console.error('Error retrieving student:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });