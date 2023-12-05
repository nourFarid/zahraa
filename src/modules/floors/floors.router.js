const express = require ('express')
const router = express.Router()
const floorController = require('./controller/floors.js')
const auth = require('../../middleware/auth.js')

router.post('/',
    auth.auth([auth.roles.admin]),
     floorController.addFloor)

router.get('/',
    auth.auth([auth.roles.admin])
    , floorController.getAllFloor)

router.get('/:floorId',
    auth.auth([auth.roles.admin])
    , floorController.getFloor)

router.put('/:floorId', 
    auth.auth([auth.roles.admin]),
    floorController.updateFloor)

 router.delete('/:floorId', 
    auth.auth([auth.roles.admin]),
    floorController.deleteFloor)


module.exports = router