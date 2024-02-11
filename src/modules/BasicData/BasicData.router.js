const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth.js");
const BasicData = require("./controller/BasicData.js");


router.get('/getBasicData',BasicData.getBasicData)

module.exports = router;


































