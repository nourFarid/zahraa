const UniversityCityModel = require('../../../../DB/model/rooms/UniversityCityModel.js')
const errorHandling = require ('../../../utils/errorHandling.js')
const httpStatusText = require('../../../utils/httpStatusText.js')

//add addUniversityCity
const addUniversityCity = errorHandling.asyncHandler(async(req,res,next)=>{
    const{Name }= req.body
   const userId = req.user._id
    const universityCity = await UniversityCityModel.create({
       createdBy:userId,
        Name
    })
    return res.status(201).json({status : httpStatusText.SUCCESS , data : {universityCity}})
}
)

//get all cities
const getAllCities = errorHandling.asyncHandler( async(req,res,next)=>{
    const city = await UniversityCityModel.find({}, {"__v ":false}).populate([
      {
        path : 'BUILDINGS'
      }
    ])
    if(!city){
      return next (new Error (`no cities found! please try again later`,{cause:404}))
      //return res.status(404).json({status : httpStatusText.FAIL , data : {msg : "no cities found! please try again later"}});
    }
    return res.status(200).json({status : httpStatusText.SUCCESS , data : {city}})
})

//get one city
const getCity = errorHandling.asyncHandler( async(req,res,next)=>{
  const city = await UniversityCityModel.findById(req.params.UniversityCityId ,  {"__v":false}).populate([
    {
      path : 'BUILDINGS'
    }
  ]);

  if(!city){    
    return next (new Error (`no city found with that ID`,{cause:404}))
     //return res.status(404).json({status : httpStatusText.FAIL , message : 'No city found with that ID'});
}
  return res.status(200).json({status : httpStatusText.SUCCESS , data : {city}})
})

//update city
const updateUniversityCity = errorHandling.asyncHandler(async(req,res,next)=>
    {
        const {UniversityCityId} = req.params
        const {Name,numberOfBuildings}=req.body
        const city = await UniversityCityModel.findByIdAndUpdate({_id:UniversityCityId},{Name,numberOfBuildings})
        if(!city){
          return next (new Error (`no city found with that ID`,{cause:400}))

          //res.status(400).json({status: httpStatusText.ERROR , message : 'No city found with that ID'})
        }
        return res.status(200).json({status : httpStatusText.SUCCESS , data : {city}})

    }
)

//delete city
const deleteCity = errorHandling.asyncHandler(async(req,res,next)=>{
           
     const {UniversityCityId} = req.params

     const city = await UniversityCityModel.findOne({_id:UniversityCityId})
     if (!city) {
      return next (new Error (`no city found with that ID`,{cause:400}))
      //return res.status(400).json({status: httpStatusText.ERROR , message : 'No city found with that ID'})
       }
      
    await UniversityCityModel.deleteOne({_id: UniversityCityId})
    return res.status(200).json({status:httpStatusText.SUCCESS , message:'City Deleted Successfully'})
})

 module.exports = {addUniversityCity,
                  updateUniversityCity,
                  getAllCities,
                  getCity,
                  deleteCity,
                }
        
    