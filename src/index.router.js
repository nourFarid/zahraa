const connectDB = require("../DB/connection.js");
const authRouter = require("./modules/auth/auth.router.js");
const instructionsRouter = require("./modules/instructions/instructions.router.js");
const userRouter = require("./modules/user/user.router.js");
const errorHandling = require("./utils/errorHandling.js");
const timingNewRouter = require("./modules/timing/timingNew.router.js");
const timingOldRouter = require("./modules/timing/timingOld.router .js");
const roomsRouter = require("./modules/rooms/rooms.router.js");
const floorsRouter = require("./modules/floors/floors.router.js");
const buildingsRouter = require("./modules/Buildings/buildings.router.js");
const universityCityRouter = require("./modules/universityCity/universityCity.router.js");
const housingRouter = require("./modules/housing/housing.router.js");
const expulsionRouter = require("./modules/studentExpulsion/studentExpulsion.router.js");
const penaltyRouter = require("./modules/penalty/penatlyRouter.js");
const registration = require("./modules/registration/registration.router");
const classifyStudents = require("./modules/classificationOfStudents/classification.router.js");
const InquiryAboutAdmission = require("./modules/InquiryAboutAdmission/InquiryAboutAdmissionRouter.js");
const fees = require("./modules/fees/fees.router");
const BasicData=require("./modules/BasicData/basicData.router.js");
const retrieveData=require("./modules/retrieveData/retrieveData.router.js")
const StatementOfTheSituation=require("./modules/StatementOfTheSituation/StatementOfTheSituation.router.js");


const initApp = (app, express) => {
  //convert Buffer Data
  app.use(express.json({}));
  //Setup API Routing
  app.use(`/auth`, authRouter);
  app.use(`/user`, userRouter);
  app.use(`/instructions`, instructionsRouter);
  app.use(`/timingNew`, timingNewRouter);
  app.use(`/timingOld`, timingOldRouter);
  app.use(`/rooms`, roomsRouter);
  app.use(`/floors`, floorsRouter);
  app.use(`/buildings`, buildingsRouter);
  app.use(`/universityCity`, universityCityRouter);
  app.use(`/housing`, housingRouter);
  app.use(`/expulsion`, expulsionRouter);
  app.use(`/penalty`, penaltyRouter);
  app.use("/registration", registration);
  app.use("/classifyStudents", classifyStudents);
  app.use(`/inquiry`, InquiryAboutAdmission);
  app.use(`/BasicData`, BasicData);
  app.use(`/retrieveData`, retrieveData);
  app.use(`/somedata`,StatementOfTheSituation);
  app.use(`/retrieveHousingData`,StatementOfTheSituation);
  app.use("/fees", fees);
  app.all("*", (req, res, next) => {
    res.send("In-valid Routing Plz check url  or  method");
  });
  app.use(errorHandling.globalErrorHandling);

  connectDB();
};

module.exports = initApp;
