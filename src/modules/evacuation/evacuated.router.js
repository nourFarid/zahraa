const express = require ('express')
const router = express.Router()
const evacuatedController = require('./controller/evacuation.js')
const auth = require('../../middleware/auth.js')

router.put('/:studentId',
//    auth.auth([auth.roles.admin]),
  evacuatedController.evacuateStudent)

router.get('/',
//    auth.auth([auth.roles.admin]),
  evacuatedController.getAllHousedStudents)


router.put('/',
//    auth.auth([auth.roles.admin]),
  evacuatedController.evacuateAllStudents)




module.exports = router