const TimingOldFemalesSchema = require("../../../../DB/model/timing/timingOldFemales.js");
const TimingOldMalesSchema = require("../../../../DB/model/timing/timingOldMales.js");
const errorHandling = require("../../../utils/errorHandling.js");
const httpStatusText = require("../../../utils/httpStatusText.js");
//*NEW FEMALES
const addToAndFromDateFemales = errorHandling.asyncHandler(
  async (req, res, next) => {
    const { to, from } = req.body;
    console.log(to, from);
    const toDate = new Date(to);
    const fromDate = new Date(from);
    const formatToDate = new Intl.DateTimeFormat("en-us", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const formatFromDate = new Intl.DateTimeFormat("en-us", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const toFromDate = await TimingOldFemalesSchema.create({
      to: formatToDate.format(toDate),
      from: formatFromDate.format(fromDate),
    });

    return res
      .status(201)
      .json({ status: httpStatusText.SUCCESS, data: { toFromDate } });
  }
);
const getDateFemales = errorHandling.asyncHandler(async (req, res, next) => {
  const date = await TimingOldFemalesSchema.find();

  return res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { date } });
});
const updateDateFemales = errorHandling.asyncHandler(async (req, res, next) => {
  const dateId = req.params.id;
  const { to, from } = req.body;
  console.log(to, from);
  const toDate = new Date(to);
  const fromDate = new Date(from);
  console.log(toDate, fromDate);
  const formatToDate = new Intl.DateTimeFormat("en-us", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const formatFromDate = new Intl.DateTimeFormat("en-us", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const updatedDate = await TimingOldFemalesSchema.findByIdAndUpdate(
    dateId,
    {
      $set: {
        to: formatToDate.format(toDate),
        from: formatFromDate.format(fromDate),
      },
    },
    { new: true }
  );

  return res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { updatedDate } });
});
const deleteDateFemales = errorHandling.asyncHandler(async (req, res, next) => {
  const dateId = req.params.id;
  const deletedDate = await TimingOldFemalesSchema.findByIdAndDelete({
    _id: dateId,
  });

  return res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { deletedDate } });
});
//*NEW MALES
const addToAndFromDateMales = errorHandling.asyncHandler(
  async (req, res, next) => {
    const { to, from } = req.body;
    const toDate = new Date(to);
    const fromDate = new Date(from);
    const formatToDate = new Intl.DateTimeFormat("en-us", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const formatFromDate = new Intl.DateTimeFormat("en-us", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const toFromDate = await TimingOldMalesSchema.create({
      to: formatToDate.format(toDate),
      from: formatFromDate.format(fromDate),
    });

    return res
      .status(201)
      .json({ status: httpStatusText.SUCCESS, data: { toFromDate } });
  }
);
const getDateMales = errorHandling.asyncHandler(async (req, res, next) => {
  const date = await TimingOldMalesSchema.find();

  return res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { date } });
});
const updateDateMales = errorHandling.asyncHandler(async (req, res, next) => {
  const dateId = req.params.id;
  const { to, from } = req.body;
  console.log(to, from);
  const toDate = new Date(to);
  const fromDate = new Date(from);
  console.log(toDate, fromDate);
  const formatToDate = new Intl.DateTimeFormat("en-us", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const formatFromDate = new Intl.DateTimeFormat("en-us", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const updatedDate = await TimingOldMalesSchema.findByIdAndUpdate(
    dateId,
    {
      $set: {
        to: formatToDate.format(toDate),
        from: formatFromDate.format(fromDate),
      },
    },
    { new: true }
  );

  return res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { updatedDate } });
});
const deleteDateMales = errorHandling.asyncHandler(async (req, res, next) => {
  const dateId = req.params.id;
  const deletedDate = await TimingOldMalesSchema.findByIdAndDelete({
    _id: dateId,
  });

  return res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { deletedDate } });
});
module.exports = {
  addToAndFromDateFemales,
  getDateFemales,
  updateDateFemales,
  deleteDateFemales,
  addToAndFromDateMales,
  getDateMales,
  updateDateMales,
  deleteDateMales,
};
