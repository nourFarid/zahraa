const express = require ('express')
const router = express.Router()
const pentaly = require('./controller/penatly.js')
// const auth = require('../../middleware/auth.js')

router.post('/female/:studentId',
    // auth.auth([auth.roles.admin]),
    pentaly.pentalyFemale)


    router.post('/male/:studentId',
    // auth.auth([auth.roles.admin]),
    pentaly.pentalyMale)

    router.post('/:studentId',
    // auth.auth([auth.roles.admin]),
    pentaly.cancel)
module.exports = router