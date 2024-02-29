const errorHandling = require ('../../../utils/errorHandling.js')
const httpStatusText = require('../../../utils/httpStatusText.js')
const Logs= require("../../../../DB/model/logs.js")
const createLogs= errorHandling.asyncHandler(async(req,res,next,payload)=>{
    var log
    
   
        const {adminID,
            adminUserName,
            endDateOfEmployment,
            action,
            objectName
        }= req.body
     log= await Logs.create({
        adminID,
        adminUserName,
        endDateOfEmployment,
        action,
        objectName
    })
    console.log('====================================');
    console.log("in elseee");
    console.log('====================================');
   
 
 return  payload

})


const getLogs=errorHandling.asyncHandler(async(req, res, next,)=>{

const logs= await Logs.find()
if(!logs)
return next(new Error(`can not get logs`, { cause: 404 }));


return res.status(200).json({ status: httpStatusText.SUCCESS, data: { logs } });

})


module.exports = {
    createLogs,
    getLogs
}