const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth.js");
const {StatementOfTheSituation} = require("./Controller/StatementOfTheSituation.js");


router.get('/:id',
StatementOfTheSituation)

// router.get('/absence',
// StatementOfTheSituation.getPermissions)


module.exports = router; 