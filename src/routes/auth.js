const express=require('express');
const router= express.Router();
router.get('/signup',async (req,res)=>{
   
   
    
   try{
     validateSignUpData(req);
     const {firstName,lastName,emailId,password}= req.body;
     const passwordHash=await bcrypt.hash(password,10);  
     console.log(passwordHash) ;
   const userObj= req.body;
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
module.exports=router;