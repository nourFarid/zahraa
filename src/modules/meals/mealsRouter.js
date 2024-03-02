const express = require ('express')
const router = express.Router()
const meals = require('./controller/meals.js')
// const auth = require('../../middleware/auth.js')

router.post('/',
    // auth.auth([auth.roles.admin]),
    meals.addMeals)


    // router.post('/mealsPreparation',
    // // auth.auth([auth.roles.admin]),
    // meals.MealPreparation)

    router.get('/',meals.getAllMeals);

    router.get('/:mealId', meals.getOneMeal);


    
router.put('/:MealsId', 
//  auth.auth([auth.roles.admin]),
   meals.updateMeals)

module.exports = router