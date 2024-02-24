const errorHandling = require ('../../../utils/errorHandling.js')
const httpStatusText = require('../../../utils/httpStatusText.js')
const User = require('../../../../DB/model/User.model.js')

const dotenv = require('dotenv');

dotenv.config();
const collegesString = process.env.COLLEGES;
const colleges = collegesString.split(',');


//اعداد المتقدمين
const getNumberOfAppliers = errorHandling.asyncHandler(async(req,res,next)=>{

    var { ofYear,College,
         underReview, rejected,waitingForClassification,accepted 
         ,egyptions,expartriates,
        muslim , christian,
         normalHousing, specialHousing,
          oldStudent, newStudent,
           grade,gradePercentage,
           residentsOfTheYreviousYear, } = req.query;

var onlineRequests = [];
var years=[]


if (underReview==='true'){
    onlineRequests.push("underReview")
    
}
if (rejected==='true'){
     onlineRequests.push("rejected")
}

if (accepted==='true'){
  onlineRequests.push("accepted")
}
var housingTypes = [];
if (normalHousing === 'true') {
    housingTypes.push('عادى');
}

if (specialHousing === 'true') {
    housingTypes.push('سكن مميز فردى طلبة');
}

var religions = [];
if(muslim==='true'){religions.push("مسلم")}
if(christian==='true'){religions.push("مسيحى")}


    // Dynamically set residentsOfTheYreviousYear based on ofYear
    if(residentsOfTheYreviousYear){
  var [startYear, endYear] = ofYear.split('-');
    residentsOfTheYreviousYear = `${parseInt(startYear) - 1}-${parseInt(endYear) - 1}`;
console.log('====================================');
console.log("residentsOfTheYreviousYear: "+residentsOfTheYreviousYear);
console.log('====================================');
years.push(residentsOfTheYreviousYear);

    }
    if(ofYear){
        years.push(ofYear)
    }

  var  query={
    gender:"ذكر",
    role:'User'
  }
if(College){
    query.College = College

}
if(egyptions){
    query.egyptions = egyptions
}
if(expartriates){
    query.expartriates = expartriates
}
if(oldStudent){
    query.oldStudent = oldStudent
}
if(newStudent){
    query.newStudent = newStudent
}
if(grade){
    query.grade = { $exists: true }
}
if(gradePercentage){
    query.gradePercentage = { $exists: true }
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

if(waitingForClassification){
    query.waitingForClassification = waitingForClassification
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
  var { ofYear, 
    egyptions, expartriates,
     normalHousing, specialHousing,
      oldStudent,newStudent,
      isEvacuated,isHoused ,transformed} = req.query;
  const housingTypes = [];
  var query = {};
  query = {
    role:"User",
    gender:"ذكر"
 };

if (normalHousing === 'true') {
      housingTypes.push('عادى');
  }
if (specialHousing === 'true') {
      housingTypes.push('سكن مميز فردى طلبة');
  }

if (housingTypes.length > 0) {
      query.HousingType = { $in: housingTypes };
  }
if(egyptions)
{
    query.egyptions = egyptions
}
if(expartriates)
{
    query.expartriates = expartriates
}
if(ofYear)
{
    query.ofYear = ofYear
}
if(oldStudent)
{
    query.oldStudent = oldStudent
}
if(newStudent)
{
    query.newStudent = newStudent
}
if(isEvacuated)
{
    query.isEvacuated = isEvacuated
}
if(isHoused)
{
    query.isHoused = isHoused
}
if(transformed){
    query.transformed = transformed
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
const getNumberOfAllStudents = errorHandling.asyncHandler(async(req, res, next) => {
    const { ofYear,
         egyptions, expartriates,
          oldStudent, newStudent,
           normalHousing, specialHousing,
            withSpecialNeeds } = req.query;
 var students 
 const housingTypes = [];
    if (normalHousing === 'true') {
        housingTypes.push('عادى');
    }

    if (specialHousing === 'true') {
        housingTypes.push('سكن مميز فردى طلبة');
    }
 
    var query = {
        ofYear,
        gender: 'ذكر',
        role: 'User',
    
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
            // If the value is undefined, set it to false
            if (query[key] === undefined) {
                query[key] = false;
            }
        }
    }

    students = await User.find(query);


     // Object to store counts for each college
     const collegeCounts = {};
     students.forEach(student => {
        // Count statuses for each college
        if (colleges.includes(student.College)) {
            if (!collegeCounts[student.College]) {
                collegeCounts[student.College] = {
                    underReview: 0,
                    accepted: 0,
                    rejected: 0,
                    isHoused: 0,
                    isEvacuated: 0
                };
            }

            switch (student.statusOfOnlineRequests) {
                case "underReview":
                    collegeCounts[student.College].underReview++;
                    break;
                case "accepted":
                    collegeCounts[student.College].accepted++;
                    break;
                case "rejected":
                    collegeCounts[student.College].rejected++;
                    break;
            }

            // Count housing status
            if (student.isHoused) {
                collegeCounts[student.College].isHoused++;
            }
            if (student.isEvacuated) {
                collegeCounts[student.College].isEvacuated++;
            }
        }
    });

    // Return the counts along with the student data
    return res.status(200).json({ status: httpStatusText.SUCCESS, data: collegeCounts });
});

//تجهيز الوجبات

//احصائيات استلام الوجبات

//اعداد الطلاب حسب نوع السكن
const NumberOfStudentsBasedOnHousingType = errorHandling.asyncHandler(async (req, res, next) => {
  const { ofYear, egyptions, expartriates, oldStudent, newStudent } = req.query;

  var query = {
    ofYear,
    role: 'User',
  };

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

  const students = await User.find(query);

  // Object to store counts for each HousingType
  const countsByHousingType = {};

  students.forEach(student => {
    // Count statuses for each HousingType
    if (student.HousingType) {
      if (!countsByHousingType[student.HousingType]) {
        countsByHousingType[student.HousingType] = {
          underReview: 0,
          rejected: 0,
          isHoused: 0,
          isEvacuated: 0,
          waitingForClassification: 0,
          waitingForHousing: 0
        };
      }

      switch (student.statusOfOnlineRequests) {
        case "underReview":
          countsByHousingType[student.HousingType].underReview++;
          break;
        case "rejected":
          countsByHousingType[student.HousingType].rejected++;
          break;
      }

      // Count housing status
      if (student.isHoused) {
        countsByHousingType[student.HousingType].isHoused++;
      }
      if (student.isEvacuated) {
        countsByHousingType[student.HousingType].isEvacuated++;
      }

      // Count waitingForClassification
      if (!student.waitingForClassification) {
        countsByHousingType[student.HousingType].waitingForClassification++;
      }

      // Count cases where statusOfOnlineRequests is true but isHoused is false
      if (student.statusOfOnlineRequests && !student.isHoused) {
        countsByHousingType[student.HousingType].waitingForHousing++;
      }
    }
  });

  // Return the counts along with the student data
  return res.status(200).json({ status: httpStatusText.SUCCESS, data: countsByHousingType });
});



module.exports = {getNumberOfResidents,
    getNumberOfAllStudents,getNumberOfAppliers,
    NumberOfStudentsBasedOnHousingType
};

