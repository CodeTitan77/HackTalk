
const connectDb=require("./config/database")

const express= require("express");
const app= express();
const User= require("./models/user");

app.post("/signup",async (req,res)=>{ 
    const userObj={
        firstName:"Himanshu",
        lastName:"Saini",
        emailId:"Himanshu@gmail.com",
        password:"hit"
    }
    
    const user= new User(userObj); 
    await user.save();
    res.send("User added successfully") 


}

)

connectDb().then(()=>{
    console.log("Database connection established")
    app.listen(7777,()=>{ 
    console.log("Server is successfullly listening at 7777")
});

}).catch((err)=>{
    console.log("Database cannot be connected")
})
