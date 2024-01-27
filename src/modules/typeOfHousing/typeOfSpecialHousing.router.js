const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth.js");
const  {addTypeOfSpecialHousing,deleteTypeOfSpecialHousing,getTypeOfSpecialHousing,getTypeOfSpecialHousingById}= require("./controller/typeOfSpecialHousing.js")

router.post("/addTypeOfSpecialHousing",
 // auth.auth([auth.roles.admin]),
  addTypeOfSpecialHousing
)
router.delete("/deleteTypeOfSpecialHousing/:id",
 // auth.auth([auth.roles.admin]),
deleteTypeOfSpecialHousing
)
router.get("/getTypeOfSpecialHousing",
 // auth.auth([auth.roles.admin]),
getTypeOfSpecialHousing
)
router.get("/getTypeOfSpecialHousingById/:id",
 // auth.auth([auth.roles.admin]),
getTypeOfSpecialHousingById
)

module.exports = router;
