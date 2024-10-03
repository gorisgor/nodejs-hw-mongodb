import { SORT_ORDER } from '../constants/index.js';
// import { sortFields } from '../db/models/Contact.js';

export const parseSortParams = ({ sortBy, sortOrder, sortFields }) => {
  const parsedSortBy = sortFields.includes(sortBy) ? sortBy : 'name';
  const parsedSortOrder = SORT_ORDER.includes(sortOrder)
    ? sortOrder
    : SORT_ORDER[0];

  return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy,
  };
};

export default parseSortParams;
