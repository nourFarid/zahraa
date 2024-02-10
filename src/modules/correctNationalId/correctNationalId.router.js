const express = require ('express')
const router = express.Router()
const studentController = require('./controller/correctNationalId.js')
const auth = require('../../middleware/auth.js')

router.get('/:nationalID',
//    auth.auth([auth.roles.admin]),
studentController.getStudentByNationalId)

router.put('/:nationalID', 
//    auth.auth([auth.roles.admin]),
studentController.updateNationalID)



module.exports = router