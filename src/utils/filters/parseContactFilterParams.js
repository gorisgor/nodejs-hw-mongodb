import { contactTypes } from '../../db/models/Contact.js';

const parseString = (value) => {
  if (typeof value !== 'string') return '';

  const parsedString = value.trim().toLowerCase();
  return parsedString;
};

const parseContactFilterParams = (query) => {
  const contactType = parseString(query.contactType);

  if (contactType && !contactTypes.includes(contactType)) {
    throw new Error(`Filter values are: ${contactTypes.join(', ')}`);
  }

  return contactType ? { contactType } : {};
};

export default parseContactFilterParams;
