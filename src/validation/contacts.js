import Joi from "joi";
import { contactType } from "../constants/contacts";

export const contactAddSchema = Joi.object({
   name: Joi.string().required(),
   phoneNumber: Joi.string().required(),
   email: Joi.string(),
   isFavourite: Joi.boolean().required(),
   contactType: Joi.string().valid(...contactType).required() 
});

export const contactPatchSchema = Joi.object({
    name: Joi.string(),
    phoneNumber: Joi.string(),
    email: Joi.string(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid(...contactType)
});