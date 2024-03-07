const User = require("../../../../DB/model/User.model.js");
const errorHandling = require("../../../utils/errorHandling.js");
const httpStatusText = require("../../../utils/httpStatusText.js");


//للذكر
const unprintedCardsForMales = errorHandling.asyncHandler(async (req, res, next) => {
    const {ofYear}= req.query
    var query={
        role:"User",
        gender:"ذكر",
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
    const MalesWithUnprintedCards = await User.find({ printedCard: false });
    if(!student||student.length==0)
    return next (new Error (`NO USERS`,{cause:400}))

return res
    .status(200)
    .json({ status: httpStatusText.SUCCESS, data: { MalesWithUnprintedCards } });
});
// للانثي
const unprintedCardsForFemales = errorHandling.asyncHandler(async (req, res, next) => {
    const {ofYear}= req.query
    var query={
        role:"User",
        gender: { $in: ["انثي", "أنثي", "انثى", "أنثى"] } ,
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
    const FemalesWithUnprintedCards = await User.find({ printedCard: false });
    if(!student||student.length==0)
    return next (new Error (`NO USERS`,{cause:400}))

return res
    .status(200)
    .json({ status: httpStatusText.SUCCESS, data: { FemalesWithUnprintedCards } });
});


const updateCards = errorHandling.asyncHandler(async (req, res, next) => {

    const id = req.params.id;
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];


    // Find the user by _id and update printedCard attribute to true
    const user = await User.findByIdAndUpdate(
        { _id: id },
        {  $set: {printedCard: true ,dateOfPrinting:formattedDate}},
        { new: true });

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    return res
        .status(200)
        .json({ status: httpStatusText.SUCCESS, data: { user } });
    });


module.exports = { unprintedCardsForMales,unprintedCardsForFemales,updateCards };





















