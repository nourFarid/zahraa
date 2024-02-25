const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth.js");



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
router.put("/socialResearchcases",socialResearchcases)

//________________________________________________________________
//قبول الحالات الخاصة
const{getRejectedStudents,acceptRejectedStudents}= require("./acceptSpecialCases/acceptSpecialCases.js")
router.get("/getRejectedStudents",getRejectedStudents)
router.put("/acceptRejectedStudents/:id",acceptRejectedStudents)

module.exports=router;