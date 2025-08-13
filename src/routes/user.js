const express=require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const userRouter=express.Router();
const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";
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
        //should always return at max 10 users
        //already connections and //already send connections// ignored ones
        const loggedInUser=req.user;
        const page=parseInt(req.query.page)|| 1;
        let limit=parseInt(req.query.limit)||10;
        limit= limit>50?50:limit;
        const skip= (page-1)*limit;
        const connectionRequests= await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id},
                {toUserId:loggedInUser._id}
            ]
        }).select("fromUserId toUserId");
        
        const hideUsersFromFeed=new Set();
        connectionRequests.forEach(req=>{
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
            
        })
        const users= await User.find({
           _id: {$nin: Array.from(hideUsersFromFeed)}
        }).select(USER_SAFE_DATA).skip(skip).limit(limit)
        // console.log(hideUsersFromFeed);
        res.json({data:users});


    }
    catch(err){
        res.json({"message":err.message});

    }

})
module.exports=userRouter;