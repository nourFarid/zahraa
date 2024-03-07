const mealsModel = require('../../../../DB/model/meals/mealsModel.js')
const errorHandling = require ('../../../utils/errorHandling.js')
const httpStatusText = require('../../../utils/httpStatusText.js')

//add 
const addMeals = errorHandling.asyncHandler(async(req, res, next) => {
    const {
        mealsName, mealsKind, mealStartTime, mealEndTime, RamadanMeal,
        mealReligion, studentReligion, mealAfterSubsidy, mealBeforeSubsidy, editAndAdd, createdAt,
    } = req.body;

    // Conditionally set mealsKind based on RamadanMeal
    let updatedMealsKind = mealsKind;
    if (RamadanMeal) {
        updatedMealsKind = 'breakfast Suhoor'; // Set to 'breakfast' if RamadanMeal is true
    }else{
        updatedMealsKind = 'breakfast lunch dinner';
    }

    //const userId = req.user._id
    const meals = await mealsModel.create({
        // studentName: studentName,
        // studentId,
        mealsName,
        mealsKind: updatedMealsKind,
        mealStartTime,
        mealEndTime,
        RamadanMeal,
        mealReligion,
        studentReligion,
        mealAfterSubsidy,
        mealBeforeSubsidy,
        editAndAdd,
        createdAt,
        // dateTo, dateFrom, academicYear, day
        // createdBy: userId,
    });

    return res.status(201).json({ status: httpStatusText.SUCCESS, data: { meals } });
});


const getAllMeals = errorHandling.asyncHandler(async (req, res, next) => {
    const allMeals = await mealsModel.find();

    return res.status(200).json({ status: 'success', data: { meals: allMeals } });
});

const getOneMeal = errorHandling.asyncHandler(async (req, res, next) => {
    const { mealId } = req.params;

    const meal = await mealsModel.findById(mealId);

    if (!meal) {
        return next(new Error(`Meal with ID ${mealId} not found`, { cause: 404 }));
    }

    return res.status(200).json({ status: 'success', data: { meal: meal } });
});

//update Meals
const updateMeals = errorHandling.asyncHandler(async(req,res,next)=>
    {
        const {MealsId} = req.params
        const {mealsName, mealsKind, mealStartTime, mealEndTime, RamadanMeal,
            mealReligion, studentReligion, mealAfterSubsidy, mealBeforeSubsidy, editAndAdd, createdAt}=req.body

        const meals = await mealsModel.findByIdAndUpdate({_id:MealsId},{mealsName, mealsKind, mealStartTime, mealEndTime, RamadanMeal,
            mealReligion, studentReligion, mealAfterSubsidy, mealBeforeSubsidy, editAndAdd, createdAt},{new:true})
        if(!meals){
          res.status(400).json({status: httpStatusText.ERROR , message : 'No meals found with that ID'})
        }
        return res.status(200).json({status : httpStatusText.SUCCESS , data : {meals}})

    }
)


module.exports = {addMeals,getAllMeals,getOneMeal,updateMeals}

    