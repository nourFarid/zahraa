const mongoose = require("mongoose");
const validator = require("validator");


const userSchema = new mongoose.Schema(
  {

    //2023-2024
    ofYear:{
      type:String,
      
    },


    // newEgyption: {
    //   type: Boolean,
    //   default: false,
    // },
    // oldEgyption: {
    //   type: Boolean,
    //   default: false,
    // },
    // newExpartriates: {
    //   type: Boolean,
    //   default: false,
    // },
    // oldExpartriates: {
    //   type: Boolean,
    //   default: false,
    // },
    newStudent: {
      type: Boolean,
      default: false,
    },
    oldStudent: {
      type: Boolean,
      default: false,
    },
    expartriates: {
      type: Boolean,
      default: false,
    },
    egyptions: {
      type: Boolean,
      default: false,
    },
    nationalID: {
      type: String,
      //required: true,
      // unique: true,
      match: /^\d{14}$/,
    },
    studentCode: {
      type: Number,
      //required: [true, "StudentCode is required"],
      unique: [true, "StudentCode must be unique value"],
      min: [9, "StudentCode must be at at least 9 numbers"],
      //  max: [10 , 'StudentCode must be at max 10 numbers']
    },

    studentName: {
      type: String,
      // required: [true, 'StudentName is required'],
      min: [2, "minimum length 2 char"],
      max: [20, "max length 20 char"],
    },

    birthDate: {
      type: String,
      // validate: {
      //   validator: value => validator.isISO8601(value),
      //   message: 'Invalid date format. Please use the ISO 8601 format (YYYY-MM-DD)',
      // },
    },

    placeOfBirth: {
      type: String,
    },

    gender:{
      type:String,
      enum:['ذكر' , 'انثي']},

    religion: {
      type: String,
    },
 

    residence: {
      //محل الاقامه
      type: String,
    },

    detailedAddress: {
      type: String,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "{VALUE} is not a valid email",
      },
    },

    landLinePhone: {
      type: String,
    },

    phoneNumber: {
      type: String,
      validate: {
        validator: function (value) {
          // Use a library like validator to check if the phone number is valid
          return validator.isMobilePhone(value, "any", { strictMode: false });
        },
        message: "{VALUE} is not a valid phone number",
      },
    },

    fatherName: {
      type: String,
      min: [2, "minimum length 2 char"],
      max: [20, "max length 20 char"],
    },

    fatherNationalId: {
      type: String,
      //required: true,
      unique: true,
    },
    fatherJop: {
      type: String,
    },

    fatherPhone: {
      type: String,
      validate: {
        validator: function (value) {
          // Use a library like validator to check if the phone number is valid
          return validator.isMobilePhone(value, "any", { strictMode: false });
        },
        message: "{VALUE} is not a valid phone number",
      },
    },

    guardianName: {
      type: String,
    },
    guardianRelation: {
      type: String,
    },
    guardianNationalId: {
      type: String,
      //required: true,
      // unique: true,
    },

    guardianPhone: {
      type: String,
    },
    AsituationRelatedToTheParents: {
      type: String,
    },
    College: {
      type: String,
    },
    year:{
      type: String,
    },
    grade: {
      type: Number,
    },
    gradePercentage: {
      type: Number,
    },
    //طلاب قدامي سواء مصرين او وافدين
    gradeOfLastYear: {
      type: String,
    },
    
    housingInLastYears: {
      type: String,
    },
    //to that
    //الطلاب الجدد سواء مصرين او وافدين
    HighSchoolDivision: {
      //نسبه الثانويه العامه
      type: String,
    },
    HighSchoolFromAbroad: {
      type: Boolean,
    },
    HighSchoolGrade: {
      type: Number,
    },
    HighSchoolPercentage: {
      type: Number,
    },

    HousingType: {
      type: String,
    },

    HousingWithoutFood: {
      type: Boolean,
    },
    withSpecialNeeds: {
      type: Boolean,
      default: false,
    },
    ThefamilyIsOutside: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
    },
    confirmPassword: {
      type: String,
    },
    policy: {
      type: Boolean,
      required: true,
    },
    //معلومات زياده عن الطلاب الوافدين
    PassportNumber: {
      type: String,
      //required: true,
      // unique: true,
    },
    IssuingAuthority: {
      // جهه الصدور
      type: String,
    },
    nationality: {
      type: String,
    },

    contextOfInquiry: {
      type: String,
      //required: true,
    },
    role: {
      type: String,
      default: "User",
      enum: ["User", "Admin"],
    },

    active: {
      type: Boolean,
      default: false,
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
      buildingId:{ type: mongoose.ObjectId, ref: 'Buildings' },
      floorId:{ type: mongoose.ObjectId, ref: 'Floor'},
      roomId:{ type: mongoose.ObjectId, ref: 'Rooms'},
      housingDate :{type: Date},
      expulsionStudent:{ type: Boolean,default:false}, //فصل
      penalty:{type: Boolean,default:false}, //جزاء
      isEvacuated:{type: Boolean,default:false}, //إخلاء
         
    isHoused:{
      type: Boolean,
      default: false
    },
    image: String,
    DOB: String,
    statusOfOnlineRequests:{
      type: String,
      default: "pending",

    },
    waitingForClassification:{
    type: Boolean,
    default: false,

    }

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
