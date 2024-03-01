const errorHandling = require ('../../../utils/errorHandling.js')
const httpStatusText = require('../../../utils/httpStatusText.js')
const Logs= require("../../../../DB/model/logs.js")
const Admins= require("../../../../DB/model/admin")
const createLogs= errorHandling.asyncHandler(async(req,res,next,payload)=>{
    var log
    
   
        const {adminID,
            adminUserName,
            // endDateOfEmployment,
            action,
            objectName
        }= req.body
     log= await Logs.create({
        adminID,
        adminUserName,
        // endDateOfEmployment,
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


const increment= errorHandling.asyncHandler(async(req, res, next)=>{
    console.log('====================================');
    console.log("WE ARE IN INCREMENT");
    console.log('====================================');
const id =req.params.id
const type= req.body.type
console.log('====================================');
console.log(req.body);
console.log('====================================');
const admin = await Admins.findById(id)
var{getAction,addAction,updateAction}= admin
if(type=='get')
{getAction++
    const updatedAdmin= await Admins.findByIdAndUpdate(
        { _id: id },
        { $set: { getAction: getAction} },
        { new: true } 
    )
    return res.status(200).json({ status: httpStatusText.SUCCESS, data: { updatedAdmin } });}
  
else if(type=='add')
{addAction++
    const updatedAdmin= await Admins.findByIdAndUpdate(
        { _id: id },
        { $set: { addAction: addAction} },
        { new: true } 
    )
    return res.status(200).json({ status: httpStatusText.SUCCESS, data: { updatedAdmin } });
}

else if(type=='update')

{updateAction++
console.log('====================================');
console.log("in update");
console.log('====================================');
    const updatedAdmin= await Admins.findByIdAndUpdate(
        { _id: id },
        { $set: { updateAction: updateAction} },
        { new: true } 
    )
    return res.status(200).json({ status: httpStatusText.SUCCESS, data: { updatedAdmin } });}




})

const getAllActions= errorHandling.asyncHandler(async(req, res, next)=>{
const id= req.params.id;
const admin = await Admins.findById(id)
if(!admin)
return next(new Error(`NO ADMINS HERE`, { cause: 404 }));
const {getAction,addAction,updateAction}= admin
const totalActions = getAction+addAction+updateAction

return res.status(200).json({ status: httpStatusText.SUCCESS, data: {admin,totalActions } });






})
module.exports = {
    createLogs,
    getLogs,increment,getAllActions
}