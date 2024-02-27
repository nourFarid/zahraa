const express = require ('express')
const router = express.Router()
const evacuatedController = require('./controller/evacuation.js')
const auth = require('../../middleware/auth.js')

router.put('/:studentId',
//    auth.auth([auth.roles.admin]),
evacuatedController.evacuateStudent)




module.exports = router