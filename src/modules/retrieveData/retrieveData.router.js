const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth.js");
const retrieveData = require("./Controller/retrieveData.js");


router.get('/retrieveStudentData',retrieveData.retrieveStudentData)

module.exports = router;