import express from "express"
import { getUserProfile, loginUser, registerUser } from "../controller/userConroller.js"
import { validateToken } from "../middleware/validateTokenHandler.js"

const userRoutes = express.Router()

userRoutes.get("/profile", validateToken,getUserProfile)
userRoutes.post("/register", registerUser)
userRoutes.post("/login",loginUser)



export default userRoutes