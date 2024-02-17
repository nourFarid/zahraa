const TypeOfSpecialHousing= require("../../../../DB/model/typeOfSpecialHousing/typeOfSpecialHousing.js")
const httpStatusText = require("../../../utils/httpStatusText.js");
const errorHandling = require ('../../../utils/errorHandling.js')
const DetailsAboutTypeOfSpecialHousing= require("../../../../DB/model/typeOfSpecialHousing/detailsAboutTypeOfSpecialHousing.js")


const addTypeOfSpecialHousing = errorHandling.asyncHandler(async (req, res, next) => {
  const {typeOfHousing} = req.body

    const housing = await TypeOfSpecialHousing.create({
    
      typeOfHousing:typeOfHousing
    
    });
    return res
      .status(201)
      .json({ status: httpStatusText.SUCCESS, data: { housing } });
  });

const getTypeOfSpecialHousing = errorHandling.asyncHandler(async (req, res, next) => {
   
    const housing = await TypeOfSpecialHousing.find();
    return res
      .status(201)
      .json({ status: httpStatusText.SUCCESS, data: { housing } });
  });
const getTypeOfSpecialHousingById = errorHandling.asyncHandler(async (req, res, next) => {
  const id = req.params.id;
   
    const housing = await TypeOfSpecialHousing.findById(id);
    return res
      .status(201)
      .json({ status: httpStatusText.SUCCESS, data: { housing } });
  });




  const deleteTypeOfSpecialHousing = errorHandling.asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const housing = await TypeOfSpecialHousing.findByIdAndDelete(id);
    const details=await DetailsAboutTypeOfSpecialHousing.findOneAndDelete(id)
    if(!housing){
      return next (new Error (`housing doesn't exsit`,{cause:400}))
    }
      return res
        .status(201)
        .json({ status: httpStatusText.SUCCESS, data: { housing ,details} });
    });
  
  

  module.exports={
    addTypeOfSpecialHousing,deleteTypeOfSpecialHousing,getTypeOfSpecialHousing,getTypeOfSpecialHousingById
  }