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
} = require("./controller/timingOld");

router.post(
  "/addOldFemales",
  // auth.auth([auth.roles.admin]),
  addToAndFromDateFemales
);
router.get(
  "/getOldFemales",
  // auth.auth([auth.roles.admin]),
  getDateFemales
);
router.put(
  "/updateOldFemales/:id",
  // auth.auth([auth.roles.admin]),
  updateDateFemales
);
router.delete(
  "/deleteOldFemales/:id",
  // auth.auth([auth.roles.admin]),
  deleteDateFemales
);

router.post(
  "/addOldMales",
  // auth.auth([auth.roles.admin]),
  addToAndFromDateMales
);
router.get(
  "/getOldMales",
  // auth.auth([auth.roles.admin]),
  getDateMales
);
router.put(
  "/updateOldMales/:id",
  // auth.auth([auth.roles.admin]),
  updateDateMales
);
router.delete(
  "/deleteOldMales/:id",
  // auth.auth([auth.roles.admin]),
  deleteDateMales
);

module.exports = router;
