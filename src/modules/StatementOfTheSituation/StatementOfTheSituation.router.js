const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth.js");
const StatementOfTheSituation = require("./Controller/StatementOfTheSituation.js");


router.get('/retrieveSomeStudentData',StatementOfTheSituation.retrieveSomeStudentData)

router.get('/',
StatementOfTheSituation.retrieveHousingData)

module.exports = router; 