const errorHandling = require ('../../../utils/errorHandling.js')
const httpStatusText = require('../../../utils/httpStatusText.js')
const fs = require('fs');
const path = require('path');
const mealsModel= require("../../../../DB/model/meals/mealsModel.js");
const { log } = require('console');


const receiveMealExcel= errorHandling.asyncHandler(async(req,res,next)=>{
    if (req.file) {
        const { originalname, path,  } = req.file;
        const buffer = fs.readFileSync(path);
        const{ofYear,ofWhichMeal,dateOfReceivingMeals}=req.body
        console.log("________________________________________________");
        console.log(ofYear,ofWhichMeal,dateOfReceivingMeals);
        console.log("________________________________________________");

        const xfile = new mealsModel({
            file: originalname,
            data: buffer,
            ofYear:ofYear,
            ofWhichMeal:ofWhichMeal,
            dateOfReceivingMeals:dateOfReceivingMeals,
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
   module.exports={receiveMealExcel}

