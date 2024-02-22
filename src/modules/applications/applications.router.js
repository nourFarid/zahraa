const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth.js");

const{ reviewOnlineRequestsMales,
    reviewOnlineRequestsFemales,
    acceptOnlineRequests,
    rejectOnlineRequests}=require('./reviewOnlineRequests/controller/reviewOnlineRequests.js')
    
router.post('/reviewOnlineRequestsMales',
//auth.auth([auth.roles.admin]),
reviewOnlineRequestsMales)
router.post('/reviewOnlineRequestsFemales',
//auth.auth([auth.roles.admin]),
reviewOnlineRequestsFemales)
router.put('/acceptOnlineRequests/:id',
//auth.auth([auth.roles.admin]),
acceptOnlineRequests)
router.put('/rejectOnlineRequests/:id',
//auth.auth([auth.roles.admin]),
rejectOnlineRequests)


module.exports=router;