const express = require ('express')
const router = express.Router()
const BuildingsController = require ("./controller/buildings.js")
const auth = require('../../middleware/auth.js')

router.post('/',
  auth.auth([auth.roles.admin]),
  BuildingsController.addBuilding)

router.get('/',
  auth.auth([auth.roles.admin]),
  BuildingsController.getAllBuilding)

router.get('/:BuildingID',
  auth.auth([auth.roles.admin]),
  BuildingsController.getBuilding)

router.put('/:BuildingID', 
  auth.auth([auth.roles.admin]),
  BuildingsController.updateBuilding)

router.delete('/:BuildingID', 
  auth.auth([auth.roles.admin]),
  BuildingsController.deleteBuilding)


module.exports = router