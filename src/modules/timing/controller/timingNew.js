const TimingNewFemalesSchema = require("../../../../DB/model/timing/timingNewFemales.js");
const TimingNewMalesSchema = require("../../../../DB/model/timing/timingNewMales.js");
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

    console.log(toDate, fromDate);

    const toFromDate = await TimingNewFemalesSchema.create({
      to: formatToDate.format(toDate),
      from: formatFromDate.format(fromDate),
    });

    return res
      .status(201)
      .json({ status: httpStatusText.SUCCESS, data: { toFromDate } });
  }
);
// const addToAndFromDateFemalesTestNewThing = errorHandling.asyncHandler(
//   async (req, res, next) => {
//     const { to, from } = req.body;
//     console.log(to, from);
//     const toDate = new Date(to);
//     const fromDate = new Date(from);
//     const formatToDate = new Intl.DateTimeFormat("en-us", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//     });
//     const formatFromDate = new Intl.DateTimeFormat("en-us", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//     });

//     console.log(toDate, fromDate);
//     console.log(
//       "THE FORMATTED DATE IS:: " +
//         formatToDate.format(toDate) +
//         " " +
//         formatFromDate.format(fromDate)
//     );

//     const toFromDate = await TimingNewFemalesSchema.create({
//       to: formatToDate.format(toDate),
//       from: formatFromDate.format(fromDate),
//     });

//     return res
//       .status(201)
//       .json({ status: httpStatusText.SUCCESS, data: { toFromDate } });
//   }
// );
const getDateFemales = errorHandling.asyncHandler(async (req, res, next) => {
  const date = await TimingNewFemalesSchema.find();

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

  const updatedDate = await TimingNewFemalesSchema.findByIdAndUpdate(
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
  const deletedDate = await TimingNewFemalesSchema.findByIdAndDelete({
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
    const toFromDate = await TimingNewMalesSchema.create({
      to: formatToDate.format(toDate),
      from: formatFromDate.format(fromDate),
    });

    return res
      .status(201)
      .json({ status: httpStatusText.SUCCESS, data: { toFromDate } });
  }
);
const getDateMales = errorHandling.asyncHandler(async (req, res, next) => {
  const date = await TimingNewMalesSchema.find();

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

  const updatedDate = await TimingNewMalesSchema.findByIdAndUpdate(
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
  const deletedDate = await TimingNewMalesSchema.findByIdAndDelete({
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
  // addToAndFromDateFemalesTestNewThing,
};
