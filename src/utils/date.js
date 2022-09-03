export const dateTimeToDateString = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return `${year}-${month < 10 ? `0${month}` : month}-01`;
};
