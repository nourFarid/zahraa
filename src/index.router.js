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
const mealsRouter = require("./modules/meals/mealsRouter.js");
const housingRouter = require("./modules/housing/housing.router.js");
const expulsionRouter = require("./modules/studentExpulsion/studentExpulsion.router.js");
const penaltyRouter = require("./modules/penalty/penatlyRouter.js");
const registration = require("./modules/registration/registration.router");
const classifyStudents = require("./modules/classificationOfStudents/classification.router.js");
const InquiryAboutAdmission = require("./modules/InquiryAboutAdmission/InquiryAboutAdmissionRouter.js");
const fees = require("./modules/fees/fees.router");
const blockMeals= require("./modules/blockMeals/meals.router.js")
const absence = require("./modules/absence&Permission/absence.router.js")
const typeOfSpecialHousing= require("./modules/typeOfHousing/typeOfSpecialHousing.router.js")
const detailsAboutTypeOfSpecialHousing=require("./modules/typeOfHousing/detailsAboutTypeOfSpecialHousing.router.js")
const cityStructure = require ('./modules/CityStructure/cityStructure.router.js')
const statistics=require("./modules/statistics/statistics.router")
const applications= require("./modules/applications/applications.router.js")
const basicData=require("./modules/basicData/basicData.router.js");
const StatementOfTheSituation=require("./modules/StatementOfTheSituation/StatementOfTheSituation.router.js")
const AcceptanceNotification= require("./modules/AcceptanceNotification/AcceptanceNotificatio.Router.js")
const evacuation = require("./modules/evacuation/evacuated.router.js")
const universityPhotos = require("./modules/universityPhotos/universityPhotos.router.js")
const excludedCountries= require("./modules/excludedCountries/excludedCountries.router.js")
const reports= require("./modules/Reports/reports.router.js")

const path= require("path")
const changeStudentInfo = require("./modules/changeStudentInfo/changeStudentInfo.router.js")
const logs= require("./modules/logs/logs.router.js")
const reports = require("./modules/reports/report.router.js")


const initApp = (app, express) => {
  //convert Buffer Data

  app.use(express.json({}));
  //Setup API Routing
  app.use(`/auth`, authRouter);
  app.use(`/user`, userRouter);
  app.use(`/instructions`, instructionsRouter);
  app.use(`/timingNew`, timingNewRouter);
  app.use(`/mealsAdd`, mealsRouter);
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
  app.use("/fees", fees);
  app.use(`/blockMeals` , blockMeals)
  app.use(`/absence` , absence)
  app.use("/typeOfSpecialHousing", typeOfSpecialHousing);
  app.use("/detailsAboutTypeOfSpecialHousing", detailsAboutTypeOfSpecialHousing);
  app.use("/cityStructure" , cityStructure)
  app.use(`/StatementOfTheSituation`,StatementOfTheSituation);
  app.use("/statistics",statistics)
  app.use("/applications",applications)
  app.use("/basicData", basicData);
  app.use(`/AcceptanceNotification`, AcceptanceNotification);
  app.use("/evacuation" , evacuation)
  app.use("/universityPhotos" , universityPhotos)
  app.use('/uploads',express.static(path.join(__dirname,'../uploads') ))
  app.use("/excludedCountries",excludedCountries)

  app.use("/reports",reports)



  app.use("/changeInfo",changeStudentInfo)
  app.use("/logs",logs)
  app.use(`/reports`,reports)


  app.all("*", (req, res, next) => {
    console.log(`Invalid request: ${req.method} ${req.url}`);
    res.send("In-valid Routing Plz check url  or  method");
  });
  app.use(errorHandling.globalErrorHandling);
 
  connectDB();
};

module.exports = initApp;
