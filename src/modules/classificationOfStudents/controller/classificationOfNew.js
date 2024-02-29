const User = require("../../../../DB/model/User.model.js");
const errorHandling = require("../../../utils/errorHandling.js");
const httpStatusText = require("../../../utils/httpStatusText.js");
const {
  getCoordinatesAndCalculateDistance,
} = require("../../../utils/getCoordinates.js");

const classifyNewEgyptionMaleStudents = errorHandling.asyncHandler(
  async (req, res, next) => {
    const {ofYear}= req.query
    const query={
      egyptions:true,
      newStudents:true, 
      gender:"ذكر",
      ofYear, statusOfOnlineRequests:"accepted",
      waitingForClassification:true,
      HousingType:"سكن عادى"


    }
    const students = await User.find(query).sort({HighSchoolGrade:-1});
    if(!students)
    return res.status(404).json({status : httpStatusText.FAIL , data : {msg : "NO STUDENTS"}});

return res
      .status(201)
      .json({ status: httpStatusText.SUCCESS, data: { students } });
  }
);

const classifyNewEgyptionSpecialHousingMaleStudents = errorHandling.asyncHandler(
  async (req, res, next) => {
    const {ofYear}= req.query
    const query={
      egyptions:true,
      newStudents:true, 
      gender:"ذكر",
      ofYear, statusOfOnlineRequests:"accepted",
      waitingForClassification:true,
      HousingType:"سكن مميز فردى طلبة"


    }
    const students = await User.find(query).sort({HighSchoolGrade:-1});
    if(!students)
    return res.status(404).json({status : httpStatusText.FAIL , data : {msg : "NO STUDENTS"}});

return res
      .status(201)
      .json({ status: httpStatusText.SUCCESS, data: { students } });
  }
);
const classifyNewEgyptionFemaleStudents = errorHandling.asyncHandler(
  async (req, res, next) => {
    const {ofYear}= req.query
    const query={
      egyptions:true,
      newStudents:true, 
      gender: { $in: ["انثي", "أنثي", "انثى", "أنثى"] } ,
      ofYear, statusOfOnlineRequests:"accepted",
      waitingForClassification:true,
      HousingType:"سكن عادى"


    }
    const students = await User.find(query).sort({HighSchoolGrade:-1});
    if(!students)
    return res.status(404).json({status : httpStatusText.FAIL , data : {msg : "NO STUDENTS"}});

return res
      .status(201)
      .json({ status: httpStatusText.SUCCESS, data: { students } });
  }
);
const classifyNewEgyptionSpecialHousingFemaleStudents = errorHandling.asyncHandler(
  async (req, res, next) => {
    const {ofYear}= req.query
    const query={
      egyptions:true,
      newStudents:true, 
      gender: { $in: ["انثي", "أنثي", "انثى", "أنثى"] } ,
      ofYear, statusOfOnlineRequests:"accepted",
      waitingForClassification:true,
      HousingType:"سكن مميز فردى طالبات"


    }
    const students = await User.find(query).sort({HighSchoolGrade:-1});
    if(!students)
    return res.status(404).json({status : httpStatusText.FAIL , data : {msg : "NO STUDENTS"}});

return res
      .status(201)
      .json({ status: httpStatusText.SUCCESS, data: { students } });
  }
);






module.exports = { classifyNewEgyptionMaleStudents,classifyNewEgyptionFemaleStudents, classifyNewEgyptionSpecialHousingMaleStudents,classifyNewEgyptionSpecialHousingFemaleStudents };
