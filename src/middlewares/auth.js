const jwt =require("jsonwebtoken");
const User = require("../models/user");
const {userAuth} =require("./middlewares/auth");


const userAuth= async (req,res,next)=>{
    //read token from req cookies 
    //validate the token 
    // find the username 
    try{
    const {token}=req.cookies;
    const decodedObj= await jwt.verify(token,"HactTalk$780");
    const {_id}= decodedObj;
    const user= User.findById(_id);
    if(!user){
        throw new Error("User Not Found");
    }
    next();
}
catch(err){
    res.status(400).send("Error"+err.message);
}


}
module.exports={
    userAuth,
};