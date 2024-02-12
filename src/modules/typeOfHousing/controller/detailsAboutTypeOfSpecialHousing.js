const DetailsAboutTypeOfSpecialHousing= require("../../../../DB/model/typeOfSpecialHousing/detailsAboutTypeOfSpecialHousing.js")
const httpStatusText = require("../../../utils/httpStatusText.js");
const errorHandling = require ('../../../utils/errorHandling.js')
const TypeOfSpecialHousing= require("../../../../DB/model/typeOfSpecialHousing/typeOfSpecialHousing.js")


const addDetailsAboutTypeOfSpecialHousing = errorHandling.asyncHandler(async (req, res, next) => {
  const {name,cityType,capacity} = req.body
  id=req.params.id
  console.log('====================================');
  console.log(id);
  console.log('====================================');
    const housing = await TypeOfSpecialHousing.findOne({_id:id});
    if(!housing){
      return next (new Error (`housing doesn't exsit`,{cause:400}))

    }
  
    const detailsAboutTypeOfSpecialHousing = await DetailsAboutTypeOfSpecialHousing.create({
    id:id,
        name:name,
        cityType:cityType,
        capacity:capacity,
    
    });
    return res
      .status(201)
      .json({ status: httpStatusText.SUCCESS, data: { detailsAboutTypeOfSpecialHousing } });
  });



const getDetailsAboutTypeOfSpecialHousing= errorHandling.asyncHandler(async(req,res,next)=>{

const id= req.params.id;

const detailsAboutTypeOfSpecialHousing = await DetailsAboutTypeOfSpecialHousing.find({id:id});
if(!detailsAboutTypeOfSpecialHousing)

{
  return next (new Error (`CAN'T GET THE DETAILS `,{cause:400}))

}
return res
.status(201)
.json({ status: httpStatusText.SUCCESS, data: { detailsAboutTypeOfSpecialHousing } });


})

  const deleteDetailsAboutTypeOfSpecialHousing = errorHandling.asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const housing = await DetailsAboutTypeOfSpecialHousing.findByIdAndDelete(id);
    if(!housing){
      return next (new Error (`housing doesn't exsit`,{cause:400}))
    }
      return res
        .status(201)
        .json({ status: httpStatusText.SUCCESS, data: { housing } });
    });
  
  module.exports={
addDetailsAboutTypeOfSpecialHousing ,deleteDetailsAboutTypeOfSpecialHousing,getDetailsAboutTypeOfSpecialHousing }