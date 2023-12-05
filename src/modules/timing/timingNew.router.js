const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth.js");
const {
  addToAndFromDateFemales,
  getDateFemales,
  updateDateFemales,
  deleteDateFemales,
  addToAndFromDateMales,
  getDateMales,
  updateDateMales,
  deleteDateMales,
  // addToAndFromDateFemalesTestNewThing,
} = require("./controller/timingNew");

router.post(
  "/addNewFemales",
  auth.auth([auth.roles.admin]),

  addToAndFromDateFemales
);
// router.post(
//   "/addNewFemales",
//   // auth.auth([auth.roles.admin]),

//   addToAndFromDateFemalesTestNewThing
// );
router.get(
  "/getNewFemales",
  // auth.auth([auth.roles.admin]),
  getDateFemales
);
router.put(
  "/updateNewFemales/:id",
  auth.auth([auth.roles.admin]),
  updateDateFemales
);
router.delete(
  "/deleteNewFemales/:id",
  auth.auth([auth.roles.admin]),
  deleteDateFemales
);

router.post(
  "/addNewMales",
  auth.auth([auth.roles.admin]),
  addToAndFromDateMales
);
router.get(
  "/getNewMales",
  // auth.auth([auth.roles.admin]),
  getDateMales
);
router.put(
  "/updateNewMales/:id",
  auth.auth([auth.roles.admin]),
  updateDateMales
);
router.delete(
  "/deleteNewMales/:id",
  auth.auth([auth.roles.admin]),
  deleteDateMales
);

module.exports = router;
