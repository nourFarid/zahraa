const express = require ('express')
const router = express.Router()
const StructureController = require('./controller/cityStructure')
//const auth = require('../../middleware/auth.js')


router.get('/', StructureController.getCityStructure)

//حالة الغرف
router.get('/RoomsStatus', StructureController.RoomsStatus)

router.get('/univeristyStructure',
//    auth.auth([auth.roles.admin]),
     StructureController.universityStructure)



module.exports = router
