const errorHandling = require ('../../../utils/errorHandling.js')
const httpStatusText = require('../../../utils/httpStatusText.js')
const UniversityCity = require('../../../../DB/model/rooms/UniversityCityModel.js')
const buildingModel = require('../../../../DB/model/rooms/BuildingsModel.js')
const floorModel = require('../../../../DB/model/rooms/FloorModel.js')
const fs = require('fs').promises;


const dotenv = require('dotenv');

dotenv.config();
const collegesString = process.env.COLLEGES;
const colleges = collegesString.split(',');


//هيكل المدن
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

 //حالة الغرف
 const RoomsStatus = errorHandling.asyncHandler(async (req, res, next) => {
  
    const buildings = await buildingModel.find({}, { "__v": false, "createdAt": false, "updatedAt": false });

    // Extracting id, name, and room types from the result
    const buildingInfo = buildings.map(async building => {
      const rooms = await floorModel.find({ BuildingId: building._id }).populate('ROOMS');
      
      const roomTypeCounts = {}; // Object to store counts for each room type

      rooms.forEach(floor => {
        floor.ROOMS.forEach(room => {
          if (room.roomType) {
            if (!roomTypeCounts[room.roomType]) {
              roomTypeCounts[room.roomType] = {
                EmptyRooms: 0,
                FilledRooms: 0,
              };
            }

            if (room.occupants && room.occupants.length === 0) {
              roomTypeCounts[room.roomType].EmptyRooms++;
            } else if (room.occupants && room.occupants.length > 0) {
              roomTypeCounts[room.roomType].FilledRooms++;
            }
          }
        });
      });

      // Calculate totalRooms for each room type
      Object.keys(roomTypeCounts).forEach(roomType => {
        roomTypeCounts[roomType].totalRooms =
          roomTypeCounts[roomType].EmptyRooms + roomTypeCounts[roomType].FilledRooms;
      });

      return {
        id: building.id,
        Name: building.Name,
        RoomTypeCounts: roomTypeCounts,
      };
    });

    const city = await UniversityCity.find({}, { "__v": false, "createdAt": false, "updatedAt": false }).populate([
      {
        path: 'BUILDINGS',
        select: { __v: false, createdAt: false, updatedAt: false },
      }
    ]);

    const floors = await floorModel.find({}, { "__v": false, "createdAt": false, "updatedAt": false }).populate([{
      path: "BuildingId", // virtual populate 
      path: "ROOMS",
      select: { __v: false, createdAt: false, updatedAt: false },
    }]);

    return res.status(200).json({
      buildingInfo: await Promise.all(buildingInfo), // Resolve the async mapping
    });
  
});

//هيكل الجامعه
const universityStructure = errorHandling.asyncHandler(async (req, res, next) => {

    const { college } = req.query;

    const jsonData = await fs.readFile('colleges.json', 'utf-8');
    const collegesData = JSON.parse(jsonData);

    // Filter data based on the chosen college
    const filteredColleges = collegesData.filter(col => !college || col.college === college);

    if (filteredColleges.length === 0) {
      return res.status(404).json({ status: httpStatusText.ERROR, message: 'College not found' });
    }

    // Assuming the data structure inside colleges.json is the same as provided
    const departmentsAndPrograms = getDepartmentsAndPrograms(filteredColleges[0].departments);

    return res.status(200).json({ status: httpStatusText.SUCCESS, data: departmentsAndPrograms });
  
});

// The getDepartmentsAndPrograms function remains the same as before
function getDepartmentsAndPrograms(departments) {
  const result = [];

  departments.forEach((department) => {
    const departmentInfo = {
      departmentName: department.name,
      departmentType: department.type,
      programs: [],
    };

    department.programs.forEach((program) => {
      const programInfo = {
        programName: program.name,
        levels: program.levels,
      };

      departmentInfo.programs.push(programInfo);
    });

    result.push(departmentInfo);
  });

  return result;
}





module.exports = { getCityStructure , RoomsStatus , universityStructure}