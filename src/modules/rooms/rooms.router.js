const express = require ('express')
const router = express.Router()
const roomController = require('./controller/rooms.js')
const auth = require('../../middleware/auth.js')

router.post('/',
    auth.auth([auth.roles.admin]),
     roomController.addRoom)

router.get('/',
  auth.auth([auth.roles.admin]),
  roomController.getAllRooms)

router.get('/:roomId',
  auth.auth([auth.roles.admin])
, roomController.getRoom)

router.put('/:roomId', 
  auth.auth([auth.roles.admin]),
  roomController.updateRoom)

 router.delete('/:roomId', 
    auth.auth([auth.roles.admin]),
    roomController.deleteRoom)


module.exports = router