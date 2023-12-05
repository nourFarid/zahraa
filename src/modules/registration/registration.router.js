const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth.js");
const {
  registrationEgy,
} = require("./registrationEgy/controller/registration.js");
const {
  registrationExp,
} = require("./registrationExp/controller/registration.js");
const { getAllRegistered } = require("./getAll");

router.post(
  "/registerEgy",
  //auth.auth([auth.roles.admin]),
  registrationEgy
);

router.post(
  "/registerExp",
  //auth.auth([auth.roles.admin]),
  registrationExp
);

router.get("/getAllRegistered", getAllRegistered);

module.exports = router;

// const {
//   registrationNewEgy,
// } = require("./registrationNewEgy/controller/registration");
// const {
//   registrationNewExp,
// } = require("./registrationNewExp/controller/registration.js");
// const {
//   registrationOldEgy,
// } = require("./registrationOldEgy/controller/registration");
// const {
//   registrationOldExp,
// } = require("./registrationOldExp/controller/registration");

// const { getAllRegistered } = require("./getAll");
// router.post(
//   "/registerNEg",
//   //auth.auth([auth.roles.admin]),
//   registrationNewEgy
// );

// router.post(
//   "/registerNEx",
//   //auth.auth([auth.roles.admin]),

//   registrationNewExp
// );

// router.post(
//   "/registerOLg",
//   //auth.auth([auth.roles.admin]),
//   registrationOldEgy
// );

// router.post(
//   "/registerOLx",
//   //auth.auth([auth.roles.admin]),

//   registrationOldExp
// );
// router.get("/getAllRegistered", getAllRegistered);
