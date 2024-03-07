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
const studentLists = errorHandling.asyncHandler(async(req,res,next)=>{

    var { ofYear,College,year, egyptions,expartriates,muslim , christian,
         normalHousing, specialHousing,placeOfBirth,residence,withSpecialNeeds,
         nationality,residentsOfThePreviousYear} = req.query;

var years=[]

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
if (residence) {
  query.residence = residence;
}

if (placeOfBirth) {
  query.placeOfBirth = placeOfBirth;
}
if (year) {
  query.year = year;
}

  // Loop over each key-value pair in the query object
  for (const key in query) {
    if (query.hasOwnProperty(key)) {
        // If the value is undefined, set it to false
        if (query[key] === undefined) {
            query[key] = false;
        }
    }
    const selectFields = [
      'ofYear',
      'studentName',
      'studentCode',
      'nationalID',
      'placeOfBirth',
      'religion',
      'residence',
      'year',
      "College",
      'fatherName',
      'fatherNationalId',
      'fatherJop',
      'fatherPhone'
  ];
  const users = await UserModel.find(query).select(selectFields.join(' '));



console.log('====================================');
console.log(query);
console.log('====================================');

const responseData = { status: httpStatusText.SUCCESS, data: { users: users.map(user => ({ ...user.toObject(), residentsOfThePreviousYear: residentsOfThePreviousYear })) } };

return res.status(200).json({ status: httpStatusText.SUCCESS, data: { responseData } });


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
      if (query[key] === undefined) {
          query[key] = false;
      }
  }

const users = await absencesPermissionModel.find(query)



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
      if (query[key] === undefined) {
          query[key] = false;
      }
  }

const users = await penatlyModel.find(query)



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
          if (query[key] == "false"|| query[key] ==="false"|| query[key] == false|| query[key] =="undefined") {
              delete query[key];
          }
      }
  }
  console.log('====================================');
  console.log(query);
  console.log('====================================');

  const student = await UserModel.find(query);
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


 module.exports = {studentLists,AbsenceAndPermissionsReport,
  penaltiesReport,printedMalesCardsReport,printedFemalesCardsReport}

        



  