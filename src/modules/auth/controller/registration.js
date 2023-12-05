const userModel = require('../../../../DB/model/User.model.js')
const hashAndCompare = require  ('../../../utils/HashAndCompare.js')
const GenerateAndVerifyToken = require ('../../../utils/GenerateAndVerifyToken.js')

 const signUp = async(req,res,next)=>{
  
    //check el email mawgood wla la2
    const isNationalIdExist = await userModel.findOne({email:req.body.NationalId})
    if (isNationalIdExist){
        return next (new Error ("this NationalId is already Exist"))
    }
    req.body.password = hashAndCompare.hash(req.body.password)
    const user = await userModel.create(req.body)
    return res.status(201).json ({message :"done",user})
}   



 const signIn = async(req,res,next)=>{
    //ast2bel el data
    const {NationalId,password} = req.body;
    //check el email mawgood wla la2
    const user = await userModel.findOne({NationalId})
    if (!user){
        return next (new Error ("in-valid user",{cause:404}))
    }
    //user.password de elly feha el hash password elly f el db
    //password da el password elly hwa b3tholk
    const match = hashAndCompare.compare(password,user.password)
    if (!match){
        return next (new Error ("miss matched data",{cause:400}))
    }
    const payload = {
        id :user._id,
        email:user.email
    }
    const token = GenerateAndVerifyToken.generateToken({payload})
    return res.status(200).json ({message :"done",token})
    //ana bhtag mn el sign in el token

}

module.exports = {signIn , signUp}

//authorization de y3ny salahyt el d5oll da elly hwa el role
