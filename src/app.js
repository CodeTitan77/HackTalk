

const connectDb=require("./config/database")
const {validateSignUpData}= require("./utils/validation")
const bcrypt= require("bcrypt");
const validator=require("validator");

const express= require("express");
const app= express();
const User= require("./models/user");

app.use(express.json());

app.post("/signup",async (req,res)=>{
   
   
    
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
app.post("/login",async(req,res)=>{
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
        if(isPasswordValid){
            return res.send("Login Successful");
        }
        else{
            throw new Error("Invalid Credentials");

        }

    }
    catch(err){
         res.status(400).send("Something went wrong"+err.message);

    }

})
app.get("/user",async(req,res)=>{
    const userEmail=req.body.emailId;
  
    try{
    const obj= await User.find({emailId:userEmail})
    if(obj.length===0){
        res.status(404).send("User not found");
    }
    
    res.send(obj)
    }
    catch(err){
        res.status(400).send("User not found");

    }


})
app.get("/feed",async(req,res)=>{
    try{
    const obj= await User.find();
    res.send(obj);
    }
    catch(err){
        res.status(400).send("User not found");

    }
})
app.delete("/user",async(req,res)=>{
    const userId=req.body.userId;
    
    try{
        const user=await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");

    }
    catch(err){
         res.status(400).send("Something went wrong");
    }

})
app.patch("/user/:userId",async(req,res)=>{
    
     

    
    
    try{
         const userId=req.params?.userId;
     const data= req.body;
     console.log(data);
     console.log(userId);
        const ALLOWED_UPDATES=[
        "photoUrl","about","gender","age","skills"
     ]
     const isUpdateAllowed= Object.keys(data).every((k)=>{
        return(
            ALLOWED_UPDATES.includes(k)
        )
     });
     if(data?.skills.length>10){
        throw new Error("Skills shoud be less than 10 ")
     }
      
     if(!isUpdateAllowed){
       throw new Error("Update not allowed");
     }
     console.log(isUpdateAllowed);
     
        const user=await User.findByIdAndUpdate(userId,data,{
            returnDocument:"after",
            runValidators:true
        });
        res.send("User updated successfully");

    }
    catch(err){
         res.status(400).send("Something went wrong"+err.message);
    }

})

 

connectDb().then(()=>{
    console.log("Database connection established")
    app.listen(7777,()=>{ 
    console.log("Server is successfullly listening at 7777")
});

}).catch((err)=>{
    console.log("Database cannot be connected")
})
