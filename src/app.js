

const connectDb=require("./config/database")
const http=require("http");
const {validateSignUpData}= require("./utils/validation")
const bcrypt= require("bcrypt");
const validator=require("validator");
const cookieParser= require("cookie-parser");//test backend
const cors=require("cors");
require("dotenv").config();
const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile");
const requestRouter=require("./routes/request");
const userRouter=require("./routes/user");
const initializeSocket = require("./utils/sockets");

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

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/",userRouter);
const server= http.createServer(app);

initializeSocket(server);
connectDb().then(()=>{
    console.log("Database connection established")
    server.listen(7777,()=>{ 
    console.log("Server is successfullly listening at 7777")
});

}).catch((err)=>{
    console.log("Database cannot be connected")
})
