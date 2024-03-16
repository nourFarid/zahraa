const express = require ('express')
const router = express.Router()
const housingController = require('./controller/housing')
//const auth = require('../../middleware/auth.js')

router.put('/',
  //  auth.auth([auth.roles.admin]),
     housingController.houseStudents)

router.put('/update/male/:userId',
  //  auth.auth([auth.roles.admin]),
    housingController.updateHousedMale)

    router.put('/update/female/:userId',
    //  auth.auth([auth.roles.admin]),
      housingController.updateHousedFemale)

router.get('/female',housingController.getStudentFemale)

router.get('/male',housingController.getStudentMale)

router.get('/housingOrderMale/:studentId',housingController.housingOrderMale)

router.get('/housingOrderFemale/:studentId',housingController.housingOrderFemale)


module.exports = router



module.exports = router