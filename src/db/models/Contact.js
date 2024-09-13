import {Schema, model} from "mongoose";

const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        default: null,
    },
    isFavourite: {
        type: Boolean,
        default: false,
        required: true,
    },
    contactType: {
        type: String,
        enum: ['work','personal', 'home'],
        required: true,
    },
}, {versionKey: false, timestamps: true});

const ContactCollection = model("contact", contactSchema);
export const sortFields = ["name", "phoneNumber", "email", "isFavourite", "contactType", "createdAt", "updatedAt"];
export default ContactCollection;