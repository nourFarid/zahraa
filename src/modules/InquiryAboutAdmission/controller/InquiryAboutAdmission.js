const User = require("../../../../DB/model/User.model.js");
const errorHandling = require("../../../utils/errorHandling.js");
const httpStatusText = require("../../../utils/httpStatusText.js");
const mongoose = require("mongoose");


//add Result for admin
const addResult = errorHandling.asyncHandler(async (req, res, next) => {
  try {
    const { nationalID } = req.params;
    const contextOfInquiry = req.body.contextOfInquiry;
    const result = await User.findOne({ nationalID });
    // if (result) {
    // res.status(200).json({ message: 'Admission inquiry successful', data: result });
    // } else {
    // res.status(404).json({ message: 'No admission record found for the provided national ID' });
    // }

    // const updatedUser = await User.findOneAndUpdate({NationalId}, {contextOfInquiry:contextOfInquiry}, { new: true });
    // const updatedUser = await User.findByIdAndUpdate(String(NationalId), {contextOfInquiry}, { new: true });
    const updatedUser = await User.findOneAndUpdate(
      { nationalID },
      { $set: { contextOfInquiry: contextOfInquiry } },
      { new: true }
    );

    if (updatedUser) {
      return res.status(200).json({ data: updatedUser });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//get getResultOfInquiry
const getResultOfInquiry = errorHandling.asyncHandler(
  async (req, res, next) => {
    try {
      const nationalID = req.params.nationalID;
      const inquiries = await User.find({ nationalID });

      if (!inquiries || inquiries.length === 0) {
        return res.json("No Results Found");
      }

      // Access the context property within the first inquiry (assuming it's an array)
      const context = inquiries[0].contextOfInquiry;

      return res
        .status(200)
        .json({ status: httpStatusText.SUCCESS, data: { context } });
    } catch (error) {
      // Handle errors here
      next(error);
    }
  }
);

module.exports = { addResult, getResultOfInquiry };

//update the field in database and give it the result
// const updateResult =errorHandling.asyncHandler(async(req,res,next)=>{

//     const userId = req.params.NationalId;

//     const contextOfInquiry = 'accept';

//     // Find the user by ID and update the "inquiry" field
//     const updatedUser = await user.findByIdAndUpdate(userId, { inquiry: contextOfInquiry }, { new: true });
//     if (!updatedUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     return res.json(updateResult);

// })

// const getResultOfInquiry = errorHandling.asyncHandler( async(req,res,next)=>{

//     NationalId=req.params.NationalId
//     const inquiries = await user.find({NationalId});
//     if(!inquiries){
//       return res.json("No Results Found")
//     }
//     return res.status(200).json({status : httpStatusText.SUCCESS , data :{...inquiries.contextOfInquiry} })
// })

// app.get('/get-inquiries', async (req, res) => {
//     try {
//       const inquiries = await Inquiry.find();
//       res.json(inquiries);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   });

// const addResult = errorHandling.asyncHandler(async(req,res,next)=>
//     {
//         const {NationalId} = req.params.NationalId
//         const {contextOfInquiry}=req.body
//         console.log({contextOfInquiry,NationalId});
//         const nationalIdObjectId =new mongoose.Types.ObjectId(NationalId);

//         const updatedUser = await User.findByIdAndUpdate({NationalId:nationalIdObjectId},{contextOfInquiry})
//         if(!updatedUser){
//           res.status(400).json({status: httpStatusText.ERROR , message : 'No updatedUser found with that ID'})
//         }
//         return res.status(200).json({status : httpStatusText.SUCCESS , data : {updatedUser}})

//     }
// )

// const addResult = errorHandling.asyncHandler(async (req, res, next) => {
//   try {
//     const ID = req.params.id;
//     const contextOfInquiry = req.body;
//    // const nationalIdObjectId = new mongoose.Types.ObjectId(NationalId);

//     // Use findByIdAndUpdate directly
//     const updatedUser = await User.replaceOne({_id:ID}, req.body, { new: true });

//     if (updatedUser) {
//       // Send the updated user in the response
//       return res.status(200).json({ data: updatedUser });
//     } else {
//       return res.status(404).json({ message: 'User not found' });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// });