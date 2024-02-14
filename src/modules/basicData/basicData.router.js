const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth.js");
const {getBasicDataMales,getBasicDataFemales,searchMales,searchFemales} = require("./controller/basicData.js");


router.get('/getBasicDataMales',getBasicDataMales)
router.get('/searchMales',searchMales)
router.get('/getBasicDataFemales',getBasicDataFemales)
router.get('/searchFemales',searchFemales)


module.exports = router;