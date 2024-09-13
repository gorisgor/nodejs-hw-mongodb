const parseInteger = (value, defaultValue) => {
  if (typeof value !== 'string') return defaultValue;
  const parsedValue = parseInt(value);
  if (Number.isNaN(parsedValue)) return defaultValue;
  return parsedValue;
};

export const parsePaginationParams = ({ perPage, page }) => {
  const parsedPerPage = parseInteger(perPage, 2);
  const parsedPage = parseInteger(page, 1);

  return {
    perPage: parsedPerPage,
    page: parsedPage,
  };
};

export default parsePaginationParams;
