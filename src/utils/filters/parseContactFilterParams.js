import { contactTypes } from '../../db/models/Contact.js';

const parseString = (value) => {
  if (typeof value !== 'string') return '';

  const parsedString = value.trim().toLowerCase();
  return parsedString;
};

const parseContactFilterParams = (query) => {
  const contactType = parseString(query.contactType);
  const parsedContactType = contactTypes.includes(contactType)
    ? contactType
    : 'work';

  return { contactType: parsedContactType };
};

export default parseContactFilterParams;
