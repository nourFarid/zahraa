const express = require ('express')
const router = express.Router()
const changeStudentInfoController = require('./controller/changeStudentInfo.js')
const auth = require('../../middleware/auth.js')

router.get('/:nationalID',
//    auth.auth([auth.roles.admin]),
  changeStudentInfoController.getStudentByNationalId)

//تصحيح الرقم القومي
router.put('/:nationalID', 
//    auth.auth([auth.roles.admin]),
  changeStudentInfoController.correctNationalID)

//تغيير رقم الطالب
router.put('/code/:nationalID', 
  //    auth.auth([auth.roles.admin]),
  changeStudentInfoController.updateStudentCode)

// تغيير اسم الطالب
router.put('/name/:studentId', 
  //    auth.auth([auth.roles.admin]),
  changeStudentInfoController.changeStudentName)

router.put('/password/:nationalID', 
  //    auth.auth([auth.roles.admin]),
  changeStudentInfoController.changeStudentPassword)

router.put('/:housing/:userId',
  //  auth.auth([auth.roles.admin]),
     changeStudentInfoController.changeHousingType)

module.exports = router
        