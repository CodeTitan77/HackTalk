 const socket= require("socket.io");
 const crypto=require("crypto");
const { Chat } = require("../models/chat");
const ConnectionRequest = require("../models/connectionRequest");


const getSecretRoomId=({userId,targetUserId})=>{
    return crypto.createHash("sha256").
    update([userId,targetUserId].sort().
    join("_")).digest("hex");
}
const initializeSocket=(server)=>{
   

const io= socket(server,{
    cors:{
        origin:"http://localhost:5173",

    }, 

});
io.on("connection",(socket)=>{
//Handle Events
socket.on("joinChat",({firstName,userId,targetUserId})=>{  
      const roomId=getSecretRoomId(userId,targetUserId) ; 
    //   console.log(firstName+"joined Room");
    //   console.log(roomId); 
      socket.join(roomId); 
      

});
socket.on("sendMessage",async({
     firstName,
     lastName,
        userId,
        targetUserId,
        text,
}
)=>{  
      
    //  console.log(firstName +"Message. Recieved",text);

     //save message here
     try{
        const roomId=getSecretRoomId(userId,targetUserId) ; 
        // ConnectionRequest.findOne({fromUserId:userId,toUserId:targetUserId,status:"accepted"})
        // check if user Id and targetUserId are friends.
      let chat =await  Chat.findOne({
        participants:{$all:[userId,targetUserId]},

      });
    if(!chat){
        chat= new Chat({
            participants: [userId,targetUserId],
            messages:[],

        });
       
    }
     chat.messages.push({
            senderId:userId,
            text,
        });
        await chat.save();
     }
     catch(err){
        console.log(err);

     }
      
    io.to(roomId).emit("messageRecieved",{
        firstName,
        lastName,
        text,

    });

});
socket.on("disconnect",()=>{

});
});

}
module.exports=initializeSocket;