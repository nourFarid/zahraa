const errorHandling = require ('../../../utils/errorHandling.js')
const httpStatusText = require('../../../utils/httpStatusText.js')
const UniversityCity = require('../../../../DB/model/rooms/UniversityCityModel.js')
const buildingModel = require('../../../../DB/model/rooms/BuildingsModel.js')
const floorModel = require('../../../../DB/model/rooms/FloorModel.js')

const getCityStructure = errorHandling.asyncHandler( async(req,res,next)=>{
  const building = await buildingModel.find({},{"__v":false ,"createdAt":false, "updatedAt": false,})

    // Extracting id, name, and gender from the result
    const buildingInfo = building.map(building => {
      return {
        id: building.id,
        Name: building.Name,
        Gender: building.Gender,
      };
    });

  const city = await UniversityCity.find({} ,  {"__v":false ,"createdAt":false, "updatedAt": false,}).populate([
    {
      path : 'BUILDINGS',
      select: { __v: false, createdAt: false, updatedAt: false },
    }
  ]);


  const floors = await floorModel.find({}, {"__v":false, "createdAt":false, "updatedAt": false }).populate([{
    path:"BuildingId", // virtual populate 
    path:"ROOMS",
    select: { __v: false, createdAt: false, updatedAt: false},

  }])

  const BuildingWithTotalRoomsCount = floors.map(floor => {
    const totalRoomsCount = floor.ROOMS ? floor.ROOMS.length : 0;

    // Count total number of occupants in each room
    const totalOccupantsCount = floor.ROOMS.reduce((acc, room) => {
      return acc + (room.occupants ? room.occupants.length : 0);
    }, 0);

    // Find the corresponding building info
    const buildingDetails = buildingInfo.find(building => String(building.id) === String(floor.BuildingId));

    if (buildingDetails && buildingDetails.Gender === "انثي") {
      city.Gender = "طالبات";
    }
    if (buildingDetails && buildingDetails.Gender === "ذكر") {
      city.Gender = "طلاب";
    }

    return {
      BuildingId: floor.BuildingId,
      BuildingName: buildingDetails ? buildingDetails.Name : "N/A",
      BuildingGender: buildingDetails ? buildingDetails.Gender : "N/A",
      cityGender:city.Gender,
      totalRoomsCount: totalRoomsCount,
      totalOccupantsCount: totalOccupantsCount,
    };
  });

   return res.status(200).json({status : httpStatusText.SUCCESS , data : {city , BuildingWithTotalRoomsCount }})

 })

module.exports = { getCityStructure}