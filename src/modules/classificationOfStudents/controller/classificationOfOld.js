const User = require("../../../../DB/model/User.model.js");
const ExcludedCountries= require("../../../../DB/model/excludedCountries/excludedCountries")

const errorHandling = require("../../../utils/errorHandling.js");
const httpStatusText = require("../../../utils/httpStatusText.js");
const {
  getCoordinatesAndCalculateDistance,
} = require("../../../utils/getCoordinates.js");


//تنسيق طلبة مصريين قدامى
const classifyOldEgyptionMaleStudents = errorHandling.asyncHandler(
  async (req, res, next) => {
  const {ofYear}= req.query
    const query={ 
       egyptions:true,
      oldStudent:true,
      ofYear:ofYear,
      statusOfOnlineRequests:"accepted",
      waitingForClassification:true,
      HousingType:"سكن عادى",
      gender:"ذكر",}
      
// Loop over each key-value pair in the query object
  for (const key in query) {
    if (query.hasOwnProperty(key)) {
      if (
        query[key] == "false" ||
        query[key] === "false" ||
        query[key] == false ||
        query[key] == "undefined"||
        query[key] == undefined
      ) {
        delete query[key];
      }
    }
  }
  console.log('====================================');
  console.log(query);
  console.log('====================================');
      
    var students= await User.find(query)
    console.log('====================================');
    console.log(students.length);
    console.log('====================================');

//________________________________________________________________
//الابعد سكنا
  const excludedCountries = await ExcludedCountries.find();
  const excludedCountryNames = excludedCountries.map(country => country.country);
  
  // Filter out students based on residence
  students = students.filter(student => {
    const residenceParts = student.residence.split(" ");
    const countryNameInStudent = residenceParts[1]; 
    const isExcluded = excludedCountryNames.includes(countryNameInStudent);
    if (isExcluded) {
        console.log(`Removing student ${student.studentName} from ${countryNameInStudent}`);
    }
  
    // Return true if the student is not in the list of excluded countries, false otherwise
    return !isExcluded;
  });
  
  console.log('Remaining Students:', students.length);
  let distance
    students = await Promise.all(
      students.map(async (student) => {
        const distance = await getCoordinatesAndCalculateDistance(student.residence);
        return { ...student._doc, distance };
      })
    );

    // Sort students from farthest to nearest
    students.sort((a, b) => b.distance - a.distance);
//________________________________________________
//الاصغر سنا
   // Calculate age for each student
   students.forEach(student => {
    const birthdateParts = student.birthDate.split('/'); 
    const birthYear = parseInt(birthdateParts[2]);
    const currentYear = new Date().getFullYear();
    student.age = currentYear - birthYear;
    console.log('====================================');
    console.log(student.age);
    console.log('====================================');
});
students.sort((a, b) => a.age - b.age);
//________________________________________________________________
//الاعلى تقديرا
const arabicGradesOrder = {
  'امتياز': 5,
  'جيد جدا': 4,
  'جيد': 3,
  'مقبول': 2,
  'راسب': 1
};

students.sort((a, b) => {
  const gradeA = arabicGradesOrder[a.gradeOfLastYear];
  const gradeB = arabicGradesOrder[b.gradeOfLastYear];
  return gradeB - gradeA; // Sort from biggest to smallest
});
//________________________________________________________________
//نسبة التقدير

students.sort((a, b) => {
  const gradePercentageA = a.gradePercentage;
  const gradePercentageB = b.gradePercentage;
  return gradePercentageB - gradePercentageA; // Sort from biggest to smallest
});
//________________________________________________________________   
//السنوات الاكبر و اللتى تليها

const yearsInArabic= {
  'الخامسة': 5,
  'الرابعة': 4,
  'الثالثة': 3,
  'الثانية': 2,
  'الأولى': 1
}

students.sort((a, b) => {
  const yearA = yearsInArabic[a.year];
  const yearB = yearsInArabic[b.year];
  return yearB - yearA; // Sort from biggest to smallest
});


console.log('====================================');
console.log(students.length);
console.log('====================================');

const updatedStudents = await Promise.all(
  students.map(async (student) => {
    return await User.findByIdAndUpdate(
      { _id: student._id },
      { $set: { isClassified: true } },
      { new: true }
    );
  })
);

    return res
      .status(201)
      .json({ status: httpStatusText.SUCCESS, data: { students } });
  }
);


