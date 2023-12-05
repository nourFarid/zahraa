const registrationSchemaForExp = require("../../../../../DB/model/User.model.js");
const errorHandling = require("../../../../utils/errorHandling.js");
const httpStatusText = require("../../../../utils/httpStatusText.js");
const hashAndCompare = require("../../../../utils/HashAndCompare.js");

const registrationExp = errorHandling.asyncHandler(async (req, res, next) => {
  const { password, confirmPassword, birthDate, ...userData } = req.body;
  console.log(birthDate);
  const changDate = new Date(birthDate);
  const formatToDate = new Intl.DateTimeFormat("en-us", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  req.body.password = hashAndCompare.hash(req.body.password);

  // Check if password and confirmPassword match
  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ message: "Password and confirmPassword do not match" });
  }

  // Create a new user instance with the hashed password
  const newUser = new registrationSchemaForExp({
    ...userData,
    password,
    birthDate: formatToDate.format(changDate),
  });
  // console.log(...userData);

  // Save the user to the database
  await newUser.save();

  return res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { newUser } });
});

module.exports = { registrationExp };

// const addStudent= errorHandling.asyncHandler(async(req,res,next)=>{
//     const{contextOfRegistration}= req.body

//     const registration = await registrationSchema.create({
//         contextOfRegistration
//     })
//     return res.status(201).json({status : httpStatusText.SUCCESS , data : {registration}})
// }
// )

// app.post('/register', async (req, res) => {
//     try {
//       const newStudent = new Student(req.body);
//       await newStudent.save();
//       res.status(201).json({ message: 'Student registered successfully' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   });

//   app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
//   });

//const User = mongoose.model('User', registrationSchema);

//app.use(bodyParser.json());

//for hashing the password befor saving it in database
// registrationSchema.pre('save', async function(next) {
//     const user = this;
//     if (!user.isModified('password')) return next();

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(user.password, salt);
//     user.password = hashedPassword;
//     next();
//   });
