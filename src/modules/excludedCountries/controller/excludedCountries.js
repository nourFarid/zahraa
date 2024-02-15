const errorHandling = require('../../../utils/errorHandling.js');
const httpStatusText = require('../../../utils/httpStatusText.js');
const ExcludedCountries= require("../../../../DB/model/excludedCountries/excludedCountries")

const addExcludedCountries = errorHandling.asyncHandler(async (req, res, next) => {

const {country,distance,StatusOfDependentAreas}= req.body
const excludedCountries = await ExcludedCountries.create({country,distance,StatusOfDependentAreas})

return res
.status(201)
.json({ status: httpStatusText.SUCCESS, data: { excludedCountries } });
})

const getExcludedCountries= errorHandling.asyncHandler(async(req,res,next)=>{

const excludedCountries= await ExcludedCountries.find()
if(!excludedCountries){
    return next (new Error (`countries don't exsit`,{cause:400}))
}


return res
.status(201)
.json({ status: httpStatusText.SUCCESS, data: { excludedCountries } });

})


const updateExcludedCountries= errorHandling.asyncHandler(async(req,res,next)=>{
const id = req.params.id
const{country,distance,StatusOfDependentAreas}= req.body
const contry= await ExcludedCountries.findByIdAndUpdate(id,{
    $set:{country,distance,StatusOfDependentAreas},},
    {new:true

})

return res
.status(201)
.json({ status: httpStatusText.SUCCESS, data: { contry } });

})

const deleteExcludedCountries= errorHandling.asyncHandler(async(req,res,next)=>{
const id = req.params.id
const excludedCountries= await ExcludedCountries.findByIdAndDelete({_id:id})
if(!excludedCountries){
    return next (new Error (`country doesn't exsit`,{cause:400}))
}


return res
.status(201)
.json({ status: httpStatusText.SUCCESS, data: { excludedCountries } });

})


module.exports ={

    addExcludedCountries
,getExcludedCountries,updateExcludedCountries,
deleteExcludedCountries
}