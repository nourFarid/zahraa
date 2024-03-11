const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth.js");
const uploadFile = require('../../middleware/upload.js')



//مراجعة طلبات الانترنت 
//________________________________________________________________  
const{ reviewOnlineRequestsMales,
    reviewOnlineRequestsFemales,
    acceptOnlineRequests,
    rejectOnlineRequests,
    }=require('./reviewOnlineRequests/controller/reviewOnlineRequests.js')
    

router.post('/reviewOnlineRequestsMales',
//auth.auth([auth.roles.admin]),
reviewOnlineRequestsMales)
router.post('/reviewOnlineRequestsFemales',
//auth.auth([auth.roles.admin]),
reviewOnlineRequestsFemales)
router.put('/acceptOnlineRequests/:id',
//auth.auth([auth.roles.admin]),
acceptOnlineRequests)
router.put('/rejectOnlineRequests/:id',
//auth.auth([auth.roles.admin]),
rejectOnlineRequests)

//________________________________________________________________   
//حالات البحث الاجتماعي
const {socialResearchcases}= require("./socialResearchcases/socialResearchcases.js")    
router.get("/socialResearchcases",socialResearchcases)

//________________________________________________________________
//قبول الحالات الخاصة
const{getRejectedStudents,acceptRejectedStudents}= require("./acceptSpecialCases/acceptSpecialCases.js")
router.get("/getRejectedStudents",getRejectedStudents)
router.put("/acceptRejectedStudents/:id",acceptRejectedStudents)

//________________________________________________________________
// طباعه البطاقات
const {unprintedCardsForMales,unprintedCardsForFemales,updateCards} = require("./cardprinting/cardprinting.js");
router.get("/unprintedCardsForMales",unprintedCardsForMales)
router.get("/unprintedCardsForFemales",unprintedCardsForFemales)
router.put("/updateCards/:id",updateCards)

//________________________________________________________________
// حجز الوجبات اكسل
const {bookMealExcel}=require("./bookMealExcel/bookMealExcel.js")
router.post("/bookMealExcel",uploadFile.upload.single('avatar'),bookMealExcel)
//________________________________________________________________
//استلام الوجبات اكسل
const {receiveMealExcel}=require("./receivingMeals/receivingMeals.js")
router.post("/receiveMealExcel",uploadFile.upload.single('avatar'),receiveMealExcel)


//رفع الصور
const {uploadStudentPhoto}= require("./uploadPhotos/uploadPhotos.js")
router.put("/uploadStudentPhoto",uploadFile.upload.array('avatar',1000),uploadStudentPhoto)



module.exports=router;
