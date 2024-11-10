import expressAsyncHandler from "express-async-handler";
import jwt, { decode } from "jsonwebtoken"

export const validateToken =expressAsyncHandler(async(req,res , next)=>{
    let token 
    let authHeader = req.headers.authorization || req.headers.Authorization
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1]
        jwt.verify(token , process.env.ACCESS_TOKEN_SECRET , (err,decoded)=>{
            if(err){
                res.status(401)
                throw new Error("In valid Access Token ")
            }
            req.user = decoded.user
            console.log("req.user" , req.user)
            next()
            if(!token){
                res.status(401)
                throw new Error("In Valid Access Token ")
            }
        })
    }

})