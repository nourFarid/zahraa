const express = require ('express')
const router = express.Router()
const pentaly = require('./controller/penatly.js')
// const auth = require('../../middleware/auth.js')

router.post('/female/:studentId',
    // auth.auth([auth.roles.admin]),
    pentaly.penaltyFemale)


    router.post('/male/:studentId',
    // auth.auth([auth.roles.admin]),
    pentaly.penaltyMale)

    router.post('/:studentId',
    // auth.auth([auth.roles.admin]),
    pentaly.cancel)
    

    router.post('/',
    // auth.auth([auth.roles.admin]),
    pentaly.penaltyForMultipleStudents)

    router.get('/:studentId',
    // auth.auth([auth.roles.admin]),
    pentaly.getPenalty)
  
module.exports = router