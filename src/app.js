
const connectDb=require("./config/database")

const express= require("express");
const app= express();
const User= require("./models/user");

app.use(express.json());

app.post("/signup",async (req,res)=>{ 
   const userObj= req.body;
   
    
   try{
    const user= new User(userObj); 
    await user.save();
    res.send("User added successfully") 
    } 
    catch(err){
        res.status(400).send("Error saving the user",err.message);
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
app.patch("/user",async(req,res)=>{
     const userId=req.body._id;
     const data= req.body;
    
    
    try{
        const user=await User.findByIdAndUpdate(userId,data);
        res.send("User updated successfully");

    }
    catch(err){
         res.status(400).send("Something went wrong");
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
