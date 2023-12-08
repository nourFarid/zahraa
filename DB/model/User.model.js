const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    newEgyption: {
      type: Boolean,
      default: false,
    },
    oldEgyption: {
      type: Boolean,
      default: false,
    },
    newExpartriates: {
      type: Boolean,
      default: false,
    },
    oldExpartriates: {
      type: Boolean,
      default: false,
    },
    nationalID: {
      type: String,
      //required: true,
      unique: true,
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
      unique: true,
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
    grade: {
      type: Number,
    },
    //طلاب قدامي سواء مصرين او وافدين
    gradeOfLastYear: {
      type: String,
    },
    gradePercentage: {
      type: Number,
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
    },
    ThefamilyIsOutside: {
      type: Boolean,
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
      unique: true,
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
      evacuationDate :{type: Date}, // إخلاء السكن
      evacuationType : {type : String, enum:['نصف العام الدراسي' , 'نهاية العام الدراسي']},
      evacuationReason :{type: String, enum :['إخلاء اجازات' , 'إخلاء انتقالات']},
      expulsionStudent:{ type: Boolean,default:false},
      penalty:{type: Boolean,default:false},
    image: String,
    DOB: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);

// userName: {
//   type: String,
//   // required: [true, 'userName is required'],
//   min: [2, "minimum length 2 char"],
//   max: [20, "max length 2 char"],
// },
// NationalId: {
//   type: Number,
//   required: [true, "NationalId is required"],
//   unique: [true, "NationalId must be unique value"],
//   min: [14, "National Id must be at leadt 14 characters"],
//   //  max: [14 , 'National Id must be at max14 characters']
// },
// email: {
//   type: String,
//   unique: [true, "email must be unique value"],
//   required: [true, "userName is required"],
// },
// password: {
//   type: String,
//   required: [true, "password is required"],
// },
// phone: {
//   type: String,
// },
