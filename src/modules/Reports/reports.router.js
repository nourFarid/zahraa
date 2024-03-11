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

  router.get('/noImage',
  // auth.auth([auth.roles.admin]),
  reports.StudentsWhithoutImageReport)


  router.get("/printedMalesCardsReport",reports.printedMalesCardsReport)

  router.get("/printedFemalesCardsReport",reports.printedFemalesCardsReport)


  router.get("/socialResearchcasesReportMale",reports.socialResearchcasesReportMale)
  router.get("/socialResearchcasesReportfemale",reports.socialResearchcasesReportfemale)

  router.get("/transferredStudents",reports.transferredStudents)
  router.get("/expulsionStudentsMale",reports.expulsionStudentsMale)
  router.get("/expulsionStudentsFemale",reports.expulsionStudentsFemale)




  module.exports = router




  
