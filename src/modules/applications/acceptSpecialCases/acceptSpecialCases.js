const errorHandling = require ('../../../utils/errorHandling.js')
const httpStatusText = require('../../../utils/httpStatusText.js')
const User = require('../../../../DB/model/User.model.js')

const getRejectedStudents = errorHandling.asyncHandler(async(req,res,next)=>{
    const {ofYear}= req.query
    var query={
        role:"User",
        gender:"ذكر",
        statusOfOnlineRequests:"rejected"
    }
    if(ofYear)
    {
        query.ofYear=ofYear
    }
 // Loop over each key-value pair in the query object
for (const key in query) {
    if (query.hasOwnProperty(key)) {
        // If the value is 0, remove the key-value pair from the object
        if (query[key] == "false"|| query[key] ==="false"|| query[key] == false|| query[key] =="undefined") {
            delete query[key];
        }
    }
}

console.log('====================================');
console.log(query);
console.log('====================================');

const student = await User.find(query);
console.log('====================================');
console.log(student.length);
console.log('====================================');
if(!student||student.length==0)
return next (new Error (`NO USERS`,{cause:400}))
return res.status(200).json({ status: httpStatusText.SUCCESS, data: { student } });
})

const acceptRejectedStudents= errorHandling.asyncHandler(async(req,res,next)=>{
const id=req.params.id
const student= await User.findByIdAndUpdate(
    { _id: id },
    { $set: { statusOfOnlineRequests: 'accepted',waitingForClassification:true  } },
    { new: true } 
)
if(!student)
{
    return next (new Error (`no student found with that ID`,{cause:400}))
}
return res.status(200).json({ status: httpStatusText.SUCCESS, data: { student } });




})


module.exports = {getRejectedStudents,acceptRejectedStudents}
