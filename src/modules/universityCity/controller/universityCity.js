const UniversityCityModel = require('../../../../DB/model/rooms/UniversityCityModel.js')
const errorHandling = require ('../../../utils/errorHandling.js')
const httpStatusText = require('../../../utils/httpStatusText.js')
const buildingModel = require('../../../../DB/model/rooms/BuildingsModel.js')
const floorModel = require('../../../../DB/model/rooms/FloorModel.js')

//add addUniversityCity
const addUniversityCity = errorHandling.asyncHandler(async(req,res,next)=>{
    const{Name }= req.body
   //const userId = req.user._id
    const universityCity = await UniversityCityModel.create({
    //   createdBy:userId,
        Name
    })
    return res.status(201).json({status : httpStatusText.SUCCESS , data : {universityCity}})
}
)

//get all cities
const getAllCities = errorHandling.asyncHandler( async(req,res,next)=>{
    const city = await UniversityCityModel.find({},  {"__v":false ,"createdAt":false, "updatedAt": false,}).populate([
      {
        path : 'BUILDINGS',
        select: { __v: false, createdAt: false, updatedAt: false, sportsHall:false, InternetHall:false , AdministrativeRooms:false },

      }
    ])
    if(!city){
      return res.status(404).json({status : httpStatusText.FAIL , data : {msg : "no cities found! please try again later"}});
    }
    return res.status(200).json({status : httpStatusText.SUCCESS , data : {city}})
})

//get one city
const getCity = errorHandling.asyncHandler( async(req,res,next)=>{
  const city = await UniversityCityModel.findById(req.params.UniversityCityId ,  {"__v":false ,"createdAt":false, "updatedAt": false,}).populate([
    {
      path : 'BUILDINGS',
      select: { __v: false, createdAt: false, updatedAt: false,sportsHall:false, InternetHall:false , AdministrativeRooms:false },

    }
  ]);

  if(!city){    
     return res.status(404).json({status : httpStatusText.FAIL , message : 'No city found with that ID'});
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
          return res.status(400).json({status: httpStatusText.ERROR , message : 'No city found with that ID'})
        }
        return res.status(200).json({status : httpStatusText.SUCCESS , data : {city}})

    }
)

//delete city
const deleteCity = errorHandling.asyncHandler(async(req,res,next)=>{
           
     const {UniversityCityId} = req.params

     const city = await UniversityCityModel.findOne({_id:UniversityCityId})
     if (!city) {
      return res.status(400).json({status: httpStatusText.ERROR , message : 'No city found with that ID'})
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
        
    