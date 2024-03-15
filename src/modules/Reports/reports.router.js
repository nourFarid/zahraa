const express = require ('express')
const router = express.Router()
const reports = require ("./controller/reports.js")
const auth = require('../../middleware/auth.js')


router.get('/studentListsMales',reports.studentListsMales)
router.get('/studentListsFemales',reports.studentListsFemales)


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
  router.get("/socialResearchcasesReportfemale",reports.socialResearchcasesReportFemale)

  router.get("/transferredMaleStudents",reports.transferredMaleStudents)
  router.get("/transferredFemaleStudents",reports.transferredFemaleStudents)

  router.get("/expulsionStudentsMale",reports.expulsionStudentsMale)
  router.get("/expulsionStudentsFemale",reports.expulsionStudentsFemale)

  router.get("/feesReportMales",reports.feesReportMales)
  router.get("/feesReportFemales",reports.feesReportFemales)

  router.get("/residenceOrderMale",reports.residenceOrderMale)
  router.get("/residenceOrderFemale",reports.residenceOrderFemale)

  router.get("/printResidenceOrder",reports.printResidenceOrder)




  module.exports = router




  
