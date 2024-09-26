import createHttpError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  addContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { sortFields } from '../db/models/Contact.js';
import parseContactFilterParams from '../utils/filters/parseContactFilterParams.js';
import saveFileToCloudinary from "../utils/saveFileToCloudinary.js"

let photo;

export const getAllContactsController = async (req, res) => {
  const { perPage, page } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams({ ...req.query, sortFields });
  const filter = parseContactFilterParams(req.query);
  const { _id: userId } = req.user;

  const data = await getAllContacts({
    perPage,
    page,
    sortBy,
    sortOrder,
    filter: { ...filter, userId },
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactByIdController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const data = await getContactById({ _id: id, userId });

  if (!data) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id=${id}!`,
    data,
  });
};

export const addContactController = async (req, res) => {

  if(req.file) {
    photo = await saveFileToCloudinary(req.file, "photo");
    }
  const { _id: userId } = req.user;
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;
  if (!name || !phoneNumber || !contactType) {
    throw createHttpError(
      400,
      'Name, phoneNumber, and contactType values are required',
    );
  }
  const data = await addContact({ ...req.body, userId });
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const patchContactController = async (req, res) => {
  if(req.file) {
    photo = await saveFileToCloudinary(req.file, "photo");
    }
  const { id } = req.params;
  const { _id: userId } = req.user;
  const result = await updateContact({ _id: id, userId }, req.body);

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
  const { _id: userId } = req.user;
  const data = await deleteContact({ _id: id, userId });

  if (!data) {
    throw createHttpError(404, `Contact not found`);
  }

  res.status(204).send();
};
