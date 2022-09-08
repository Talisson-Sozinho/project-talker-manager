const dayValidate = (day) => day > 0 && day < 31;
const monthValidate = (month) => month > 0 && month <= 12;
const yearValidate = (year) => year > 1800 && year <= 2100;

module.exports = (dateString) => {
  const dateArray = dateString.split('/');

  if (dateArray.length !== 3) return false;

  return dayValidate(+dateArray[0]) && monthValidate(+dateArray[1]) && yearValidate(+dateArray[2]);
};
