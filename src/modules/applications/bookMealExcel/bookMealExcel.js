const errorHandling = require ('../../../utils/errorHandling.js')
const httpStatusText = require('../../../utils/httpStatusText.js')
const fs = require('fs');
const path = require('path');
const mealsModel= require("../../../../DB/model/meals/mealsModel.js");
const { log } = require('console');


const bookMealExcel= errorHandling.asyncHandler(async(req,res,next)=>{
    if (req.file) {
        const { originalname, path,  } = req.file;
        const buffer = fs.readFileSync(path);
        const{ofYear,ofWhichMeal,dateOfBookingMeals}=req.body
        console.log("________________________________________________");
        console.log(ofYear,ofWhichMeal,dateOfBookingMeals);
        console.log("________________________________________________");

        const xfile = new mealsModel({
            file: originalname,
            data: buffer,
            ofYear:ofYear,
            ofWhichMeal:ofWhichMeal,
            dateOfBookingMeals:dateOfBookingMeals,
        });
        console.log('====================================');
        console.log(buffer);
        console.log('====================================');
  
        await xfile.save();
        // fs.unlinkSync(path);
        return res.status(201).json({status: httpStatusText.SUCCESS, data: { xfile } });
    } 
      return res.status(404).json({ status: httpStatusText.FAIL, message: 'No file provided' });
    


})
   module.exports={bookMealExcel}












//    const uploadFile = async (req, res, next) => {
//     if (req.file) {
//         const { originalname, path } = req.file;
  
//         const buffer = fs.readFileSync(path);
//         const newPdf = new mealsModel({
//             file: originalname,
//             data: buffer,
//         });
  
//         await newPdf.save();
//         // fs.unlinkSync(path);
//         return res.status(201).json({status: httpStatusText.SUCCESS, data: { newPdf } });
//     } 
//       return res.status(404).json({ status: httpStatusText.FAIL, message: 'No file provided' });
    
//   };















