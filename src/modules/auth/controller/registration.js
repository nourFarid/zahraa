const userModel = require('../../../../DB/model/User.model.js')
const AdminModel = require('../../../../DB/model/admin.js')
const hashAndCompare = require  ('../../../utils/HashAndCompare.js')
const GenerateAndVerifyToken = require ('../../../utils/GenerateAndVerifyToken.js')
const errorHandling = require("../../../utils/errorHandling.js");
const Logs= require("../../../../DB/model/logs.js")


 const signUp = errorHandling.asyncHandler(async(req,res,next)=>{
  
    //check el email mawgood wla la2
    const isNationalIdExist = await userModel.findOne({email:req.body.nationalID})
    if (isNationalIdExist){
        return next (new Error ("this NationalId is already Exist"))
    }
    req.body.password = hashAndCompare.hash(req.body.password)
    const user = await userModel.create(req.body)
    return res.status(201).json ({message :"done",user})
}   
 )

 const signUpAdmin = errorHandling.asyncHandler(async(req,res,next)=>{
  
    //check el email mawgood wla la
    const isNationalIdExist = await AdminModel.findOne({email:req.body.nationalID})
    if (isNationalIdExist){
        return next (new Error ("user is already exist"))
    }
    req.body.password = hashAndCompare.hash(req.body.password)
    const admin = await AdminModel.create(req.body)
    return res.status(201).json ({message :"done",admin})
}   
 )


 const signIn = errorHandling.asyncHandler(async(req,res,next)=>{
    //ast2bel el data
    const {nationalID,password} = req.body;
    //check el email mawgood wla la2
    const user = await AdminModel.find({nationalID:nationalID})
    console.log('====================================');
    console.log(user[0].password);

    console.log('====================================');
    if (!user){
        return next (new Error ("in-valid user",{cause:404}))
    }
    //user.password de elly feha el hash password elly f el db
    //password da el password elly hwa b3tholk
    const match = hashAndCompare.compare(password,user[0].password)
    if (!match){
        return next (new Error ("miss matched data",{cause:400}))
    }
    const payload = {
        id :user[0]._id,
        nationalID:user[0].nationalID,
        name:user[0].name,
        userName:user[0].userName,
    }
    //log the login 
  const log= await Logs.create({
    action:`${user[0].userName} logged into the system`,
     adminID:user[0]._id
    
    })
  
    const token = GenerateAndVerifyToken.generateToken({payload})
    return res.status(200).json ({message :"done",data:{token,log}})
    //ana bhtag mn el sign in el token
});


module.exports = {signIn , signUp,signUpAdmin}

//authorization de y3ny salahyt el d5oll da elly hwa el role
