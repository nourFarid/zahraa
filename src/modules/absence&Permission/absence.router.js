const express = require ('express')
const router = express.Router()
const absenceController = require ("./controller/absence.js")
const auth = require('../../middleware/auth.js')

router.post('/:studentId',
  //auth.auth([auth.roles.admin]),
  absenceController.absencePermissions)

router.get('/',
  // auth.auth([auth.roles.admin]),
  absenceController.getPermissions)
module.exports = router