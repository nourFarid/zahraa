const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth.js");
const { addFeesForStudents,addFeeType,updateFeeType ,deleteFeeType,addFeeOptions,updateFeeOptions,feeStatement,getFeeType} = require("./controller/fees");
//الطلاب و الطالبات
router.post("/addFeesForStudents",//  auth.auth([auth.roles.admin]),
addFeesForStudents);
//---------------------------------------------------------
//تبع الاشراف على النظام
router.post("/addFeeType",
//  auth.auth([auth.roles.admin]),
addFeeType);
router.get("/getFeeType",
//  auth.auth([auth.roles.admin]),
getFeeType);
router.put("/updateFeeType/:id", 
//  auth.auth([auth.roles.admin]),
updateFeeType);
router.delete("/deleteFeeType/:id",
//  auth.auth([auth.roles.admin]),
deleteFeeType);
//اعدادات الرسوم
router.post("/addFeeOptions",
//  auth.auth([auth.roles.admin]),
addFeeOptions )
router.put("/updateFeeOptions/:id",
//  auth.auth([auth.roles.admin]),
updateFeeOptions)
//بيان رسوم
router.get('/feeStatement/:id',
//  auth.auth([auth.roles.admin]),
feeStatement)

module.exports = router;
