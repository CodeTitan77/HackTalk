 const express=require("express");
 const app= express();
 app.use((req,res)=>{  
    res.send("Hello from server")
 })
 app.use("/test",(req,res)=>{
   res.send("request call from server")

 })
  app.listen(7777,()=>{
   console.log("server started")
  })   
  

