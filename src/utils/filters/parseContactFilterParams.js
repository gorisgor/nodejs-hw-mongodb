import createHttpError from 'http-errors';
import { contactTypes } from '../../db/models/Contact.js';
import { parseValue } from './parseValue.js';

const parseContactFilterParams = (query) => {
  const contactType = parseValue(query.contactType);
  const isFavourite = parseValue(query.isFavourite);

  if (contactType && !contactTypes.includes(contactType)) {
    throw createHttpError(
      400,
      `Filter values for contactType are: ${contactTypes.join(', ')}`,
    );
  }

  if (isFavourite !== undefined && ![true, false].includes(isFavourite)) {
    throw createHttpError(400, 'Filter values are true or false');
  }

  return {
    contactType: contactType,
    isFavourite: isFavourite,
  };
};

export default parseContactFilterParams;
