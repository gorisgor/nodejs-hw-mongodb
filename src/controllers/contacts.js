import createHttpError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';

export const getAllContactsController = async (req, res) => {
  const data = await getAllContacts();

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactByIdController = async (req, res) => {
  const { id } = req.params;
  const data = await getContactById(id);

  if (!data) {
    throw createHttpError(404, `Movie with id=${id} not found`);
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id=${id}!`,
    data,
  });
};

export const addContactController = async (req, res) => {
  const data = await addContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

// export const upsertContactController = async (req, res) => {
//   const { id } = req.params;
//   const { isNew, data } = await updateContact({ _id: id }, req.body, {
//     upsert: true,
//   });
//   const status = isNew ? 201 : 200;
//   res.status(status).json({
//     status,
//     message: 'Successfully upserted a contact!',
//     data,
//   });
// };

export const patchContactController = async (req, res) => {
  const { id } = req.params;
  const result = await updateContact({ _id: id }, req.body);

  if (!result) {
    throw createHttpError(404, `Contact not found`);
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.data,
  });
};

export const deleteContactController = async (req, res) => {
  const { id } = req.params;
  const data = await deleteContact({ _id: id });

  if (!data) {
    throw createHttpError(404, `Contact not found`);
  }

  res.status(204).send();
};