//تنسيق طالبات مصريين قدامى
// gender: { $in: ["انثي", "أنثي", "انثى", "أنثى"] } 
const classifyOldEgyptionFemaleStudents = errorHandling.asyncHandler(
  async (req, res, next) => {
    const {ofYear}= req.query
    const query={  egyptions:true,
      oldStudent:true,
      ofYear:ofYear,
      statusOfOnlineRequests:"accepted",
      HousingType:"سكن عادى",
      waitingForClassification:true,
      gender: { $in: ["انثي", "أنثي", "انثى", "أنثى"] } 
    }

// Loop over each key-value pair in the query object
  for (const key in query) {
    if (query.hasOwnProperty(key)) {
      if (
        query[key] == "false" ||
        query[key] === "false" ||
        query[key] == false ||
        query[key] == "undefined"||
        query[key] == undefined
      ) {
        delete query[key];
      }
    }
  }
  console.log('====================================');
  console.log(query);
  console.log('====================================');
      
    var students= await User.find(query)
    console.log('====================================');
    console.log(students.length);
    console.log('====================================');

//________________________________________________________________
//الابعد سكنا
  const excludedCountries = await ExcludedCountries.find();
  const excludedCountryNames = excludedCountries.map(country => country.country);
  
  // Filter out students based on residence
  students = students.filter(student => {
    const residenceParts = student.residence.split(" ");
    const countryNameInStudent = residenceParts[1]; 
    const isExcluded = excludedCountryNames.includes(countryNameInStudent);
    if (isExcluded) {
        console.log(`Removing student ${student.studentName} from ${countryNameInStudent}`);
    }
  
    // Return true if the student is not in the list of excluded countries, false otherwise
    return !isExcluded;
  });
  
  console.log('Remaining Students:', students.length);
  let distance
    students = await Promise.all(
      students.map(async (student) => {
        const distance = await getCoordinatesAndCalculateDistance(student.residence);
        return { ...student._doc, distance };
      })
    );

    // Sort students from farthest to nearest
    students.sort((a, b) => b.distance - a.distance);
//________________________________________________
//الاكبر سنا
   // Calculate age for each student
   students.forEach(student => {
    const birthdateParts = student.birthDate.split('/'); 
    const birthYear = parseInt(birthdateParts[2]);
    const currentYear = new Date().getFullYear();
    student.age = currentYear - birthYear;
    console.log('====================================');
    console.log(student.age);
    console.log('====================================');
});
students.sort((a, b) => a.age - b.age);
//________________________________________________________________
//الاعلى تقديرا
const arabicGradesOrder = {
  'امتياز': 5,
  'جيد جدا': 4,
  'جيد': 3,
  'مقبول': 2,
  'راسب': 1
};

students.sort((a, b) => {
  const gradeA = arabicGradesOrder[a.gradeOfLastYear];
  const gradeB = arabicGradesOrder[b.gradeOfLastYear];
  return gradeB - gradeA; // Sort from biggest to smallest
});
//________________________________________________________________
//________________________________________________________________   
//السنوات الاكبر و اللتى تليها

const yearsInArabic= {
  'الخامسة': 5,
  'الرابعة': 4,
  'الثالثة': 3,
  'الثانية': 2,
  'الأولى': 1
}

students.sort((a, b) => {
  const yearA = yearsInArabic[a.year];
  const yearB = yearsInArabic[b.year];
  return yearB - yearA; // Sort from biggest to smallest
});


console.log('====================================');
console.log(students.length);
console.log('====================================');

const updatedStudents = await Promise.all(
  students.map(async (student) => {
    console.log("Updating student:", student._id);
    return await User.findByIdAndUpdate(
      { _id: student._id },
      { $set: { isClassified: true } },
      { new: true }
    );
  })
);

    return res
      .status(201)
      .json({ status: httpStatusText.SUCCESS, data: { students } });
 }
);

//تنسيق طلبة مصريين قدامي سكن مميز

const classifyOldEgyptionSpecialHousingMaleStudents= errorHandling.asyncHandler(async(req, res, next)=>{

const {ofYear}= req.query
const query={
  oldStudent:true,
  ofYear:ofYear,
  statusOfOnlineRequests:"accepted",
  waitingForClassification:true,
  gender:"ذكر",
  HousingType:"سكن مميز فردى طلبة"
}

// Loop over each key-value pair in the query object
for (const key in query) {
  if (query.hasOwnProperty(key)) {
    if (
      query[key] == "false" ||
      query[key] === "false" ||
      query[key] == false ||
      query[key] == "undefined"||
      query[key] == undefined
    ) {
      delete query[key];
    }
  }
}
console.log('====================================');
console.log(query);
console.log('====================================');
    
  var students= await User.find(query).sort({gradePercentage:-1})
  console.log('====================================');
  console.log(students.length);
  console.log('====================================');
  const updatedStudents = await Promise.all(
    students.map(async (student) => {
      console.log("Updating student:", student._id);
      return await User.findByIdAndUpdate(
        { _id: student._id },
        { $set: { isClassified: true } },
        { new: true }
      );
    })
  );

  return res
  .status(201)
  .json({ status: httpStatusText.SUCCESS, data: { students } });




})
//تنسيق طالبات مصريين قدامي سكن مميز

const classifyOldEgyptionSpecialHousingFemaleStudents= errorHandling.asyncHandler(async(req, res, next)=>{

const {ofYear}= req.query
const query={
  oldStudent:true,
  ofYear:ofYear,
  statusOfOnlineRequests:"accepted",
  waitingForClassification:true,
gender: { $in: ["انثي", "أنثي", "انثى", "أنثى"] } ,
HousingType:"سكن مميز فردى طالبات"
}

// Loop over each key-value pair in the query object
for (const key in query) {
  if (query.hasOwnProperty(key)) {
    if (
      query[key] == "false" ||
      query[key] === "false" ||
      query[key] == false ||
      query[key] == "undefined"||
      query[key] == undefined
    ) {
      delete query[key];
    }
  }
}
console.log('====================================');
console.log(query);
console.log('====================================');
    
  var students= await User.find(query).sort({gradePercentage:-1})
  console.log('====================================');
  console.log(students.length);
  console.log('====================================');
  const updatedStudents = await Promise.all(
    students.map(async (student) => {
      console.log("Updating student:", student._id);
      return await User.findByIdAndUpdate(
        { _id: student._id },
        { $set: { isClassified: true } },
        { new: true }
      );
    })
  );

  return res
  .status(201)
  .json({ status: httpStatusText.SUCCESS, data: { students } });




})



module.exports = { classifyOldEgyptionMaleStudents,classifyOldEgyptionSpecialHousingMaleStudents,classifyOldEgyptionSpecialHousingFemaleStudents, classifyOldEgyptionFemaleStudents };
