const registrationSchemaForEgy = require("../../../../../DB/model/User.model.js");
const errorHandling = require("../../../../utils/errorHandling.js");
const httpStatusText = require("../../../../utils/httpStatusText.js");
const hashAndCompare = require("../../../../utils/HashAndCompare.js");

const registrationEgy = errorHandling.asyncHandler(async (req, res, next) => {
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
  const newUser = new registrationSchemaForEgy({
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

module.exports = { registrationEgy };

