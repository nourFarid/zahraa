const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth.js");
const  {
    addDetailsAboutTypeOfSpecialHousing,deleteDetailsAboutTypeOfSpecialHousing,getDetailsAboutTypeOfSpecialHousing}= require("./controller/detailsAboutTypeOfSpecialHousing.js")

router.post("/addDetailsAboutTypeOfSpecialHousing/:id",
//  auth.auth([auth.roles.admin]),
addDetailsAboutTypeOfSpecialHousing
)
router.delete("/deleteDetailsAboutTypeOfSpecialHousing/:id",
 // auth.auth([auth.roles.admin]),
deleteDetailsAboutTypeOfSpecialHousing
)
router.get("/getDetailsAboutTypeOfSpecialHousing/:id",
 // auth.auth([auth.roles.admin]),
 getDetailsAboutTypeOfSpecialHousing
)


module.exports = router;
