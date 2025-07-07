const express = require("express");
const requestRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");
requestRouter.post('/sendConnectionRequest',userAuth,async(req,res)=>{
    const user= req.user;
    console.log("Sendng a connection request");
    res.send(user.firstName+"send the connect request!");

})


module.exports=requestRouter;