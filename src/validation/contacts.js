import Joi from "joi";
import { contactType, phoneNumberRegExp } from "../constants/contacts.js";

export const contactAddSchema = Joi.object({
   name: Joi.string().min(3).max(20).required(),
   phoneNumber: Joi.string().length(13).pattern(phoneNumberRegExp).required(),
   email: Joi.string().email(),
   isFavourite: Joi.boolean().required(),
   contactType: Joi.string().valid(...contactType).required() 
});

export const contactPatchSchema = Joi.object({
    name: Joi.string().min(3).max(20),
    phoneNumber: Joi.string().length(13).pattern(phoneNumberRegExp),
    email: Joi.string().email(),
    isFavourite: Joi.boolean(),
    contactType: Joi.string().valid(...contactType)
});