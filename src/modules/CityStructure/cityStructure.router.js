const express = require ('express')
const router = express.Router()
const cityController = require('./controller/cityStructure')
//const auth = require('../../middleware/auth.js')


router.get('/', cityController.getCityStructure)



module.exports = router
