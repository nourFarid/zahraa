const UserModel = require('../../../../DB/model/User.model.js');
const errorHandling = require ('../../../utils/errorHandling.js')
const httpStatusText = require('../../../utils/httpStatusText.js')

const getStudentByNationalId = errorHandling.asyncHandler( async(req,res,next)=>{
  const student = await UserModel.findOne({ nationalID: req.params.nationalID }, { "__v": false , "penalty" : false  , "expulsionStudent" : false,
  "isHoused" : false , "housingDate":false,"buildingId" : false , "floorId":false , "roomId":false , "role":false,
  "active":false , "confirmEmail":false, "blocked":false ,"gradeOfLastYear":false , "gradePercentage":false , "housingInLastYears":false,
  "HousingType":false , "HousingWithoutFood":false , "password" : false , "policy":false , "egyptions":false,"expartriates":false , "oldStudent":false,
  "newStudent":false , "placeOfBirth":false , "birthDate":false ,"studentCode":false,"email":false , "detailedAddress":false,
"religion":false , "fatherNationalId":false , "fatherName":false , "phoneNumber":false , "landLinePhone":false,"updatedAt":false,
"createdAt":false , "ofYear":false , "gender":false , "fatherJop":false , "fatherPhone":false  , "_id":false});


  if(!student){
     return res.status(404).json({status : httpStatusText.FAIL , data : {data : "no student found with that ID"}});
}
  return res.status(200).json({status : httpStatusText.SUCCESS , data : {student}})
})

const updateNationalID = errorHandling.asyncHandler(async (req, res, next) => {
  const { newNationalID } = req.body; // Assuming the new national ID is provided in the request body

  const student = await UserModel.findOneAndUpdate(
      { nationalID: req.params.nationalID },
      { nationalID: newNationalID }, // Specify the new value for nationalID
      { new: true  ,fields: {"__v": false , "penalty" : false  , "expulsionStudent" : false,
      "isHoused" : false , "housingDate":false,"buildingId" : false , "floorId":false , "roomId":false , "role":false,
      "active":false , "confirmEmail":false, "blocked":false ,"gradeOfLastYear":false , "gradePercentage":false , "housingInLastYears":false,
      "HousingType":false , "HousingWithoutFood":false , "password" : false , "policy":false , "egyptions":false,"expartriates":false , "oldStudent":false,
      "newStudent":false , "placeOfBirth":false , "birthDate":false ,"studentCode":false,"email":false , "detailedAddress":false,
    "religion":false , "fatherNationalId":false , "fatherName":false , "phoneNumber":false , "landLinePhone":false,"updatedAt":false,
    "createdAt":false , "ofYear":false , "gender":false , "fatherJop":false , "fatherPhone":false  , "_id":false } } )

  if (!student) {
    return res.status(404).json({status : httpStatusText.FAIL , data : {data : "no student found with that ID"}});
  }

  return res.status(200).json({ status: httpStatusText.SUCCESS, data: { student } });
});



 module.exports = {getStudentByNationalId , updateNationalID}

        