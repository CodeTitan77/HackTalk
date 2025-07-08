const express=require('express');
const authRouter= express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.get('/signup',async (req,res)=>{
   try{
     validateSignUpData(req);
     const {firstName,lastName,emailId,password}= req.body;
     const passwordHash=await bcrypt.hash(password,10);  
     console.log(passwordHash);
 
    const user= new User({
        firstName,
        lastName,
        emailId, 
        password:passwordHash
    }); 
    await user.save();
    res.send("User added successfully") 
    } 
    catch(err){
        res.status(400).send("Error saving the user"+err.message);
    }


});
authRouter.post("/login",async(req,res)=>{
    try{ 
        const {password,emailId}=req.body;
        if(!validator.isEmail(emailId)){
            throw new Error("Enter valid a email")
        }
        const user= await User.findOne({emailId:emailId})
       
        if(!user){
            throw new Error("Invalid Credentials")
        }
        const isPasswordValid= bcrypt.compare(password,user.password);
       //if password is valid i will send the token 
       if(isPasswordValid){
        const token = await user.getJWT();
        res.cookie("token",token);
        res.send("Login Successful");
       }

        else{
            throw new Error("Invalid Credentials");
        }
       


    }
    catch(err){
         res.status(400).send("Something went wrong"+err.message);

    }

})
authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now()),
    })
    res.send();
});
module.exports=authRouter;