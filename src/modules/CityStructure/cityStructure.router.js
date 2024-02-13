const express = require ('express')
const router = express.Router()
const cityController = require('./controller/cityStructure')
//const auth = require('../../middleware/auth.js')


router.get('/', cityController.getCityStructure)

//حالة الغرف
router.get('/status', cityController.RoomsStatus)



module.exports = router
