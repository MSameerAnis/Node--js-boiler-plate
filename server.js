
import express from "express";
import dotenv from "dotenv";
import contactRouter from "./routes/contactsRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { dbConnect } from "./config/dbConnection.js";
import userRoutes from "./routes/usersRoutes.js";
dotenv.config();

const app = express();
const port = process.env.PORT;
dbConnect()
app.use(express.json())
app.use("/api/contacts",contactRouter)
app.use("/api/users",userRoutes)

app.listen(port, () => {
    console.log(`${port} kesa hai bhai from app es6 hai bhai`);
});

app.use(errorHandler)