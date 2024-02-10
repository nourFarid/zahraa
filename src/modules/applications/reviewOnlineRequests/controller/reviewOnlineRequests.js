const errorHandling = require ('../../../../utils/errorHandling.js')
const httpStatusText = require('../../../../utils/httpStatusText.js')
const User = require('../../../../../DB/model/User.model.js')


const reviewOnlineRequests= errorHandling.asyncHandler(async(req, res, next) => {
    // Extract query parameter
    var { ofYear, egyptions, expartriates, normalHousing, specialHousing,
         oldStudent,newStudent, newApplications,
        rejectedApplications
        } = req.query;
    const housingTypes = [];
    var query = {};
  
    if (normalHousing === 'true') {
        housingTypes.push('عادى');
    }
  
    if (specialHousing === 'true') {
        housingTypes.push('سكن مميز فردى طلبة');
    }
    let statusOfOnlineRequests;

if (newApplications === 'true') {
    statusOfOnlineRequests = 'bending';
} 
if(rejectedApplications === 'true') {
    statusOfOnlineRequests = 'rejected';
}
  
    query = {
        ofYear,
        egyptions,
        expartriates,
        newStudent,
        oldStudent, 
       
        statusOfOnlineRequests,
        // rejectedApplications,
        gender:"ذكر"
    };
  
  

  
    if (housingTypes.length > 0) {
        query.HousingType = { $in: housingTypes };
    }
  
    // Loop over each key-value pair in the query object
    for (const key in query) {
        if (query.hasOwnProperty(key)) {
            // If the value is undefined, set it to false
            if (query[key] === undefined) {
                query[key] = false;
            }
        }
    }
  
    const users = await User.find(query);
    const count = users.length;
  
    console.log('====================================');
    console.log(query);
    console.log(count);
    console.log('====================================');
  
    return res.status(200).json({ status: httpStatusText.SUCCESS, data: { users,count } });
  
  });
  


const acceptOnlineRequests =errorHandling.asyncHandler(async(req, res,next)=>{

    const id = req.params.id
    const user = await User.findOneAndUpdate(
        { _id: id },
        { $set: { statusOfOnlineRequests: 'accepted' } },
        { new: true } 
    );
    if(!user){
      return next (new Error (`In-valid student Id `,{cause:400}))
    }
   
    return res.status(200).json({ status: httpStatusText.SUCCESS, data: { user } });
    

})
const rejectOnlineRequests =errorHandling.asyncHandler(async(req, res,next)=>{

    const id = req.params.id
    const user = await User.findOneAndUpdate(
        { _id: id },
        { $set: { statusOfOnlineRequests: 'rejected' } },
        { new: true } 
    );
    if(!user){
      return next (new Error (`In-valid student Id `,{cause:400}))
    }
   
    return res.status(200).json({ status: httpStatusText.SUCCESS, data: { user } });
    

})



module.exports={
    reviewOnlineRequests,
    acceptOnlineRequests,
    rejectOnlineRequests
}