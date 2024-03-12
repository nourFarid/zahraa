const express = require ('express')
const router = express.Router()
const{getNumberOfResidents,getNumberOfAllStudents,getNumberOfPrintedCards,getNumberOfAppliers,NumberOfStudentsBasedOnHousingType,getNumberOfPrintedCardsForMales,getNumberOfPrintedCardsForFemales, MealPreparation
  , MealTakingStatisticsMale, MealTakingStatisticsFemale, numberOfReceivedMeals}= require("./controller/statistics")
//اعداد المتقدمين

router.get('/getNumberOfappliers',getNumberOfAppliers)

//اعداد المقيمين
router.get('/getNumberOfResidents',getNumberOfResidents)

// احصائيات البطاقات المطبوعة للذكر
router.get('/getNumberOfPrintedCardsForMales',getNumberOfPrintedCardsForMales)

// احصائيات البطاقات المطبوعة للانثي
router.get('/getNumberOfPrintedCardsForFemales',getNumberOfPrintedCardsForFemales)





//اعداد جميع الطلاب
router.get('/getNumberOfAllStudents',getNumberOfAllStudents)

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