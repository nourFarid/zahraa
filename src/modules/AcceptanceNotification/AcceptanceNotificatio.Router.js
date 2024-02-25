const express = require ('express')
const router = express.Router()
const AcceptanceNotificationController = require('./controller/AcceptanceNotification')
//const auth = require('../../middleware/auth.js')


router.get('/', AcceptanceNotificationController.AcceptanceNotification)

router.get('/print', AcceptanceNotificationController.PrintAcceptanceNotification)


module.exports = router
