const floorModel = require('../../../../DB/model/rooms/FloorModel.js')
const errorHandling = require ('../../../utils/errorHandling.js')
const httpStatusText = require('../../../utils/httpStatusText.js')
const BuildingModel = require('../../../../DB/model/rooms/BuildingsModel.js')
//add floor
const addFloor = errorHandling.asyncHandler(async(req,res,next)=>{
    const{Name , BuildingId}= req.body
    if(! await BuildingModel.findOne({_id:BuildingId})){
      return next (new Error (`In-valid building ID`,{cause:400}))
    }
    const userId = req.user._id
    const floor = await floorModel.create({
        Name,
        BuildingId,
        createdBy:userId,
     })
    return res.status(201).json({status : httpStatusText.SUCCESS , data : {floor}})
}
)

 //get all floors
const getAllFloor = errorHandling.asyncHandler( async(req,res,next)=>{
    const floor = await floorModel.find({}, {"__v":false}).populate([{
      path:"BuildingId", // virtual populate 
      path:"ROOMS"
    }])

    if(!floor){
      return next (new Error (`no floors found! please try again later`,{cause:404}))
      //return res.status(404).json({status : httpStatusText.FAIL , data : {msg : "no floors found! please try again later"}});
    }
    return res.status(200).json({status : httpStatusText.SUCCESS , data : {floor}})
})


const getFloor = errorHandling.asyncHandler( async(req,res,next)=>{
  const floor = await floorModel.findById(req.params.floorId ,  {"__v":false}).populate([{
    path:"BuildingId",
    path:"ROOMS"
  }]);

  if(!floor){
    return next (new Error (`no rooms found with that ID`,{cause:404}))
    //return res.status(404).json({status : httpStatusText.FAIL , data : {msg : "no floor found with that ID"}});
  }
  return res.status(200).json({status : httpStatusText.SUCCESS , data : {floor}})
})

//update floor
const updateFloor = errorHandling.asyncHandler(async(req,res,next)=>
    {
        const {floorId} = req.params
        const {Name}=req.body
        
        const floor = await floorModel.findByIdAndUpdate({_id:floorId},{Name})
        if(!floor){
          return next (new Error (`no floor found with that ID`,{cause:400}))
          //res.status(400).json({status: httpStatusText.ERROR , message : 'No floor found with that ID'})
        }
        return res.status(200).json({status : httpStatusText.SUCCESS , data : {floor}})
    } 
    
)

//delete building
const deleteFloor = errorHandling.asyncHandler(async(req,res,next)=>{
           
     const {floorId} = req.params
     const floor = await floorModel.findOne({_id:floorId})
     if (!floor) {
      return next (new Error (`no floor found with that ID`,{cause:400}))

      //return res.status(400).json({status: httpStatusText.ERROR , message : 'No floor found with that ID'})
       }
      
    await floorModel.deleteOne({_id: floorId})
    return res.status(200).json({status:httpStatusText.SUCCESS , message:'floor Deleted Successfully'})
})

 module.exports = {addFloor , getAllFloor , updateFloor , getFloor , deleteFloor}

        
    
        
    