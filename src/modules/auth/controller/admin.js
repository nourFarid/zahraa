const AdminModel = require('../../../../DB/model/admin.js')
const errorHandling = require("../../../utils/errorHandling.js");
const httpStatusText = require("../../../utils/httpStatusText.js");
const getAdmins= errorHandling.asyncHandler(async(req,res,next)=>{

    const admins= await AdminModel.find()
    if(!admins)
    return next (new Error ("no admins found",{cause:404}))
    return res
    .status(200)
    .json({ status: httpStatusText.SUCCESS, data: { admins } });
})


const updateAdmin= errorHandling.asyncHandler(async(req,res,next)=>{
    const nationalID= req.params.nationalID;
    const updateData= req.body; 
    const admin= await AdminModel.findOneAndUpdate(
        {nationalID:nationalID},
        {$set:updateData},
        {new:true}
        )
        if(!admin)
        return next (new Error ("no admins found",{cause:404}))
        return res
    .status(200)
    .json({ status: httpStatusText.SUCCESS, data: { admin } });
        

})

const deleteAdmin= errorHandling.asyncHandler(async(req,res,next)=>{
    const nationalID= req.params.nationalID;
    const admin= await AdminModel.findOneAndDelete({ nationalID: nationalID})
        if(!admin)
        return next (new Error ("no admins found",{cause:404}))
        return res
    .status(200)
    .json({ status: httpStatusText.SUCCESS, data: { admin } });
        

})


module.exports ={
    getAdmins,
    updateAdmin,
    deleteAdmin
}