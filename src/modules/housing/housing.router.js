const express = require ('express')
const router = express.Router()
const housingController = require('./controller/housing')
//const auth = require('../../middleware/auth.js')

router.put('/',
  //  auth.auth([auth.roles.admin]),
     housingController.updateStudent)

router.put('/update/male/:userId',
  //  auth.auth([auth.roles.admin]),
    housingController.updateHousedMale)

    router.put('/update/female/:userId',
    //  auth.auth([auth.roles.admin]),
      housingController.updateHousedFemale)

router.get('/female',housingController.getStudentFemale)
router.get('/male',housingController.getStudentMale)




module.exports = router



module.exports = router