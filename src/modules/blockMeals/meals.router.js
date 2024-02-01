const express = require ('express')
const router = express.Router()
const mealsController = require ("./controller/meals.js")
const auth = require('../../middleware/auth.js')

router.post('/:studentId',
  //auth.auth([auth.roles.admin]),
  mealsController.blockedMeals)

router.put('/:studentId',
  // auth.auth([auth.roles.admin]),
  mealsController.cancel)
module.exports = router