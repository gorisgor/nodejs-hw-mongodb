import { Router } from "express";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import { getAllContactsController, getContactByIdController } from "../controllers/contacts.js";


const contactsRouter = Router();

contactsRouter.get("/", ctrlWrapper(getAllContactsController));

contactsRouter.get("/:id", ctrlWrapper(getContactByIdController));

export default contactsRouter;