import mongoose from "mongoose";

export const userScheme =  mongoose.Schema({
        name:{
            type:String,
            require:[true,"Please Enter User Name "]
        },
        email:{
            type:String,
            require:[true,"Please Enter User Name "],
            unique:[true,"Email Already Exist"]
        },
        password:{
            type:String,
            require:[true,"Please Enter User paaaword "],
            
        },
        isVerified:{
            type:Boolean
        }
       
},{
    timeStamps:true
})
