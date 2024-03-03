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
module.exports ={
    getAdmins
}