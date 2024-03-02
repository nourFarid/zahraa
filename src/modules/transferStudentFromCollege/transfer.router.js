const express = require ('express')
const router = express.Router()
const transfer = require('./controller/transfer.js')
// const auth = require('../../middleware/auth.js')

router.post('/:userId',
    // auth.auth([auth.roles.admin]),
    transfer.transferStudent)
    
module.exports = router