const errorHandling = require ('../../../utils/errorHandling.js')
const httpStatusText = require('../../../utils/httpStatusText.js')
const User = require('../../../../DB/model/User.model.js')
//اعداد المتقدمين
const getNumberOfAppliers = errorHandling.asyncHandler(async(req,res,next)=>{

    var { ofYear,College, bending, rejected,waitingForClassification,accepted ,egyptions,expartriates,
        muslim , christian, expartriates, normalHousing,
         specialHousing, oldStudent,
        newStudent, grade,gradePercentage,residentsOfTheYreviousYear, } = req.query;

const onlineRequests = [];

if (bending==='true'){
    onlineRequests.push("bending")
    
}
if (rejected==='true'){
     onlineRequests.push("rejected")
}
if (waitingForClassification==='true'){
  onlineRequests.push("waitingForClassification")
}
if (accepted==='true'){
  onlineRequests.push("accepted")
}
const housingTypes = [];
if (normalHousing === 'true') {
    housingTypes.push('عادى');
}

if (specialHousing === 'true') {
    housingTypes.push('سكن مميز فردى طلبة');
}

const religions = [];
if(muslim==='true'){religions.push("مسلم")}
if(christian==='true'){religions.push("مسيحى")}


    // Dynamically set residentsOfTheYreviousYear based on ofYear
    const [startYear, endYear] = ofYear.split('-');
    residentsOfTheYreviousYear = `${parseInt(startYear) - 1}-${parseInt(endYear) - 1}`;
console.log('====================================');
console.log("residentsOfTheYreviousYear: "+residentsOfTheYreviousYear);
console.log('====================================');


        query={
            ofYear,
            College,  
            egyptions,
             expartriates,
            oldStudent,
            newStudent,
            // grade,
            // gradePercentage,
            residentsOfTheYreviousYear
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
    getNumberOfAllStudents,getNumberOfAppliers
}