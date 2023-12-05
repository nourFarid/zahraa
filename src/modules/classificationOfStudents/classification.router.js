const express = require("express");
const router = express.Router();
const {
  classifyOldMaleStudents,
  classifyOldFemaleStudents,
} = require("./controller/classificationOfOld");
const {
  classifyNewMaleStudents,
  classifyNewFemaleStudents,
} = require("./controller/classificationOfNew");
router.get("/classifyOldMale", classifyOldMaleStudents);
router.get("/classifyOldFemale", classifyOldFemaleStudents);
router.get("/classifyNewMale", classifyNewMaleStudents);
router.get("/classifyNewFemale", classifyNewFemaleStudents);

module.exports = router;
