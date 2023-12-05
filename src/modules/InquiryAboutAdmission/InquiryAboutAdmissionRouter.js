const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth.js");
const inquiry = require("./controller/InquiryAboutAdmission.js");

router.put("/request/:nationalID", inquiry.addResult);

// router.put('/updateResult/:NationalId'
// //, auth.auth([auth.roles.admin])
// ,inquiry.updateResult)

router.get("/result/:nationalID", inquiry.getResultOfInquiry);

module.exports = router;
