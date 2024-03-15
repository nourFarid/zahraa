const express = require ('express')
const router = express.Router()
const{getNumberOfAppliersMale,getNumberOfAppliersFemale,getNumberOfAllStudentsMale,getNumberOfPrintedCards,getNumberOfResidentsMale,getNumberOfResidentsFemale,getNumberOfAllStudentsFemale,NumberOfStudentsBasedOnHousingType,getNumberOfPrintedCardsForMales,getNumberOfPrintedCardsForFemales, MealPreparation
  , MealTakingStatisticsMale, MealTakingStatisticsFemale, numberOfReceivedMeals}= require("./controller/statistics")

 //اعداد المتقدمين
router.get('/getNumberOfAppliersMale',getNumberOfAppliersMale)
router.get('/getNumberOfAppliersFemale',getNumberOfAppliersFemale)

//اعداد المقيمين
router.get('/getNumberOfResidentsMale',getNumberOfResidentsMale)
router.get('/getNumberOfResidentsFemale',getNumberOfResidentsFemale)

// احصائيات البطاقات المطبوعة
router.get('/getNumberOfPrintedCardsForMales',getNumberOfPrintedCardsForMales)
router.get('/getNumberOfPrintedCardsForFemales',getNumberOfPrintedCardsForFemales)

//اعداد جميع الطلاب
router.get('/getNumberOfAllStudentsMale',getNumberOfAllStudentsMale)
router.get('/getNumberOfAllStudentsFemale',getNumberOfAllStudentsFemale)

//تجهيز الوجبات
router.get('/mealPreparation',MealPreparation)

//احصائيات استلام الوجبات
router.get('/MealTakingMale',MealTakingStatisticsMale)
router.get('/MealTakingFemale',MealTakingStatisticsFemale)

//عدد الوجبات المستلمة
router.get('/numberOfReceivedMeals',numberOfReceivedMeals)



//اعداد جميع الطلاب حسب نوع السكن
router.get('/allStudents',NumberOfStudentsBasedOnHousingType)


module.exports= router

getNumberOfPrintedCards