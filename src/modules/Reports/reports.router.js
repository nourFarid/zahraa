const express = require ('express')
const router = express.Router()
const reports = require ("./controller/reports.js")
const auth = require('../../middleware/auth.js')


router.get('/list',
  // auth.auth([auth.roles.admin]),
  reports.studentLists)

  router.get('/absenceReport',
  // auth.auth([auth.roles.admin]),
  reports.AbsenceAndPermissionsReport)

  router.get('/penalty',
  // auth.auth([auth.roles.admin]),
  reports.penaltiesReport)

  router.get("/printedMalesCardsReport",reports.printedMalesCardsReport)

  router.get("/printedFemalesCardsReport",reports.printedFemalesCardsReport)

module.exports = router


