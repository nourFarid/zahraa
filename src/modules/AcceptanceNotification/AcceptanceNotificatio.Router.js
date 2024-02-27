const express = require ('express')
const router = express.Router()
const AcceptanceNotificationController = require('./controller/AcceptanceNotification')
//const auth = require('../../middleware/auth.js')


router.get('/:studentId', AcceptanceNotificationController.AcceptanceNotification)



module.exports = router
