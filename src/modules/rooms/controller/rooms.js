const FloorModel = require('../../../../DB/model/rooms/FloorModel.js')
const roomsModel = require('../../../../DB/model/rooms/RoomsModel.js')
const errorHandling = require ('../../../utils/errorHandling.js')
const httpStatusText = require('../../../utils/httpStatusText.js')

//add floor
const addRoom = errorHandling.asyncHandler(async(req,res,next)=>{
    const{roomNumber , FloorId  , roomType , Type , numOfBeds , Capacity}= req.body
    
    if(! await FloorModel.findOne({_id:FloorId})){
      return next (new Error (`In-valid floor ID`,{cause:400}))
    }
    const userId = req.user._id
    const room = await roomsModel.create({
        roomNumber , FloorId  , roomType , Type , numOfBeds , Capacity,createdBy:userId
     })
    return res.status(201).json({status : httpStatusText.SUCCESS , data : {room}})
}
)

//get all rooms
const getAllRooms = errorHandling.asyncHandler( async(req,res,next)=>{
    const room = await roomsModel.find({}, {"__v":false}).populate([{
      path:"FloorId"
    }])
    if(!room){
      return next (new Error (`no rooms found! please try again later`,{cause:404}))

    //  return res.status(404).json({status : httpStatusText.FAIL , data : {msg : "no rooms found! please try again later"}});
    }
    return res.status(200).json({status : httpStatusText.SUCCESS , data : {room}})
})

//get one room
const getRoom = errorHandling.asyncHandler( async(req,res,next)=>{
  const room = await roomsModel.findById(req.params.roomId ,  {"__v":false}).populate([{
    path:"FloorId"
  }]);

  if(!room){
    return next (new Error (`no room found with that ID` , {cause : 404}))

     //return res.status(404).json({status : httpStatusText.FAIL , data : {room : "no room found with that ID"}});
}
  return res.status(200).json({status : httpStatusText.SUCCESS , data : {room}})
})

//update room
const updateRoom = errorHandling.asyncHandler(async(req,res,next)=>
    {
        const {roomId} = req.params
        const {roomNumber , FloorId  , roomType , Type , numOfBeds , Capacity}=req.body
        const room = await roomsModel.findByIdAndUpdate({_id:roomId},{roomNumber , FloorId  , roomType , Type , numOfBeds , Capacity})
        if(!room){
          return next (new Error (`no room found with that ID` , {cause : 400}))
          //res.status(400).json({status: httpStatusText.ERROR , message : 'No room found with that ID'})
        }
        return res.status(200).json({status : httpStatusText.SUCCESS , data : {room}})

    }
)

//delete room
const deleteRoom = errorHandling.asyncHandler(async(req,res,next)=>{
           
     const {roomId} = req.params

     const room = await roomsModel.findOne({_id:roomId})
     if (!room) {
      return next (new Error (`no room found with that ID`,{cause:400}))
      //return res.status(400).json({status: httpStatusText.ERROR , message : 'room not found'})
       }
      
    await roomsModel.deleteOne({_id: roomId})
    return res.status(200).json({status:httpStatusText.SUCCESS , message:'room Deleted Successfully'})
})

 module.exports = {addRoom , getAllRooms , getRoom , updateRoom , deleteRoom}

        