const UserModel = require('../../../../DB/model/User.model.js');
const errorHandling = require ('../../../utils/errorHandling.js')
const httpStatusText = require('../../../utils/httpStatusText.js')
const bcrypt = require('bcrypt');


const getStudentByNationalId = errorHandling.asyncHandler( async(req,res,next)=>{
  const student = await UserModel.findOne({ nationalID: req.params.nationalID}, 'nationalID studentName studentCode College year residence')

  if(!student){
     return res.status(404).json({status : httpStatusText.FAIL , data : {data : "no student found with that ID"}});
}
  return res.status(200).json({status : httpStatusText.SUCCESS , data : {student}})
})

//تصحيح الرقم القومي للطالب
const correctNationalID = errorHandling.asyncHandler(async (req, res, next) => {
  const { ofYear, newNationalID } = req.body; // Assuming the new national ID is provided in the request body

  const student = await UserModel.findOneAndUpdate(
      { nationalID: req.params.nationalID, ofYear:ofYear},
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
    updatedAt: student.updatedAt,

  };

  return res.status(200).json({ status: httpStatusText.SUCCESS, data: { changedData } });});;

//تغيير رقم الطالب
const updateStudentCode = errorHandling.asyncHandler(async (req, res, next) => {
  const {ofYear, studentCode } = req.body;

  const student = await UserModel.findOneAndUpdate(
      { nationalID: req.params.nationalID, ofYear:ofYear },
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
    updatedAt: student.updatedAt,

  };

  return res.status(200).json({ status: httpStatusText.SUCCESS, data: { changedData } });});

// تغيير اسم الطالب
const changeStudentName = errorHandling.asyncHandler(async (req, res, next) => {
  const {ofYear, studentName } = req.body;

  const student = await UserModel.findOneAndUpdate(
      { nationalID: req.params.nationalID, ofYear:ofYear },
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
    updatedAt: student.updatedAt,

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


//تغيير نوع السكن
const changeHousingType = errorHandling.asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const { newHousingType } = req.body;

  const user = await UserModel.findById(userId);

  if (!user) {
    return next(new Error(`No user found with that ID`, { cause: 400 }));
  }

  const currentHousingType = user.HousingType;


  // Check if the current housing type is different from the new housing type
  if (currentHousingType !== newHousingType) {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $set: { HousingType: newHousingType, isHoused: true } },
      { new: true, lean: true }
    );

    if (!updatedUser) {
      return next(new Error(`No user found with that ID`, { cause: 400 }));
    }

    return res.status(200).json({ status: httpStatusText.SUCCESS, data: { user: updatedUser } });
  } else {
    // If the user is not housed, return the success message
    return res.status(200).json({ status: httpStatusText.SUCCESS, message: 'User is not housed. Additional logic for not housed.' });
  }});



module.exports = {
      getStudentByNationalId,
      correctNationalID,
      updateStudentCode ,
      changeStudentName, 
      changeStudentPassword,
      changeHousingType
}

