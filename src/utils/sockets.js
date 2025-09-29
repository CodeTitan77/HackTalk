const initializeSocket=(server)=>{
    const socket= require("socket.io");

const io= socket(server,{
    cors:{
        origin:"http://localhost:5173",

    },

});
io.on("connection",(socket)=>{
//Handle Events
socket.on("joinChat",()=>{

});
socket.on("sendMessage",()=>{

});
socket.on("disconnect",()=>{

});
});

}
module.exports=initializeSocket;