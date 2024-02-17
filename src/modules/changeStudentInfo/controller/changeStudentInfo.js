const UserModel = require('../../../../DB/model/User.model.js');
const errorHandling = require ('../../../utils/errorHandling.js')
const httpStatusText = require('../../../utils/httpStatusText.js')
const bcrypt = require('bcrypt');


const getStudentByNationalId = errorHandling.asyncHandler( async(req,res,next)=>{
  const student = await UserModel.findOne({ nationalID: req.params.nationalID }, { "__v": false , "penalty" : false  , "expulsionStudent" : false,
  "isHoused" : false , "housingDate":false,"buildingId" : false , "floorId":false , "roomId":false , "role":false,
  "active":false , "confirmEmail":false, "blocked":false ,"gradeOfLastYear":false , "gradePercentage":false , "housingInLastYears":false,
  "HousingType":false , "HousingWithoutFood":false , "password" : false , "policy":false , "egyptions":false,"expartriates":false , "oldStudent":false,
  "newStudent":false , "placeOfBirth":false , "birthDate":false ,"email":false , "detailedAddress":false,
"religion":false , "fatherNationalId":false , "fatherName":false , "phoneNumber":false , "landLinePhone":false,"updatedAt":false,
"createdAt":false , "ofYear":false , "gender":false , "fatherJop":false , "fatherPhone":false  , "_id":false,"statusOfOnlineRequests":false , "isEvacuated":false});


  if(!student){
     return res.status(404).json({status : httpStatusText.FAIL , data : {data : "no student found with that ID"}});
}
  return res.status(200).json({status : httpStatusText.SUCCESS , data : {student}})
})

//تصحيح الرقم القومي للطالب
const correctNationalID = errorHandling.asyncHandler(async (req, res, next) => {
  const { newNationalID } = req.body; // Assuming the new national ID is provided in the request body

  const student = await UserModel.findOneAndUpdate(
      { nationalID: req.params.nationalID },
      { nationalID: newNationalID }, // Specify the new value for nationalID
      { new: true})
  if (!student) {
    return res.status(404).json({status : httpStatusText.FAIL , data : {data : "no student found with that ID"}});
  }

  const changedData = {
    nationalID: student.nationalID,
    studentCode: student.studentCode,
    studentName: student.studentName,
    residence: student.residence,
    College: student.College,
    year: student.year,
  };

  return res.status(200).json({ status: httpStatusText.SUCCESS, data: { changedData } });});;

//تغيير رقم الطالب
const updateStudentCode = errorHandling.asyncHandler(async (req, res, next) => {
  const { studentCode } = req.body;

  const student = await UserModel.findOneAndUpdate(
      { nationalID: req.params.nationalID },
      { studentCode: studentCode },
      { new: true} )

  if (!student) {
    return res.status(404).json({status : httpStatusText.FAIL , data : {data : "no student found with that ID"}});
  }

  const changedData = {
    nationalID: student.nationalID,
    studentCode: student.studentCode,
    studentName: student.studentName,
    residence: student.residence,
    College: student.College,
    year: student.year,
  };

  return res.status(200).json({ status: httpStatusText.SUCCESS, data: { changedData } });});

// تغيير اسم الطالب
const changeStudentName = errorHandling.asyncHandler(async (req, res, next) => {
  const { studentName } = req.body;

  const student = await UserModel.findOneAndUpdate(
      { nationalID: req.params.nationalID },
      { studentName: studentName },
      { new: true } )

  if (!student) {
    return res.status(404).json({status : httpStatusText.FAIL , data : {data : "no student found with that ID"}});
  }
        
  const changedData = {
    nationalID: student.nationalID,
    studentCode: student.studentCode,
    studentName: student.studentName,
    residence: student.residence,
    College: student.College,
    year: student.year,
  };

  return res.status(200).json({ status: httpStatusText.SUCCESS, data: { changedData } });
});

// change password
const changeStudentPassword = errorHandling.asyncHandler(async (req, res, next) => {
  const { newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res
      .status(400)
      .json({ message: "NewPassword and confirmPassword do not match" });
  }

  const student = await UserModel.findOne({ nationalID: req.params.nationalID });

  if (!student) {
    return res.status(404).json({ status: httpStatusText.FAIL, data: { data: "No sudent found with that ID" } });
  }

  // Hash the new password using bcrypt
  const hashedPassword = await bcrypt.hash(newPassword, 10); // Adjust the cost factor as needed

  // Update the user's password with the hashed password
  student.password = hashedPassword;

  await student.save();

  const responseData = {
    nationalID: student.nationalID,
    studentCode: student.studentCode,
    studentName: student.studentName,
    residence: student.residence,
    College: student.College,
    year: student.year,
    updatedAt: student.updatedAt,
  };

  return res.status(200).json({ status: httpStatusText.SUCCESS, message: "Password changed successfully", data: responseData });
});


module.exports = {
      getStudentByNationalId,
      correctNationalID,
      updateStudentCode ,
      changeStudentName, 
      changeStudentPassword
}

