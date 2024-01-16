import { Router } from "express";
import { createContact, deleteContact, getAllContacts, updatecontact } from "../controllers/contactController";

const contactRouter = Router();

contactRouter.route('/')
    .get(getAllContacts)
    .post(createContact)
    .patch(updatecontact)
    .delete(deleteContact);

export default contactRouter;
