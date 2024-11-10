

import expressAsyncHandler from "express-async-handler"
import { contactsSchema } from "../models/contactModel.js";
import mongoose from "mongoose";



//@get all contact 
//@router /api/get-all-contact
// @public 
const Contacts = mongoose.model("Contacts",contactsSchema)

export const getAllContacts = expressAsyncHandler(async (req, res) => {
  
      const contacts = await Contacts.find({user_id:req.user.id}); // Use await to get results
  
      const update = contacts?.reverse()
  
      console.log("contacts", contacts); // Log the contacts
      res.status(200).json({message:"Contact Retrive SuccessFully" , update}); // Send the contacts in the response
   
  });

//@ create  contact 
//@router /api/get-all-contact
// @public 
export const createContact = expressAsyncHandler(  async (req, res) =>{
    console.log(req.body)
    const {name , email, phoneNumber}=  req.body
    if(!name || !email || !phoneNumber){
        res.status(400)
        throw new Error ("All fields are mandetory")
    }
    const contact = await  Contacts.create({
        name,
        email,
        phoneNumber,
        user_id:req.user.id

    })
   
    res.status(200).json({message: `Contact Created SuccessFully` , contact:contact})
})


//@get contact by id 
//@router /api/-contact/:id
// @public

export const getContactById = expressAsyncHandler(async (req, res) => {
    // Validate the ObjectId format first
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
     res.status(400);
     throw new Error ("In valid id ")

    }
  
    // Fetch the contact by ID
    const singleContact = await Contacts.findById(req.params.id);
  
    if (!singleContact) {
      return res.status(404).json({ message: "Contact Not Found" });
    }
    if(singleContact.user_id.toString() !== req.user.id){
      res.status(404)
      throw new Error("Contat Not Found")
    }
  
    res.status(200).json({ message: "Contact Retrieved Successfully", singleContact });
  });

export const deleteContact = expressAsyncHandler( (req, res)=>{
    res.status(200).json({message:"Contact Deleted"})
})




export const updateContact = expressAsyncHandler(async  (req , res) =>{
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400);
        throw new Error ("In valid id ")
   
       }
     
       // Fetch the contact by ID
       const singleContact = await Contacts.findById(req.params.id);
     
       if (!singleContact) {
         return res.status(404).json({ message: "Contact Not Found" });
       }

       const updatedContact = await Contacts.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
       )

       res.status(200).json({message:"Contact Updated SuccessFully" , updatedContact})
})