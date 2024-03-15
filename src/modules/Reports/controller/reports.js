const UserModel = require('../../../../DB/model/User.model.js');
const errorHandling = require ('../../../utils/errorHandling.js')
const httpStatusText = require('../../../utils/httpStatusText.js')
const absencesPermissionModel = require('../../../../DB/model/absencesAndPermissions/absencesAndPermissions.js');
const penatlyModel = require('../../../../DB/model/penaltiesModel.js') 

const dotenv = require('dotenv');

dotenv.config();
const collegesString = process.env.COLLEGES;
const colleges = collegesString.split(',');

//قوائم الطلاب
const studentListsMales = errorHandling.asyncHandler(async(req,res,next)=>{

    var { ofYear,College,year,nationality,placeOfBirth,
      isHoused,egyptions,expartriates,normalHousing,
      specialHousing,withSpecialNeeds,statusOfOnlineRequests,
      newStudent,oldStudent,gradeOfLastYear,housingDate,evacuationDate,
      muslim,christian,residentsOfThePreviousYear,withoutFood,
      withFood,transferred,isClassified} = req.query;

var years=[]

var housingTypes = [];
if (normalHousing === 'true') {
    housingTypes.push('سكن عادى');
}
if (specialHousing === 'true') {
    housingTypes.push('سكن مميز فردى طلبة');
}

var housingWithoutFood 
if (withoutFood==true||withoutFood=='true') {
   housingWithoutFood = 'true';  
   query.housingWithoutFood = housingWithoutFood
}
if (withFood==true||withFood=='true') {
  housingWithoutFood = 'false';  
  query.housingWithoutFood = housingWithoutFood
}


var religions = [];
if(muslim==='true'){religions.push("مسلم")}
if(christian==='true'){religions.push("مسيحى")}

if (residentsOfThePreviousYear) {
  var [startYear, endYear] = ofYear.split('-');
  residentsOfThePreviousYear = `${parseInt(startYear) - 1}-${parseInt(endYear) - 1}`;
  console.log('====================================');
  console.log("residentsOfTheYreviousYear: " + residentsOfThePreviousYear);
  console.log('====================================');
  years.push(residentsOfThePreviousYear);
  // Set residentsOfThePreviousYear to true when it's present
  residentsOfThePreviousYear = true;
  console.log(residentsOfThePreviousYear)
}
 if(ofYear){
        years.push(ofYear)
    }

  var  query={
    role:'User',
    gender:'ذكر'
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

if (housingTypes.length > 0) {
    query.HousingType = { $in: housingTypes };
}

if (religions.length > 0) {
    query.religion = { $in: religions };
}
if (years.length > 0) {
    query.ofYear = { $in: years };
}
if (withSpecialNeeds) {
  query.withSpecialNeeds = withSpecialNeeds;
}
if (nationality) {
  query.nationality = nationality;
}

if (placeOfBirth) {
  query.placeOfBirth = placeOfBirth;
}
if (year) {
  query.year = year;
}

if (isHoused) {
  query.isHoused = isHoused;
}
if (isClassified) {
  query.isClassified = isClassified;
}
if (statusOfOnlineRequests) {
  query.statusOfOnlineRequests = statusOfOnlineRequests;
}
if (newStudent) {
  query.newStudent = newStudent;
}
if (oldStudent) {
  query.oldStudent = oldStudent;
}
if (gradeOfLastYear) {
  query.gradeOfLastYear = gradeOfLastYear;
}
if (housingDate) {
  query.housingDate = housingDate;
}
if (evacuationDate) {
  query.evacuationDate = evacuationDate;
}
if (housingWithoutFood) {
  query.housingWithoutFood = housingWithoutFood;
}
if (transferred) {
  query.transferred = transferred;
}


  // Loop over each key-value pair in the query object
  for (const key in query) {
    if (query.hasOwnProperty(key)) {
        // If the value is undefined, set it to false
        if (
          query[key] == "false" ||
          query[key] == "undefined"||
          query[key] == false ||
          query[key] == undefined
        ) {
          delete query[key];
        }
    }

  const users = await UserModel.find(query).sort({College:1});



console.log('====================================');
console.log(query);
console.log('====================================');

// const responseData = { status: httpStatusText.SUCCESS, data: { users: users.map(user => ({ ...user.toObject(), residentsOfThePreviousYear: residentsOfThePreviousYear })) } };
if(! users)
return next (new Error ("NO USERS FOUND",{cause:404}))
return res.status(200).json({ status: httpStatusText.SUCCESS, data: { users} });

}});
//قوائم الطالبات
const studentListsFemales = errorHandling.asyncHandler(async(req,res,next)=>{

  var { ofYear,College,year,nationality,placeOfBirth,
    isHoused,egyptions,expartriates,normalHousing,
    specialHousing,withSpecialNeeds,statusOfOnlineRequests,
    newStudent,oldStudent,gradeOfLastYear,housingDate,evacuationDate,
    muslim,christian,residentsOfThePreviousYear,withoutFood,
    withFood,transferred,isClassified} = req.query;

var years=[]

var housingTypes = [];
if (normalHousing === 'true') {
  housingTypes.push('سكن عادى');
}
if (specialHousing === 'true') {
  housingTypes.push('سكن مميز فردى طالبات');
}

var housingWithoutFood 
if (withoutFood==true||withoutFood=='true') {
 housingWithoutFood = 'true';  
 query.housingWithoutFood = housingWithoutFood
}
if (withFood==true||withFood=='true') {
housingWithoutFood = 'false';  
query.housingWithoutFood = housingWithoutFood
}


var religions = [];
if(muslim==='true'){religions.push("مسلم")}
if(christian==='true'){religions.push("مسيحى")}

if (residentsOfThePreviousYear) {
var [startYear, endYear] = ofYear.split('-');
residentsOfThePreviousYear = `${parseInt(startYear) - 1}-${parseInt(endYear) - 1}`;
console.log('====================================');
console.log("residentsOfTheYreviousYear: " + residentsOfThePreviousYear);
console.log('====================================');
years.push(residentsOfThePreviousYear);
// Set residentsOfThePreviousYear to true when it's present
residentsOfThePreviousYear = true;
console.log(residentsOfThePreviousYear)
}
if(ofYear){
      years.push(ofYear)
  }

var  query={
  role:'User',
    gender:{ $in: ["انثي", "أنثي", "انثى", "أنثى"] } 

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

if (housingTypes.length > 0) {
  query.HousingType = { $in: housingTypes };
}

if (religions.length > 0) {
  query.religion = { $in: religions };
}
if (years.length > 0) {
  query.ofYear = { $in: years };
}
if (withSpecialNeeds) {
query.withSpecialNeeds = withSpecialNeeds;
}
if (nationality) {
query.nationality = nationality;
}

if (placeOfBirth) {
query.placeOfBirth = placeOfBirth;
}
if (year) {
query.year = year;
}

if (isHoused) {
query.isHoused = isHoused;
}
if (isClassified) {
query.isClassified = isClassified;
}
if (statusOfOnlineRequests) {
query.statusOfOnlineRequests = statusOfOnlineRequests;
}
if (newStudent) {
query.newStudent = newStudent;
}
if (oldStudent) {
query.oldStudent = oldStudent;
}
if (gradeOfLastYear) {
query.gradeOfLastYear = gradeOfLastYear;
}
if (housingDate) {
query.housingDate = housingDate;
}
if (evacuationDate) {
query.evacuationDate = evacuationDate;
}
if (housingWithoutFood) {
query.housingWithoutFood = housingWithoutFood;
}
if (transferred) {
query.transferred = transferred;
}


// Loop over each key-value pair in the query object
for (const key in query) {
  if (query.hasOwnProperty(key)) {
      // If the value is undefined, set it to false
      if (
        query[key] == "false" ||
        query[key] == "undefined"||
        query[key] == false ||
        query[key] == undefined
      ) {
        delete query[key];
      }
  }

const users = await UserModel.find(query).sort({College:1});



console.log('====================================');
console.log(query);
console.log('====================================');

// const responseData = { status: httpStatusText.SUCCESS, data: { users: users.map(user => ({ ...user.toObject(), residentsOfThePreviousYear: residentsOfThePreviousYear })) } };
if(! users)
return next (new Error ("NO USERS FOUND",{cause:404}))
return res.status(200).json({ status: httpStatusText.SUCCESS, data: { users} });

}});

//تقرير غياب و تصاريح 
const AbsenceAndPermissionsReport = errorHandling.asyncHandler(async(req,res,next)=>{

  var { ofYear , dateFrom , dateTo , TypeOfAbsence} = req.query;

var years=[]

  if(ofYear){
      years.push(ofYear)
  }
var  query={
  ofYear,
  
}

if(dateFrom)
{
    query.dateFrom = dateFrom
}

if(dateTo)
{
    query.dateTo = dateTo
}

if(TypeOfAbsence)
{
    query.TypeOfAbsence = TypeOfAbsence
}

// Loop over each key-value pair in the query object
for (const key in query) {
  if (query.hasOwnProperty(key)) {
      // If the value is undefined, set it to false
      if (
        query[key] == "false" ||
        query[key] === "undefined"||
        query[key] == false ||
        query[key] == undefined
      ) {
        delete query[key];
      }
  }

const users = await absencesPermissionModel.find(query).sort({College:1})



console.log('====================================');
console.log(query);
console.log('====================================');


return res.status(200).json({ status: httpStatusText.SUCCESS, data: { users } });


}});


//تقارير الجزاءات
const penaltiesReport = errorHandling.asyncHandler(async(req,res,next)=>{

  var { ofYear  , PenaltyDate , cancellationDate , penaltyKind} = req.query;

var years=[]

  if(ofYear){
      years.push(ofYear)
  }
var  query={
  ofYear,
  
}

if(cancellationDate)
{
    query.cancellationDate = cancellationDate
}

if(PenaltyDate)
{
    query.PenaltyDate = PenaltyDate
}

if(penaltyKind)
{
    query.penaltyKind = penaltyKind
}

// Loop over each key-value pair in the query object
for (const key in query) {
  if (query.hasOwnProperty(key)) {
      // If the value is undefined, set it to false
      if (
        query[key] == "false" ||
        query[key] === "undefined"||
        query[key] == false ||
        query[key] == undefined
      ) {
        delete query[key];
      }
  }

const users = await penatlyModel.find(query).sort({College:1})



console.log('====================================');
console.log(query);
console.log('====================================');


return res.status(200).json({ status: httpStatusText.SUCCESS, data: { users } });


}});


//البطاقات المطبوعه للانثي
const printedFemalesCardsReport = errorHandling.asyncHandler(async (req, res, next) => {
  const {ofYear}= req.query
  var query={
      role:"User",
      gender: { $in: ["انثي", "أنثي", "انثى", "أنثى"] } ,
      printedCard: true
  }
  if(ofYear)
  {
      query.ofYear=ofYear
  }
  for (const key in query) {
      if (query.hasOwnProperty(key)) {
          // If the value is 0, remove the key-value pair from the object
          if (
            query[key] == "false" ||
            query[key] === "undefined"||
            query[key] == false ||
            query[key] == undefined
          ) {
            delete query[key];
          }
      }
  }
  console.log('====================================');
  console.log(query);
  console.log('====================================');

  const student = await UserModel.find(query).sort({College:1});
  const count = student.length;

  console.log('====================================');
  console.log(student.length);
  console.log('====================================');
  // const usersWith’Males = await UserModel.find({ printedCard: true });
  if(!student||student.length==0)
  return next (new Error (`NO USERS`,{cause:400}))

return res
  .status(200)
  .json({ status: httpStatusText.SUCCESS, data: { student,count } });
});


//البطاقات المطبوعه ذكر
const printedMalesCardsReport = errorHandling.asyncHandler(async (req, res, next) => {
  const {ofYear}= req.query
  var query={
      role:"User",
      gender: "ذكر" ,
      printedCard: true
  }
  if(ofYear)
  {
      query.ofYear=ofYear
  }
  for (const key in query) {
      if (query.hasOwnProperty(key)) {
          // If the value is 0, remove the key-value pair from the object
          if (
            query[key] == "false" ||
            query[key] === "undefined"||
            query[key] == false ||
            query[key] == undefined
          ) {
            delete query[key];
          }
      }
  }
  console.log('====================================');
  console.log(query);
  console.log('====================================');

  const student = await UserModel.find(query).sort({College:1});
  const count = student.length;

  console.log('====================================');
  console.log(student.length);
  console.log('====================================');
  // const usersWith’Males = await UserModel.find({ printedCard: true });
  if(!student||student.length==0)
  return next (new Error (`NO USERS`,{cause:400}))

return res
  .status(200)
  .json({ status: httpStatusText.SUCCESS, data: { student,count } });
});

//قوائم البحث الاجتماعى للذكر
const socialResearchcasesReportMale= errorHandling.asyncHandler(async(req,res,next)=>{
  const {ofYear,oldStudent,newStudent,statusOfOnlineRequests,divorce,deathFather,deathParents}= req.query

var query={}
const cases = [];
if (ofYear) {
  query.ofYear = ofYear;
}
if (oldStudent) {
  query.oldStudent = oldStudent;
}
if (newStudent) {
  query.newStudent = newStudent;
}
if (statusOfOnlineRequests) {
  query.statusOfOnlineRequests = statusOfOnlineRequests;
}

  
if (divorce === 'true') {
  cases.push("انفصال");
}
if (deathFather === 'true') {
  cases.push("وفاة الوالد");
}
if (deathParents === 'true') {
  cases.push("وفاة الوالدين");
}
if(cases.length > 0) {
  query.AsituationRelatedToTheParents={ $in: cases }
  query.gender="ذكر",
  query.role="User"
}

   // Loop over each key-value pair in the query object
   for (const key in query) {
    if (query.hasOwnProperty(key)) {
        // If the value is undefined, set it to false
        if (
          query[key] == "false" ||
          query[key] === "undefined"||
          query[key] == false ||
          query[key] == undefined
        ) {
          delete query[key];
        }
    }
}
console.log('====================================');
console.log(query);
console.log('====================================');

const users= await UserModel.find(query).sort({College:1})
const count= users.length
if(!users)
return next (new Error ("NO USERS FOUND",{cause:404}))
return res.status(200).json({ status: httpStatusText.SUCCESS, data: { users,count } });


})
//قوائم البحث الاجتماعي للانثي
const socialResearchcasesReportFemale= errorHandling.asyncHandler(async(req,res,next)=>{
  const {ofYear,oldStudent,newStudent,statusOfOnlineRequests,divorce,deathFather,deathParents}= req.query

var query={}
const cases = [];
if (ofYear) {
  query.ofYear = ofYear;
}
if (oldStudent) {
  query.oldStudent = oldStudent;
}
if (newStudent) {
  query.newStudent = newStudent;
}
if (statusOfOnlineRequests) {
  query.statusOfOnlineRequests = statusOfOnlineRequests;
}

  
if (divorce === 'true') {
  cases.push("انفصال");
}
if (deathFather === 'true') {
  cases.push("وفاة الوالد");
}
if (deathParents === 'true') {
  cases.push("وفاة الوالدين");
}
if(cases.length > 0) {
  query.AsituationRelatedToTheParents={ $in: cases }
  query.gender= { $in: ["انثي", "أنثي", "انثى", "أنثى"] } ,
  query.role="User"
}

   // Loop over each key-value pair in the query object
   for (const key in query) {
    if (query.hasOwnProperty(key)) {
        // If the value is undefined, set it to false
        if (
          query[key] == "false" ||
          query[key] === "undefined"||
          query[key] == false ||
          query[key] == undefined
        ) {
          delete query[key];
        }
    }
}
console.log('====================================');
console.log(query);
console.log('====================================');

const users= await UserModel.find(query).sort({College:1})
const count= users.length
if(!users)
return next (new Error ("NO USERS FOUND",{cause:404}))
return res.status(200).json({ status: httpStatusText.SUCCESS, data: { users,count } });


})

//الطلبة المحولين للذكر 
const transferredMaleStudents=errorHandling.asyncHandler(async(req,res,next)=>{
  const {ofYear,oldStudent,newStudent}= req.query
var query={
  transferred:true,
  gender:"ذكر"
}

if (ofYear) {
  query.ofYear = ofYear;
}
if (oldStudent) {
  query.oldStudent = oldStudent;
}
if (newStudent) {
  query.newStudent = newStudent;
}
 // Loop over each key-value pair in the query object
 for (const key in query) {
  if (query.hasOwnProperty(key)) {
      // If the value is undefined, set it to false
      if (
        query[key] == "false" ||
        query[key] === "undefined"||
        query[key] == false ||
        query[key] == undefined
      ) {
        delete query[key];
      }
  }
}
console.log('====================================');
console.log(query);
console.log('====================================');

const users= await UserModel.find(query).sort({College:1})
const count= users.length
if(!users)
return next (new Error ("NO USERS FOUND",{cause:404}))
return res.status(200).json({ status: httpStatusText.SUCCESS, data: { users,count } });


})
//الطلبة المحولين للانثي 
const transferredFemaleStudents=errorHandling.asyncHandler(async(req,res,next)=>{
  const {ofYear,oldStudent,newStudent}= req.query
var query={
  transferred:true,
  gender:{ $in: ["انثي", "أنثي", "انثى", "أنثى"] } ,
}

if (ofYear) {
  query.ofYear = ofYear;
}
if (oldStudent) {
  query.oldStudent = oldStudent;
}
if (newStudent) {
  query.newStudent = newStudent;
}
 // Loop over each key-value pair in the query object
 for (const key in query) {
  if (query.hasOwnProperty(key)) {
      // If the value is undefined, set it to false
      if (
        query[key] == "false" ||
        query[key] === "undefined"||
        query[key] == false ||
        query[key] == undefined
      ) {
        delete query[key];
      }
  }
}
console.log('====================================');
console.log(query);
console.log('====================================');

const users= await UserModel.find(query).sort({College:1})
const count= users.length
if(!users)
return next (new Error ("NO USERS FOUND",{cause:404}))
return res.status(200).json({ status: httpStatusText.SUCCESS, data: { users,count } });


})
//الطلبة المفصولين للذكر 

const expulsionStudentsMale=errorHandling.asyncHandler(async(req,res,next)=>{
  const {ofYear,oldStudent,newStudent}= req.query
var query={expulsionStudent:true,
  
  gender:"ذكر"
}

if (ofYear) {
  query.ofYear = ofYear;
}
if (oldStudent) {
  query.oldStudent = oldStudent;
}
if (newStudent) {
  query.newStudent = newStudent;
}
 // Loop over each key-value pair in the query object
 for (const key in query) {
  if (query.hasOwnProperty(key)) {
      // If the value is undefined, set it to false
      if (
        query[key] == "false" ||
        query[key] === "undefined"||
        query[key] == false ||
        query[key] == undefined
      ) {
        delete query[key];
      }
  }
}
console.log('====================================');
console.log(query);
console.log('====================================');

const users= await UserModel.find(query).sort({College:1})
const count= users.length
if(!users)
return next (new Error ("NO USERS FOUND",{cause:404}))
return res.status(200).json({ status: httpStatusText.SUCCESS, data: { users,count } });


})

//الطلبة المفصولين للانثي 

const expulsionStudentsFemale=errorHandling.asyncHandler(async(req,res,next)=>{
  const {ofYear,oldStudent,newStudent}= req.query
var query={expulsionStudent:true, gender:{ $in: ["انثي", "أنثي", "انثى", "أنثى"] } ,}

if (ofYear) {
  query.ofYear = ofYear;
}
if (oldStudent) {
  query.oldStudent = oldStudent;
}
if (newStudent) {
  query.newStudent = newStudent;
}
 // Loop over each key-value pair in the query object
 for (const key in query) {
  if (query.hasOwnProperty(key)) {
      // If the value is undefined, set it to false
      if (
        query[key] == "false" ||
        query[key] === "undefined"||
        query[key] == false ||
        query[key] == undefined
      ) {
        delete query[key];
      }
  }
}
console.log('====================================');
console.log(query);
console.log('====================================');

const users= await UserModel.find(query).sort({College:1})
const count= users.length
if(!users)
return next (new Error ("NO USERS FOUND",{cause:404}))
return res.status(200).json({ status: httpStatusText.SUCCESS, data: { users,count } });


})



//طلاب بدون صور
const StudentsWhithoutImageReport = errorHandling.asyncHandler(async(req,res,next)=>{

  var { newStudent , oldStudent } = req.query;

var  query={
  role:"User",
  image: { $exists: false }
}

if(newStudent)
{
    query.newStudent = newStudent
}

if(oldStudent)
{
    query.oldStudent = oldStudent
}

for (const key in query) {
  if (query.hasOwnProperty(key)) {
      if (query[key] === undefined) {
          query[key] = false;
      }
  }

const users = await UserModel.find(query).select('studentName studentCode nationalID PassportNumber College').sort({ studentName: 1 })

return res.status(200).json({ status: httpStatusText.SUCCESS, data: { users } });


}});



// تقرير الرسوم انثى

const feesReportFemales= errorHandling.asyncHandler(async(req,res,next)=>{

const {ofYear}= req.query
var query={
  gender:{ $in: ["انثي", "أنثي", "انثى", "أنثى"] } 
,isHousingFeePaied:true}

if (ofYear) {
  query.ofYear = ofYear;
}
  // Loop over each key-value pair in the query object
  for (const key in query) {
    if (query.hasOwnProperty(key)) {
        // If the value is undefined, set it to false
        if (
          query[key] == "false" ||
          query[key] === "undefined"||
          query[key] == false ||
          query[key] == undefined
        ) {
          delete query[key];
        }
    }
}
console.log('====================================');
console.log(query);
console.log('====================================');
const students= await UserModel.find(query).sort({College:1});
if(!students)
{
  return next (new Error ("NO USERS FOUND",{cause:404}))
}



return res.status(200).json({ status: httpStatusText.SUCCESS, data: { students } });

}); 

// تقرير الرسوم ذكر

const feesReportMales= errorHandling.asyncHandler(async(req,res,next)=>{

const {ofYear}= req.query
var query={
  gender:"ذكر"
,isHousingFeePaied:true}

if (ofYear) {
  query.ofYear = ofYear;
}
  // Loop over each key-value pair in the query object
  for (const key in query) {
    if (query.hasOwnProperty(key)) {
        // If the value is undefined, set it to false
        if (
          query[key] == "false" ||
          query[key] === "undefined"||
          query[key] == false ||
          query[key] == undefined
        ) {
          delete query[key];
        }
    }
}
console.log('====================================');
console.log(query);
console.log('====================================');
const students= await UserModel.find(query).sort({College:1});
if(!students)
{
  return next (new Error ("NO USERS FOUND",{cause:404}))
}



return res.status(200).json({ status: httpStatusText.SUCCESS, data: { students } });

}); 


//امر التسكين للذكر

const residenceOrderMale= errorHandling.asyncHandler(async(req,res,next)=>{

const {ofYear}= req.query
const query = {
  gender:"ذكر",
  isHoused:true
}
if(ofYear){
  query.ofYear = ofYear;
}
 // Loop over each key-value pair in the query object
 for (const key in query) {
  if (query.hasOwnProperty(key)) {
      // If the value is undefined, set it to false
      if (
        query[key] == "false" ||
        query[key] === "undefined"||
        query[key] == false ||
        query[key] == undefined
      ) {
        delete query[key];
      }
  }
}
console.log('====================================');
console.log(query);
console.log('====================================');
const students= await UserModel.find(query).sort({College:1})
console.log(students.length);

if(!students)
return next (new Error ("NO USERS FOUND",{cause:404}))

return res.status(200).json({ status: httpStatusText.SUCCESS, data: { students } });




});
//امر التسكين للانثي
const residenceOrderFemale= errorHandling.asyncHandler(async(req,res,next)=>{

  const {ofYear}= req.query
  const query = {
    gender:{ $in: ["انثي", "أنثي", "انثى", "أنثى"] } ,
    isHoused:true
  }
  if(ofYear){
    query.ofYear = ofYear;
  }
   // Loop over each key-value pair in the query object
   for (const key in query) {
    if (query.hasOwnProperty(key)) {
        // If the value is undefined, set it to false
        if (
          query[key] == "false" ||
          query[key] === "undefined"||
          query[key] == false ||
          query[key] == undefined
        ) {
          delete query[key];
        }
    }
  }
  console.log('====================================');
  console.log(query);
  console.log('====================================');
  const students= await UserModel.find(query).sort({College:1})
  console.log(students.length);
  
  if(!students)
  return next (new Error ("NO USERS FOUND",{cause:404}))
  
  return res.status(200).json({ status: httpStatusText.SUCCESS, data: { students } });
  
  
  
  
  });
  

const printResidenceOrder = errorHandling.asyncHandler(async (req, res, next) => {
  const {ofYear}= req.query
  const { nationalID } = req.body;
  var query ={
    ofYear: ofYear,
    nationalID:nationalID,

  }
  let students = [];

  await Promise.all(
    nationalID.map(async (nationalID) => {
      const student = await UserModel.find(query);
      students.push("يتم تسكين الطالب: "+student[0].studentName+
      ", فى مبنى: "+student[0].buildingName +
      ", فى غرفة رقم: "+student[0].roomName);
      // console.log(student[0].studentName);
    })
  );

  return res.status(200).json({ status: httpStatusText.SUCCESS, data: students });
});

 module.exports = 
 {studentListsMales,studentListsFemales,
  AbsenceAndPermissionsReport,
  transferredMaleStudents,transferredFemaleStudents,
  expulsionStudentsMale,expulsionStudentsFemale,
  penaltiesReport,
  printedMalesCardsReport,printedFemalesCardsReport,
  socialResearchcasesReportMale,socialResearchcasesReportFemale,
  printResidenceOrder, 
  residenceOrderMale,residenceOrderFemale,
  StudentsWhithoutImageReport,
  feesReportMales,feesReportFemales}


        

 


