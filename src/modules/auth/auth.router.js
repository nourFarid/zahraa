const authController = require ("./controller/registration.js")
const express = require('express')
const router = express.Router()
const{getAdmins}= require('./controller/admin')
router.post('/signUp',authController.signUp)
router.post('/signUpAdmin',authController.signUpAdmin)
router.post('/signIn',authController.signIn)

router.get('/getAdmins',getAdmins)
module.exports = router