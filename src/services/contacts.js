import ContactCollection from '../db/models/Contact.js';
import calculatePaginationData from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  perPage,
  page,
  sortBy = 'name',
  sortOrder = SORT_ORDER[0],
  filter = {},
}) => {
  const skip = (page - 1) * perPage;

  const contactQuery = ContactCollection.find();

  if (filter.contactType) {
    contactQuery.where('contactType').equals(filter.contactType);
  }
  if (filter.isFavourite !== undefined) {
    contactQuery.where('isFavourite').equals(filter.isFavourite);
  }
  if (filter.userId) {
    contactQuery.where('userId').equals(filter.userId);
  }

  const contacts = await contactQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

  const count = await ContactCollection.countDocuments(
    contactQuery.getFilter(),
  );

  const paginationData = calculatePaginationData({ count, perPage, page });

  return {
    contacts,
    page,
    perPage,
    totalItems: count,
    ...paginationData,
  };
};

export const getContactById = ({ _id, userId }) =>
  ContactCollection.findOne({ _id, userId });

export const addContact = (payload) => ContactCollection.create(payload);

export const updateContact = async (filter, data, options = {}) => {
  const rawResult = await ContactCollection.findOneAndUpdate(filter, data, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  if (!rawResult || !rawResult.value) return null;

  return {
    data: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upsert),
  };
};

export const deleteContact = (filter) =>
  ContactCollection.findOneAndDelete(filter);
