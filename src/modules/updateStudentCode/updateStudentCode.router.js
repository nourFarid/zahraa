const express = require ('express')
const router = express.Router()
const studentController = require('./controller/updateStudentCode.js')
const auth = require('../../middleware/auth.js')

router.get('/:nationalID',
//    auth.auth([auth.roles.admin]),
studentController.getStudentByNationalId)

router.put('/:nationalID', 
//    auth.auth([auth.roles.admin]),
studentController.updateStudentCode)



module.exports = router