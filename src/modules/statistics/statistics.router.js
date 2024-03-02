const express = require ('express')
const router = express.Router()
const{getNumberOfResidents,getNumberOfAllStudents,getNumberOfPrintedCards,getNumberOfAppliers,NumberOfStudentsBasedOnHousingType}= require("./controller/statistics")
//اعداد المتقدمين

router.get('/getNumberOfappliers',getNumberOfAppliers)

//اعداد المقيمين
router.get('/getNumberOfResidents',getNumberOfResidents)

//احصائيات البطاقات المطبوعة
router.get('/getNumberOfPrintedCards',getNumberOfPrintedCards)

//اعداد جميع الطلاب
router.get('/getNumberOfAllStudents',getNumberOfAllStudents)

//تجهيز الوجبات

//احصائيات استلام الوجبات

//اعداد جميع الطلاب حسب نوع السكن
router.get('/allStudents',NumberOfStudentsBasedOnHousingType)


module.exports= router

getNumberOfPrintedCards