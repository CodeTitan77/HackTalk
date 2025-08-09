const jwt =require("jsonwebtoken");
const User = require("../models/user");



const userAuth= async (req,res,next)=>{
    //read token from req cookies 
    //validate the token 
    // find the username 
    try{
    const {token}=req.cookies;
    if(!token){
        throw new Error("Token is not valid");
    }
    const decodedObj= await jwt.verify(token,"HactTalk$780");
    const {_id}= decodedObj;
    const user= await User.findById(_id);
    // console.log(user);
    if(!user){
        throw new Error("User Not Found");
    }
    req.user=user;
    
    next();
}
catch(err){
    res.status(400).send("Error"+err.message);
    //testing github
}


}
module.exports={
    userAuth,
};