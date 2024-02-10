const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth.js");

const{reviewOnlineRequests,acceptOnlineRequests,rejectOnlineRequests}=require('./reviewOnlineRequests/controller/reviewOnlineRequests.js')
router.post('/reviewOnlineRequests',reviewOnlineRequests)
router.put('/acceptedOnlineRequests/:id',acceptOnlineRequests)
router.put('/rejectOnlineRequests/:id',rejectOnlineRequests)


module.exports=router;