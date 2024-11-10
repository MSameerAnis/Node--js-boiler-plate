import mongoose from "mongoose";

export const contactsSchema = mongoose.Schema({
    user_id:{
type:mongoose.Schema.Types.ObjectId,
require:true,
ref:"User"

    },
        name:{
            type:String,
            require:[true,"Please Enter Name"]
        },
        email:{
            type:String,
        },

        phoneNumber:{

            type:String,
            require:[true,"Please enter phone number"]
        }
} , {
    timestamps:true
})

