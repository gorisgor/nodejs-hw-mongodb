import createHttpError from 'http-errors';
import { getAllContacts, getContactById } from '../services/contacts.js';

export const getAllContactsController = async (req, res)=> {
    const data = await getAllContacts();

     res.json({
         status: 200,
         message: "Successfully found contacts!",
         data,
     });
 };

 export const getContactByIdController = async(req, res)=> {
    const {id} = req.params;
    const data = await getContactById(id);

    if(!data) {
        throw createHttpError(404, `Movie with id=${id} not found`);
    }

    res.json({
        status: 200,
        message: `Successfully found contact with id=${id}!`,
        data,
    });
};