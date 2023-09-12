const User = require("../model/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports ={
  userRegister : async(req,res)=>{
    console.log("Register page");
      try {
        
        console.log(req.body);
        const {name , email , password , number} = req.body;
        const userExist = await User.findOne({email})

        if(userExist){
          return res.json({err: true , message: "This User already exist"}) 
        }
          let hashedPassword = await bcrypt.hash(password ,10)
          const newUser = await User.create({
            name,email, password:hashedPassword , number
          })
        
        const token = jwt.sign({
          id: newUser._id
        }, "JXq0sSXpeAEE")
        console.log("token ", token);
        return res.cookie ("token" , token , {
          httpOnly : true , 
          secure : true,
          maxAge : 1000 * 60 * 24 * 7 ,
          samesite:"none",

        }).json({err:false , message : "User Registration successfull"})


      } catch (error) {
        console.log(error);
        res.json({err:true , message : "Error  occured"})

      }
  },
 userLogin: async(req,res)=>{
  try {
    console.log("login ",req.body);
    const { email , password} = req.body
    const user = await User.findOne({email})

    console.log(user);
    if(!user){
      return res.json({err:true, message: "No user found please signup"})
    }

    const validUser = await bcrypt.compare(password , user.password)
   
    if(!validUser){
      return res.json({ err:true , massage : "wrong password"})

    } 
    const token = jwt.sign({
      id: user._id
      
    },"JXq0sSXpeAEE" )
    console.log(token);

    return res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: "none",
  }).json({ err: false ,message:'User login success'});

  } catch (error) {
    console.log(error); 
    res.json({err:true,error})
  }
 },

 userLogout: async(req,res)=>{

  return res.cookie("token", '', {
    httpOnly: true,
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    sameSite: "none",
}).json({ err: false ,message:'Logged out successfully'});

 },
 checkAuth:async(req,res)=>{
  console.log("check auth page");
  try {
    const token = req.cookies.token;
    if(token){
      const verifyJwt = jwt.verify(token , "JXq0sSXpeAEE")
      const user=await User.findById(verifyJwt.id,{password:0})
      res.json({logged:true,details:user})
    } else {
      res.json({logged:false , err: true , message : 'no token'})
    }
  } catch (error) {
    console.log(error);
    res.json({err:true , message :"server error"})
  }
 
 }
  
}