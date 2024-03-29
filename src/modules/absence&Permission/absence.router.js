const express = require ('express')
const router = express.Router()
const absenceController = require ("./controller/absence.js")
const auth = require('../../middleware/auth.js')

router.post('/:studentId',
  //auth.auth([auth.roles.admin]),
  absenceController.absencePermissions)

router.post('/',
  //auth.auth([auth.roles.admin]),
  absenceController.allAbsencePermissions)

router.get('/:StudentId',
  // auth.auth([auth.roles.admin]),
  absenceController.getPermissions)

  // router.get('/users', absenceController.ooooo)
module.exports = router