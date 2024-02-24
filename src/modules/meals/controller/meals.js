const mealsModel = require('../../../../DB/model/meals/mealsModel.js')
const mealsModelBlocked = require('../../../../DB/model/BlockMeals/Meals.js')

const userModel = require('../../../../DB/model/User.model.js')
const errorHandling = require ('../../../utils/errorHandling.js')
const httpStatusText = require('../../../utils/httpStatusText.js')

//add 
const addMeals = errorHandling.asyncHandler(async(req, res, next) => {
    const {
        mealsName, mealsKind, mealStartTime, mealEndTime, RamadanMeal,
        mealReligion, studentReligion, mealAfterSubsidy, mealBeforeSubsidy, editAndAdd, createdAt,isPrepared,
        // dateTo, dateFrom, academicYear, day,
    } = req.body;

    // const { studentId } = req.params;
    // const student = await userModel.findById(studentId);

    // if (!student) {
    //     return next(new Error(`Invalid student Id`, { cause: 400 }));
    // }

    // const { studentName, religion } = student;

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
        isPrepared,
        // dateTo, dateFrom, academicYear, day
        // createdBy: userId,
    });

    return res.status(201).json({ status: httpStatusText.SUCCESS, data: { meals } });
});

//تجهيز الوجبات 
// const MealPreparation =  errorHandling.asyncHandler(async(req, res, next) => {

//     const {meal,day,AcademicYear}= req.body
//     const meals = await mealsModel.find({})
//     const{isPrepared}=meals
//         // Validate if the required fields are present
//         if (!meal || !day || !AcademicYear) {
//             return res.status(400).json({ status: 'error', message: 'Missing required fields' });
//           }
//           const mealsArray = [];
//           if (isPrepared==true){
//                 // Assuming mealsArray is an array where you want to store the meal information
//                 mealsArray.push({ meal, day, AcademicYear });
//                 return res.status(201).json({
//                     status: 'success',
//                     data: { MealPreparation: mealsArray },
//                   });    
//           }
         
//           return res.status(201).json({message:"sorry no meals prepared" })
//           });
       


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

    