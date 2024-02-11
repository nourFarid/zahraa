const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth.js");
const {getBasicDataMales,getBasicDataFemales} = require("./controller/basicData.js");


router.get('/getBasicDataMales',getBasicDataMales)
router.get('/getBasicDataFemales',getBasicDataFemales)

module.exports = router;