const express = require ('express')
const router = express.Router()
const expulsion = require('./controller/studentExpulsion.js')
// const auth = require('../../middleware/auth.js')

router.post('/female/:studentId',
    // auth.auth([auth.roles.admin]),
    expulsion.createExpulsionfemale)


router.post('/male/:studentId',
    // auth.auth([auth.roles.admin]),
    expulsion.createExpulsionMale)

router.post('/:studentId',
    // auth.auth([auth.roles.admin]),
    expulsion.cancel)

router.get('/',
  //    auth.auth([auth.roles.admin]),
    expulsion.getAllStudentsNotPaid)
    
    
router.put('/',
    //    auth.auth([auth.roles.admin]),
    expulsion.expulsionAllStudents)

      
module.exports = router