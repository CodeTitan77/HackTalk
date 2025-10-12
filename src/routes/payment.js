// const express=require('express');
// const paymentRouter= express.Router();
// const { userAuth } = require("../middlewares/auth");
// const razorpayInstance= require("../utils/razorpay");
// paymentRouter.post("/payment/create",userAuth,(req,res)=>{
//     try{
//         razorpayInstance.orders.create({
//             "amount": 5000,
//   "currency": "INR",
//     "receipt": "receipt#1",
//   "notes": {
//       "firstName": "value3",
//       "lastName": "value2",
//       "membershipType":"silver",
//   },
//         }),
//          //Save it in database
//        console.log(order);
//         // return back order details to Frontend 

//         res.json({order});
    
//     }
       
    
//     catch(error){
//         return res.status(500).json({msg:error.message});

//     }

// })

// module.exports= paymentRouter;