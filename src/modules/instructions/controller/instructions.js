const instructionsModel = require('../../../../DB/model/acceptanceInstructions.js')
const errorHandling = require ('../../../utils/errorHandling.js')
const httpStatusText = require('../../../utils/httpStatusText.js')
const fs = require('fs');

//add instructions
const addInstructions = errorHandling.asyncHandler(async(req,res,next)=>{
    const{contextOfInstructions}= req.body
    // const userId = req.user._id

    const instructions = await instructionsModel.create({
      //  createdBy:userId,
        contextOfInstructions
    })
    return res.status(201).json({status : httpStatusText.SUCCESS , data : {instructions}})
}
)

//get instructions
const getInstructions = errorHandling.asyncHandler( async(req,res,next)=>{
    const instructions = await instructionsModel.find({}, {"__v":false})
    if(!instructions){
      return res.status(404).json({status : httpStatusText.FAIL , data : {msg : "no instructions found! please try again later"}});
    }
    return res.status(200).json({status : httpStatusText.SUCCESS , data : {instructions}})
})

//update instructions
const updateInstructions = errorHandling.asyncHandler(async(req,res,next)=>
    {
        const {instructionsId} = req.params
        const {contextOfInstructions}=req.body
        console.log({contextOfInstructions,instructionsId});

        const instruction = await instructionsModel.findByIdAndUpdate({_id:instructionsId},{contextOfInstructions})
        if(!instruction){
          res.status(400).json({status: httpStatusText.ERROR , message : 'No instruction found with that ID'})
        }
        return res.status(200).json({status : httpStatusText.SUCCESS , data : {instruction}})

    }
)

//delete instructions
const deleteInstruction = errorHandling.asyncHandler(async(req,res,next)=>{
           
     const {instructionsId} = req.params

     const deleteInstructions = await instructionsModel.findOne({_id:instructionsId})
     if (!deleteInstructions) {
      return res.status(400).json({status: httpStatusText.ERROR , message : 'Instruction not found'})
       }
      
    await instructionsModel.deleteOne({_id: instructionsId})
    return res.status(200).json({status:httpStatusText.SUCCESS , message:'Instruction Deleted Successfully'})
})

//Upload file
const uploadFile = async (req, res, next) => {
  if (req.file) {
      const { originalname, path } = req.file;

      const buffer = fs.readFileSync(path);
      const newPdf = new instructionsModel({
          avatar: originalname,
          data: buffer,
      });

      await newPdf.save();
      // fs.unlinkSync(path);
      return res.status(201).json({status: httpStatusText.SUCCESS, data: { newPdf } });
  } 
    return res.status(404).json({ status: httpStatusText.FAIL, message: 'No file provided' });
  
};

//download file
const downloadFile = async (req, res, next) => {
  const fileId = req.params.id;
  const file = await instructionsModel.findById(fileId);

  if (!file) {
      return res.status(404).json({ status: httpStatusText.FAIL, message: 'File not found' });
    }

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=${file.avatar}`);

  res.send(file.data);
};

module.exports = {
  addInstructions , 
  deleteInstruction , 
  getInstructions,
  updateInstructions , 
  downloadFile,
  uploadFile
  }
        
    