const errorHandling = require ('../../../utils/errorHandling.js')
const httpStatusText = require('../../../utils/httpStatusText.js')
const User = require('../../../../DB/model/User.model.js')
//اعداد المتقدمين

//اعداد المقيمين


const getNumberOfResidents = errorHandling.asyncHandler(async(req, res, next) => {
  // Extract query parameter
  var { ofYear, egyptions, expartriates, normalHousing, specialHousing, oldStudent,
    newStudent, resident, evacuation } = req.query;
  const housingTypes = [];
  var query = {};
  var roomId;

  if (resident === "true") {
      roomId = { $exists: true };
  }

  if (normalHousing === 'true') {
      housingTypes.push('عادى');
  }

  if (specialHousing === 'true') {
      housingTypes.push('سكن مميز فردى طلبة');
  }

  query = {
      ofYear,
      egyptions,
      expartriates,
      newStudent,
      oldStudent, 
      roomId,
      gender:"ذكر"
  };

  console.log('====================================');
  console.log("resident: " + JSON.stringify(resident));
  console.log('====================================');

//   if (egyptions === 'true') {
//       query.$or = [
//           { newEgyption: true },
//           { oldEgyption: true }
//       ];
//   }

//   if (expartriates === 'true') {
//       query.$or = [
//           ...(query.$or || []),
//           { newExpartriates: true },
//           { oldExpartriates: true }
//       ];
//   }

//   if (oldStudent === 'true') {
//       query.$or = [
//           ...(query.$or || []),
//           { oldEgyption: true },
//           { oldExpartriates: true }
//       ];
//   }

//   if (newStudent === 'true') {
//       query.$or = [
//           ...(query.$or || []),
//           { newEgyption: true },
//           { newExpartriates: true }
//       ];
//   }

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

  const users = await User.find(query);
  const count = users.length;

  console.log('====================================');
  console.log(query);
  console.log(count);
  console.log('====================================');

  return res.status(200).json({ status: httpStatusText.SUCCESS, data: { users,count } });

});


//احصائيات البطاقات المطبوعة

//اعداد جميع الطلاب

const getNumberOfAllStudents = errorHandling.asyncHandler(async(req,res,next)=>{
   
    const count= await User.countDocuments()
    
    if (!count){
    
    
      return next (new Error (`CAN'T GET THE NUMBER OF ALL STUDENTS `,{cause:400}))
    
    }
    
       
     return res.status(200).json({status : httpStatusText.SUCCESS , data : {count}})
    
      }
      )
      

//تجهيز الوجبات

//احصائيات استلام الوجبات


module.exports = {getNumberOfResidents,
    getNumberOfAllStudents
}