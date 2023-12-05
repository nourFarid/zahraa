const BuildingsModel = require('../../../../DB/model/rooms/BuildingsModel.js')
const UniversityCityModel = require('../../../../DB/model/rooms/UniversityCityModel.js')
const errorHandling = require ('../../../utils/errorHandling.js')
const httpStatusText = require('../../../utils/httpStatusText.js')

//add Building
const addBuilding = errorHandling.asyncHandler(async(req,res,next)=>{
    const{Name , Gender,UniversityCityId}= req.body
    if(! await UniversityCityModel.findById({_id:UniversityCityId})){
      return next (new Error (`In-valid city ID`,{cause:400}))

    }
    const userId = req.user._id
    const building = await BuildingsModel.create({
        Name,
        Gender,
        UniversityCityId,createdBy:userId,
     })
    return res.status(201).json({status : httpStatusText.SUCCESS , data : {building}})
}
)

 //get All buildings
const getAllBuilding = errorHandling.asyncHandler( async(req,res,next)=>{
    const Building = await BuildingsModel.find({}, {"__v":false}).populate([
      {
        path:"UniversityCityId",
        path:"FLOORS"
      }
    ])
    if(!Building){
        return next (new Error (`no buildings found! please try again later`,{cause:404}))
        //  return res.status(404).json({status : httpStatusText.FAIL , data : {msg : "no buildings found! please try again later"}});

      }
    
    return res.status(200).json({status : httpStatusText.SUCCESS , data : {Building}})
})

// get one building
const getBuilding = errorHandling.asyncHandler( async(req,res,next)=>{
    const building = await BuildingsModel.findById(req.params.BuildingID ,  {"__v":false}).populate([
      {
        path:"UniversityCityId",
        path:"FLOORS"
      }
    ]);

    if(!building){
      return next (new Error (`no building found with that ID` , {cause : 404}))

      //return res.status(404).json({status : httpStatusText.FAIL , data : {msg : "no building found with that ID"}});
    }
  return res.status(200).json({status : httpStatusText.SUCCESS , data : {building}})
})

//update building
const updateBuilding = errorHandling.asyncHandler(async(req,res,next)=>
    {
        const {BuildingID} = req.params
        const {Name , Gender}=req.body
        const building = await BuildingsModel.findByIdAndUpdate({_id:BuildingID},{Name,Gender})
        if(!building){
          return next (new Error (`no building found with that ID` , {cause : 400}))
            //res.status(400).json({status: httpStatusText.ERROR , message : 'No building found with that ID'})

        }
        return res.status(200).json({status : httpStatusText.SUCCESS , data : {building}})

    }
)

//delete building
const deleteBuilding = errorHandling.asyncHandler(async(req,res,next)=>{
           
  const {BuildingID} = req.params

  const building = await BuildingsModel.findOne({_id:BuildingID})
  if (!building) {
   return next (new Error (`no building found with that ID`,{cause:400}))
   //return res.status(400).json({status: httpStatusText.ERROR , message : 'No city found with that ID'})
    }
   
   await BuildingsModel.deleteOne({_id: BuildingID})
  return res.status(200).json({status:httpStatusText.SUCCESS , message:'building Deleted Successfully'})
})

 module.exports = {addBuilding , getAllBuilding , updateBuilding , deleteBuilding , getBuilding}

    