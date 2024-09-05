import { Router } from "express";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import { addContactController, getAllContactsController, getContactByIdController } from "../controllers/contacts.js";



const contactsRouter = Router();

contactsRouter.get("/", ctrlWrapper(getAllContactsController));

contactsRouter.get("/:id", ctrlWrapper(getContactByIdController));

contactsRouter.post('/', ctrlWrapper(addContactController));

export default contactsRouter;