const mongoose=require('mongoose');
// require('dotenv').config()

const connectDb= async ()=>{
   // console.log(process.env.DB_CONNECTION);
   
   await mongoose.connect(process.env.DB_CONNECTION); 

};
module.exports=connectDb;

