

const connectDb=require("./config/database")
const {validateSignUpData}= require("./utils/validation")
const bcrypt= require("bcrypt");
const validator=require("validator");
const cookieParser= require("cookie-parser");
const jwt= require("jsonwebtoken");
const {userAuth} =require("./middlewares/auth")

const express= require("express");
const app= express();
const User= require("./models/user");

app.use(express.json());
app.use(cookieParser());
const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile");
const requestRouter=require("./routes/request");
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);






 

connectDb().then(()=>{
    console.log("Database connection established")
    app.listen(7777,()=>{ 
    console.log("Server is successfullly listening at 7777")
});

}).catch((err)=>{
    console.log("Database cannot be connected")
})
