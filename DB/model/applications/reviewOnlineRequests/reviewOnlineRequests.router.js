const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth.js");

const{reviewOnlineRequests}=require('./controller/reviewOnlineRequests.js')
router.post('/reviewOnlineRequests',reviewOnlineRequests)

module.exports=router;