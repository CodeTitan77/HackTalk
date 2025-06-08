const mongoose= require("mongoose");
const validator= require("validator");
const userSchema=  new mongoose.Schema({
    firstName: {
        type:String,
        required:true,
        maxLength:50,
    },
    lastName:{
         type:String,
         
    },
    emailId:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address")
            }
        }
    },
    password:{
        type:String,
        required:true,
         validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Not a strong PassWord")

            }
        }
    },
    age:{
        type:Number,
        min:18,
       
    } ,
     gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender not valid")
            }
        }
    }, 
    photoUrl:{
        type:String,
        default:"https://geographyandyou.com/images/user-profile.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid photoUrl")

            }
        }

    },
    about:{
        type:String,
        default:"This is a default about of the user!",
    },
    skills:{
        type:[String],
    },
});
const User= mongoose.model("User",userSchema );
module.exports=User;