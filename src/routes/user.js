const express=require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const userRouter=express.Router();
//get pending connection request 
userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
    try{
         const loggedInUser=req.user;
         const connectionRequest=await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            status:"interested"
         }).populate("fromUserId",["firstName","lastName","photoUrl","age","gender","about","skills"])
         res.json({message:"Data fetched successfully",data:connectionRequest});

    }
    catch(error){
        res.statusCode(400).send("Error"+error.message)
    }
   

})
userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try{
        const loggedInUser=req.user;
        const connectionRequests= await ConnectionRequest.find({
            $or:[
                {toUserId:loggedInUser._id,status:"accepted"},
                {fromUserId:loggedInUser._id,status:"accepted"},

            ]
        }).populate("fromUserId",["firstName","lastName","photoUrl","age","gender","about","skills"])
        .populate("toUserId","fromUserId",["firstName","lastName","photoUrl","age","gender","about","skills"]);
        const data=connectionRequests.map((row)=>{
            if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        })
        return res.json({data:connectionRequests});

    }
    catch(error){

    }
})
userRouter.get("/feed",userAuth,async(req,res)=>{
    try{
        //already connections and //already send connections// ignored ones
        const connectionRequests= await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id},
                {toUserId:loggedInUser._id}
            ]
        }).select("fromUserId","toUserId");
        const hideUsersFromFeed=new Set();
        connectionRequests.forEach(req=>{
            hideUsersFromFeed
        })
        res.send(connectionRequests);


    }
    catch(err){

    }

})
module.exports=userRouter;