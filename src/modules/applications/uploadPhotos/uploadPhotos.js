const errorHandling = require('../../../utils/errorHandling.js');
const httpStatusText = require('../../../utils/httpStatusText.js');
const User = require('../../../../DB/model/User.model.js');
const fs = require('fs');
const path = require('path');
//const AdmZip = require('adm-zip');
//const unrar = require('node-unrar');

// const uploadStudentPhoto= errorHandling.asyncHandler(async(req,res,next)=>{

//     if (req.file) {
       
       
        
//         const { originalname, path, mimetype } = req.file;
    
//         const buffer = fs.readFileSync(path);
// const nationalID= originalname.split('.')[0];


// const studentWithOutPhoto= await User.findOneAndUpdate(
//   {nationalID:nationalID},
//   { $set: { image:originalname } },
//   { new: true } 
// )

      
//         return res.status(201).json({status: httpStatusText.SUCCESS, data: { studentWithOutPhoto } });
//     } 
//       return res.status(404).json({ status: httpStatusText.FAIL, message: 'No file provided' });
    


// })


const uploadStudentPhoto = errorHandling.asyncHandler(async (req, res, next) => {
  if (req.files && req.files.length > 0) {
    const uploadedPhotos = [];

    for (const file of req.files) {
      const { originalname, path } = file;
      const buffer = fs.readFileSync(path);
      const nationalID = originalname.split('.')[0];

      const studentWithOutPhoto = await User.findOneAndUpdate(
        { nationalID: nationalID },
        { $set: { image: originalname } },
        { new: true }
      );

      uploadedPhotos.push({ nationalID, originalname });
    }

    return res.status(201).json({ status: httpStatusText.SUCCESS, data: { uploadedPhotos } });
  }

  return res.status(404).json({ status: httpStatusText.FAIL, message: 'No files provided' });
});



module.exports = { uploadStudentPhoto };
