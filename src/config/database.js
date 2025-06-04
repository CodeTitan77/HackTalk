const mongoose=require('mongoose');

const connectDb= async ()=>{
   await mongoose.connect("mongodb+srv://himanshutrivedi521:YUoihvgJWWpphMGh@namastenode.g8oayll.mongodb.net/HackTalk"); 

};
module.exports=connectDb;

