

const connectDb=require("./config/database")
const {validateSignUpData}= require("./utils/validation")
const bcrypt= require("bcrypt");
const validator=require("validator");
const cookieParser= require("cookie-parser");//test backend
const cors=require("cors");
require("dotenv").config();

const jwt= require("jsonwebtoken");
const {userAuth} =require("./middlewares/auth")

const express= require("express");
const app= express();
const User= require("./models/user");
app.use(cors({
      origin:"http://localhost:5173",
        credentials:true,
    }));
app.use(express.json());
app.use(cookieParser());
const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile");
const requestRouter=require("./routes/request");
const userRouter=require("./routes/user");
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/",userRouter);






 

connectDb().then(()=>{
    console.log("Database connection established")
    app.listen(7777,()=>{ 
    console.log("Server is successfullly listening at 7777")
});

}).catch((err)=>{
    console.log("Database cannot be connected")
})
