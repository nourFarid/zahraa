const express = require ('express')
const router = express.Router()
const {addExcludedCountries,
    getExcludedCountries,
    updateExcludedCountries,
    deleteExcludedCountries} = require('./controller/excludedCountries.js')
const auth = require('../../middleware/auth.js')

router.post("/addExcludedCountries",addExcludedCountries)
router.get("/getExcludedCountries",getExcludedCountries)
router.put("/updateExcludedCountries/:id",updateExcludedCountries)
router.delete("/deleteExcludedCountries/:id",deleteExcludedCountries)

module.exports =router