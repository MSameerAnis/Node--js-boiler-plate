import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import { userScheme } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import  jwt  from "jsonwebtoken";

/**
 * @type {import("mongoose").Model}
 */

const User = mongoose.model("User",userScheme)


//@desc register user
//@router /api/users/register
//@access public
export const registerUser = expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    // Check if user already exists
    const alreadyExist = await User.findOne({ email });
    if (alreadyExist) {
        res.status(400);
        throw new Error("User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        isVerified:false
    });

    res.status(201).json({ message: "User Registered Successfully", user });
});

export const loginUser = expressAsyncHandler(async(req,res)=>{
   const {email , password} =req.body

   if(!email || !password) {
    res.status(400)
    throw new Error ("All Fields ARE MANDETORY")
   }

   const user = await User.findOne({email})
   if(user && await bcrypt.compare(password,user.password)){
    const accessToken = jwt.sign({
        user:{
            name:user.name,
            email:user.email,
            id:user.id,
            isVerified:user.isVerified
        }
    } , process.env.ACCESS_TOKEN_SECRET , {expiresIn:"55m"})

    res.status(200).json({message:"Logged in Successfully " , data:{user ,token:accessToken}})
   } else{
    res.status(401)
    throw new Error ("email or password is not valid ")
   }
})


export const getUserProfile = expressAsyncHandler(async(req, res)=>{
    res.json(req.user)})