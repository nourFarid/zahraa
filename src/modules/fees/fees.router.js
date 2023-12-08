const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth.js");
const { addFees } = require("./controller/fees");
router.post("/addFees", addFees);
module.exports = router;
