const userModel = require('../../../../DB/model/User.model.js')
const errorHandling = require ('../../../utils/errorHandling.js')
const httpStatusText = require('../../../utils/httpStatusText.js')
const transferStudent = errorHandling.asyncHandler(async (req, res, next) => {
    
      const { userId } = req.params;
      const { transferReason, newUniversityName, evictionReason } = req.body;
  
      // Assuming you have a userModel defined
      const user = await userModel.findById(userId);
  
      if (!user) {
        return next(new Error(`No user found with that ID`, { cause: 400 }));
      }
  
      // Check if the student is already transferred
      if (user.transferred) {
        return res.status(400).json({ status: httpStatusText.ERROR, message: 'Student is already transferred' });
      }
  
      // Update the user to mark them as transferred and change college and university names
      const updatedUser = await userModel.findByIdAndUpdate(
        userId,
        {
          $set: {
            transferred: true,
            transferReason: transferReason || 'No reason specified',
            // collegeName: newCollegeName || user.collegeName,
            universityName: newUniversityName || user.universityName,
            isEvacuated: true,
            evictionReason: evictionReason || 'Eviction reason not specified'
          }
        },
        { new: true, lean: true }
      );
  
      if (!updatedUser) {
        return next(new Error(`Error transferring student: Unable to update user`, { cause: 500 }));
      }
  
      return res.status(200).json({ status: httpStatusText.SUCCESS, data: { user: updatedUser } });
  });
  
  
  

module.exports = {transferStudent}
