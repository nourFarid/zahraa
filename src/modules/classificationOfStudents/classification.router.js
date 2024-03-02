const express = require("express");
const router = express.Router();

//_____________________________________________
//OLD//
const {
  classifyOldEgyptionMaleStudents,
  classifyOldEgyptionFemaleStudents,
  classifyOldEgyptionSpecialHousingMaleStudents,
  classifyOldEgyptionSpecialHousingFemaleStudents
} = require("./controller/classificationOfOld");

router.get("/classifyOldEgyptionMaleStudents", classifyOldEgyptionMaleStudents);
router.get("/classifyOldEgyptionFemaleStudents", classifyOldEgyptionFemaleStudents);
router.get("/classifyOldEgyptionSpecialHousingMaleStudents", classifyOldEgyptionSpecialHousingMaleStudents);
router.get("/classifyOldEgyptionSpecialHousingFemaleStudents", classifyOldEgyptionSpecialHousingFemaleStudents);
//____________________________________________________________
//new//
const { classifyNewEgyptionMaleStudents,classifyNewEgyptionFemaleStudents,
   classifyNewEgyptionSpecialHousingMaleStudents,classifyNewEgyptionSpecialHousingFemaleStudents }
  
= require("./controller/classificationOfNew")

router.get("/classifyNewEgyptionMaleStudents", classifyNewEgyptionMaleStudents);
router.get("/classifyNewEgyptionFemaleStudents", classifyNewEgyptionFemaleStudents);
router.get("/classifyNewEgyptionSpecialHousingMaleStudents", classifyNewEgyptionSpecialHousingMaleStudents);
router.get("/classifyNewEgyptionSpecialHousingFemaleStudents", classifyNewEgyptionSpecialHousingFemaleStudents);

module.exports = router;
