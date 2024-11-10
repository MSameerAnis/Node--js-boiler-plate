import express from "express"
import {getAllContacts , createContact , getContactById , deleteContact , updateContact} from "../controller/contactController.js";
import { validateToken } from "../middleware/validateTokenHandler.js";
const contactRouter = express.Router()

contactRouter.use(validateToken)
contactRouter.get("/",getAllContacts).post("/",createContact)

contactRouter.get("/:id",getContactById).delete("/:id",deleteContact).put("/:id",updateContact)




export default contactRouter;