const express = require ('express')
const router = express.Router()
const{getNumberOfResidents,getNumberOfAllStudents,getNumberOfAppliers}= require("./controller/statistics")
//اعداد المتقدمين

router.get('/getNumberOfappliers',getNumberOfAppliers)

//اعداد المقيمين
router.get('/getNumberOfResidents',getNumberOfResidents)

//احصائيات البطاقات المطبوعة

//اعداد جميع الطلاب
router.get('/getNumberOfAllStudents',getNumberOfAllStudents)

//تجهيز الوجبات

//احصائيات استلام الوجبات

module.exports= router