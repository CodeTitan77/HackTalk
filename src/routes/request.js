const express = require("express");
const requestRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const ConnectionRequest=require("../models/connectionRequest")
requestRouter.post('/request/send/:status/:toUserId',userAuth,async(req,res)=>{
    try{
        const fromUserId=req.user._id;
        const toUserId= req.params.toUserId;
        const status= req.params.status;
        const allowedStatus=["rejected","accepted"];
        if(allowedStatus.includes(status)){
            return res.status(400).json({message:"Invalid status type:"+status})
        }
        const toUser= await User.findById(fromUserId);
        if(!toUser){
            return res.status(404).json({message:"User not found"})
        }
        
        //check if connection request is already there 
        const existingConnectionRequest= await ConnectionRequest.findOne({
            $or:[
            {fromUserId:fromUserId,
            toUserId:toUserId},
           {fromUserId:toUserId,
            toUserId:fromUserId}

            ],
           
        });
        if(existingConnectionRequest){
               return res.status(400).json({message:"Connection already exist:"});

        }
        const connectionRequest=new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });
        const data= await connectionRequest.save();
        res.json({
            message:"Connection request Sent Successfully",
            data,
        });


    }
    catch(error){
        res.status(400).json({message:"Error in connecting request"});

    }
   

})
requestRouter.post('/request/review/:status/:requestId',userAuth,async(req,res)=>{
    try{
        //check the logged in User
        //if status is interested then only accepted  but the requestStatus is accepted 
        //if ignored no change needed 
        const loggedInUser=req.user;
        const {status,requestId}=req.params;
       
        const allowedStatus=["rejected","accepted"];
        if(allowedStatus.includes(status)){
            return res.status(400).json({message:"Invalid status type:"+status})
        }
       const connectionRequest=await ConnectionRequest.findOne({
         _id:requestId,
         toUserId:loggedInUser._id,
         status:"interested",
       })
       
        
        //check if connection request is already there 
       
        if(!connectionRequest){
               return res.status(404).json({message:"Connection request not found"});

        }
        connectionRequest.status= status;
       
        const data= await connectionRequest.save();
        res.json({
            message:"Connection request Accepted/Rejected Successfully",
            data,
        });


    }
    catch(error){
        res.status(400).json({message:"Error in connecting request"});

    }
   

})



module.exports=requestRouter;