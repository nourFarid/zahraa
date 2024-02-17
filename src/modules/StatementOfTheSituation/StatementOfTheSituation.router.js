const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth.js");
const StatementOfTheSituation = require("./Controller/StatementOfTheSituation.js");


router.get('/retrieveSomeStudentDataMales',StatementOfTheSituation.retrieveSomeStudentDataMales)

router.get('/retrieveSomeStudentDataFemales',StatementOfTheSituation.retrieveSomeStudentDataFemales)

router.get('/housing',
StatementOfTheSituation.retrieveHousingData)

router.get('/absence',
StatementOfTheSituation.getPermissions)


module.exports = router; 