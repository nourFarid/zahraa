const httpStatusText = require('../../../utils/httpStatusText.js');
const errorHandling = require('../../../utils/errorHandling.js');
const BlockMealsModel = require('../../../../DB/model/BlockMeals/Meals.js');
const userModel = require('../../../../DB/model/User.model.js');
const feesModel = require('../../../../DB/model/fees/feesForStudents.js');

//حجب الوجبات
const blockedMeals = errorHandling.asyncHandler(async (req, res, next) => {
  const { dateFrom, dateTo, reason, meals ,day, academicYear} = req.body;
  const { studentId } = req.params;

  const student = await userModel.findById(studentId);

  const feePayment = await feesModel.find({id:studentId});

  const {PaymentValueNumber}=feePayment[0]

  if (!student) {
    return next(new Error(`In-valid student Id`, { cause: 400 }));
  }

  const {studentName} = student
  const studentMeals = await BlockMealsModel.find({studentId:studentId})
  if (meals === "عشاء" || meals === "غداء" ) {

    if (!feePayment) {
      return next (new Error (`No fee Payment found`,{cause:404}))
    }
  if(studentMeals.length === 0){
    if (!PaymentValueNumber) {
      return res.status(200).json({status : httpStatusText.SUCCESS , message:`meals has been blocked successfully`})
    }
    // Create meals if all conditions are met
    const mealsEntry = await BlockMealsModel.create({
      studentId: studentId,
      studentName: studentName,
      dateFrom,
      dateTo,
      reason,
      meals,
      hasBlocked:true
      ,day
      ,academicYear
    });
    return res.status(201).json({ status: httpStatusText.SUCCESS,data : {mealsEntry }})
  }
    else{

      if (!studentMeals.hasBlocked) {
        const mealsEntry = await BlockMealsModel.findOneAndUpdate(
          { studentId: studentId },
          {
            $set: {
              dateFrom,
              dateTo,
              meals,
              reason,
              hasBlocked: true,
              day,academicYear
            }
          },
          { upsert: true, new: true }
        );
        return res.status(201).json({ status: httpStatusText.SUCCESS , data :{mealsEntry}})
    }
  
}}});


const cancel = errorHandling.asyncHandler(async(req,res,next)=>{
  const {studentId} = req.params
  const user = await userModel.findById(studentId)
  if(!user){
   return next (new Error (`In-valid student Id `,{cause:400}))
 }

 const meal = await BlockMealsModel.findOne({ StudentId: studentId });

 if(meal && meal.hasBlocked === true){
 await BlockMealsModel.updateOne(
    { _id: meal._id },
    { $set: { hasBlocked: false } }
  )} else{
    return next (new Error (`Already Unblocked `,{cause:400}))
  }
  return res.status(200).json({status : httpStatusText.SUCCESS , message:`unblocked done`})
 })

 const getBlockedMeals = errorHandling.asyncHandler(async (req, res, next) => {
  const { studentId } = req.params;

  const student = await BlockMealsModel.find({studentId}).select('dateFrom dateTo meals')

  if (!student) {
    return next(new Error(`No student found with that ID`, { cause: 400 }));
  }
    // If the student is not housed, return the success message
    return res.status(200).json({ status: httpStatusText.SUCCESS, data: student });
  });


const depriveStudentOfMeals = errorHandling.asyncHandler(async (req, res, next) => { 
  const { dateTo, dateFrom, meals, ofYear } = req.query;

  const query = {
    hasBlocked: true,
    meals,
  };

  if (dateTo) {
    query.dateTo = dateTo;
  }

  if (meals) {
    query.meals = meals;
  }

  if (dateFrom) {
    query.dateFrom = dateFrom;
  }

  // Assuming 'ofYear' is a field in the 'UserModel'
  if (ofYear) {
    query.ofYear = ofYear;
  }

  const users = await BlockMealsModel.find(query);

  console.log('====================================');
  console.log(query);
  console.log('====================================');

  return res.status(200).json({ status: httpStatusText.SUCCESS, data: { users } });
});



module.exports = { blockedMeals ,cancel,depriveStudentOfMeals,getBlockedMeals};
