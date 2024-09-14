export const parseValue = (value) => {
  if (typeof value === 'string') {
    const trimmedValue = value.trim().toLowerCase();
    if (trimmedValue === 'true') {
      return true;
    }
    if (trimmedValue === 'false') {
      return false;
    }
    return trimmedValue;
  }
  return undefined;
};
