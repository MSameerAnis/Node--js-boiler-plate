import mongoose from "mongoose";


export const dbConnect = async()=>{
    try {
        const connect = await mongoose.connect(process.env.DB_URL)
        console.log("Db conneted ", connect.connection.host)
    } catch (error) {
        console.log(error)
        process.exit(1)
        
    }
}