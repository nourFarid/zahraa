const errorHandling = require("../../../utils/errorHandling.js");
const httpStatusText = require("../../../utils/httpStatusText.js");
const User = require("../../../../DB/model/User.model.js");
const FeesForStudents = require("../../../../DB/model/fees/feesForStudents.js");
const FeeTypes = require("../../../../DB/model/fees/feeTypes.js");
const FeeOptions = require("../../../../DB/model/fees/feeOptions.js");
const { date } = require("joi");



const addFeesForStudents = errorHandling.asyncHandler(async (req, res, next) => {
  const { id, ...fee } = req.body;


  var feesForStudents
  const{kind}=fee
  if(kind=='رسوم اقامة')
  {
    
    const user = await User.findOneAndUpdate(

      {_id:id},
      {$set:{isHousingFeePaied:true}},
      {new:true}
    );
    if (!user) {
      return next(new Error(`User not found`, { cause: 400 }));
    }
    const { studentName } = user;
    
   feesForStudents = new FeesForStudents({
    ...fee,
    id,
    studentName: studentName,
  });

  await feesForStudents.save();
  return res
  .status(201)
  .json({ status: httpStatusText.SUCCESS, data: { feesForStudents } });

  }


  const user = await User.findById(id);
  if (!user) {
    return next(new Error(`User not found`, { cause: 400 }));
  }
  const { studentName } = user;

 feesForStudents = new FeesForStudents({
    ...fee,
    id,
    studentName: studentName,
  });

  await feesForStudents.save();
  return res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { feesForStudents } });
});




//---------------------------------------------------
//الاشراف على النظام
const addFeeType= errorHandling.asyncHandler(async (req, res, next) => {
 const feeType=req.body
 const addedFee=new FeeTypes(
  feeType
 )

 await addedFee.save();


  return res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { addedFee } });
});

const updateFeeType = errorHandling.asyncHandler(async (req, res, next) => {
  const id = req.params.id; 
  const updateData = req.body;

  
    const updatedFee = await FeeTypes.updateOne({ _id: id }, updateData);

    if (updatedFee.nModified === 0) {
      // If no documents were modified, it means the record with the given ID was not found
      return res.status(404).json({ status: httpStatusText.NOT_FOUND, message: 'FeeType not found.' });
    }

    return res.status(200).json({ status: httpStatusText.SUCCESS, data: {updateData}});
 
});


const getFeeType = errorHandling.asyncHandler(async (req, res, next) => {
  // const id = req.params.id; 

  
    const fees = await FeeTypes.find();

    if (!fees) {
      // If no documents were deleted, it means the record with the given ID was not found
      return res.status(404).json({ status: httpStatusText.NOT_FOUND, message: 'Fees not found.' });
    }

    return res.status(200).json({ status: httpStatusText.SUCCESS, data:{fees}});

});

const deleteFeeType = errorHandling.asyncHandler(async (req, res, next) => {
  const id = req.params.id; 

  
    const deletedFee = await FeeTypes.deleteOne({ _id: id });

    if (deletedFee.deletedCount === 0) {
      // If no documents were deleted, it means the record with the given ID was not found
      return res.status(404).json({ status: httpStatusText.NOT_FOUND, message: 'FeeType not found.' });
    }

    return res.status(200).json({ status: httpStatusText.SUCCESS, message: 'FeeType deleted successfully.' });

});

//اعدادات الرسوم

const addFeeOptions= errorHandling.asyncHandler(async (req, res, next) => {
  const feeOptions=req.body
  const addedFeeOptions=new FeeOptions(
    feeOptions
  )
 
  await addedFeeOptions.save();
 
 
   return res
     .status(201)
     .json({ status: httpStatusText.SUCCESS, data: { addedFeeOptions } });
 });


 const updateFeeOptions = errorHandling.asyncHandler(async (req, res, next) => {
  const id = req.params.id; 
  const updateData = req.body;

  
    const updatedFeeOptions = await FeeOptions.updateOne({ _id: id }, updateData);

    if (updatedFeeOptions.nModified === 0) {
      // If no documents were modified, it means the record with the given ID was not found
      return res.status(404).json({ status: httpStatusText.NOT_FOUND, message: 'FeeOptions not found.' });
    }

    return res.status(200).json({ status: httpStatusText.SUCCESS, data: {updateData}});
 
});

//بيان رسوم

const feeStatement = errorHandling.asyncHandler(async (req, res, next) => {
  const id = req.params.id; 
  const user = await User.findById(id);
  if (!user) {
    return next(new Error(`User not found`, { cause: 400 }));
  }

  const {studentName,nationalID,PassportNumber,College,year,detailedAddress,phoneNumber,HousingType}=user
  const userData = { studentName, nationalID, PassportNumber, College, year, detailedAddress, phoneNumber, };
 const fees = await  FeesForStudents.find({id:id})

 if (!fees) {
    return next(new Error(`fees not found`, { cause: 400 }));
  }
//   const {kind,paymentDate,PaymentValueNumber,paymentValue,payment}=fees
//   payDate=new Date(paymentDate)
// const parts = payDate.split('/');
// const jsDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
// const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(jsDate);
// console.log(formattedDate);
// feesData={kind,paymentDate,PaymentValueNumber,paymentValue,payment}
try {
  const feesData = fees.map(({ kind, paymentDate, PaymentValueNumber, paymentValue, payment }) => {
    const monthPayment= paymentDate
    const [day, month, year] = monthPayment.split('/'||'-');
    const payDate = new Date(`${year}-${month}-${day}`);
    
    if (isNaN(payDate.getTime())) {
      throw new Error(`Invalid date: ${monthPayment}`);
    }

    const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(payDate);
    
    return {
      kind,
      paymentDate,
      PaymentValueNumber,
      paymentValue,
      payment,monthPayment: formattedDate,
    };
  });

  return res.status(200).json({ status: httpStatusText.SUCCESS, data: { userData, feesData } });
} catch (error) {
  return next(new Error(`Error processing dates: ${error.message}`, { cause: 500 }));
}
return res.status(200).json({ status: httpStatusText.SUCCESS, data: {userData,feesData}});
 
});


module.exports = {
  addFeesForStudents,
  addFeeType,
  getFeeType,
  updateFeeType,
  deleteFeeType,
  addFeeOptions,
  updateFeeOptions,
  feeStatement
};
