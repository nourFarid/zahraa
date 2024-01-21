const httpStatusText = require('../../../utils/httpStatusText.js');
const errorHandling = require('../../../utils/errorHandling.js');
const mealsModel = require('../../../../DB/model/BlockMeals/Meals.js');
const userModel = require('../../../../DB/model/User.model.js');
const feesModel = require('../../../../DB/model/fees/feesForStudents.js');

const blockedMeals = errorHandling.asyncHandler(async (req, res, next) => {
  const { dateFrom, dateTo, reason, meals, id } = req.body;
  const { studentId } = req.params;

  const student = await userModel.findById(studentId);
  const feePayment = await feesModel.find({id:id});
  // console.log(feePayment.PaymentValueNumber);
  const {PaymentValueNumber}=feePayment[0]
  if (!student) {
    return next(new Error(`In-valid student Id`, { cause: 400 }));
  }
  const studentMeals = await mealsModel.find({StudentId:studentId})
  if (meals === "عشاء" || meals === "غداء" ) {
    if (!feePayment) {
      return next (new Error (`No fee Payment found`,{cause:404}))
    }
  if(studentMeals.length === 0){
    if (!PaymentValueNumber) {
      return res.status(200).json({status : httpStatusText.SUCCESS , message:`meals has been blocked successfully`})
    }
    // Create meals if all conditions are met
    const mealsEntry = await mealsModel.create({
      StudentId: studentId,
      dateFrom,
      dateTo,
      reason,
      meals,
      hasBlocked:true
    });
    return res.status(201).json({ status: httpStatusText.SUCCESS,data : {mealsEntry }})
  }
    else{

      if (!studentMeals.hasBlocked) {
        const mealsEntry = await mealsModel.findOneAndUpdate(
          { StudentId: studentId },
          {
            $set: {
              dateFrom,
              dateTo,
              meals,
              reason,
              hasBlocked: true
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

 const meal = await mealsModel.findOne({ StudentId: studentId });

 if(meal && meal.hasBlocked === true){
 await mealsModel.updateOne(
    { _id: meal._id },
    { $set: { hasBlocked: false } }
  )} else{
    return next (new Error (`Already Unblocked `,{cause:400}))
  }
  return res.status(200).json({status : httpStatusText.SUCCESS , message:`unblocked done`})
 })

module.exports = { blockedMeals ,cancel};
