const User = require("../../../../../DB/model/User.model.js");
const errorHandling = require("../../../../utils/errorHandling.js");
const httpStatusText = require("../../../../utils/httpStatusText.js");


const printedCardsReport = errorHandling.asyncHandler(async (req, res, next) => {
    const {ofYear}= req.query
    var query={
        role:"User",
    }
    if(ofYear)
    {
        query.ofYear=ofYear
    }
    for (const key in query) {
        if (query.hasOwnProperty(key)) {
            // If the value is 0, remove the key-value pair from the object
            if (query[key] == "false"|| query[key] ==="false"|| query[key] == false|| query[key] =="undefined") {
                delete query[key];
            }
        }
    }
    console.log('====================================');
    console.log(query);
    console.log('====================================');

    const student = await User.find(query);
    console.log('====================================');
    console.log(student.length);
    console.log('====================================');
    const usersWithprintedCardsReport = await User.find({ printedCard: true });
    if(!student||student.length==0)
    return next (new Error (`NO USERS`,{cause:400}))

return res
    .status(200)
    .json({ status: httpStatusText.SUCCESS, data: { usersWithprintedCardsReport } });
});

module.exports = printedCardsReport;
