import countryOptions from '../data/countries.json';

export const validateUser = (user) => {
  const invalidFields = [];
  const emptyFields = [];

  if (user.name.trim()) {
    if (!/^[a-zA-Z\s]+$/.test(user.name)) invalidFields.push('name');
  } else {
    emptyFields.push('name');
  }

  if (user.country.trim()) {
    if (!countryOptions.includes(user.country)) invalidFields.push('country');
  } else {
    emptyFields.push('country');
  }

  if (user.email.trim()) {
    if ((user.email.match(/@/g) || []).length !== 1) invalidFields.push('email');
  } else {
    emptyFields.push('email');
  }

  if (user.phone.trim()) {
    if (!/^\+[^+]*$/.test(user.phone)) invalidFields.push('phone');
  } else {
    emptyFields.push('phone');
  }

  return { invalidFields, emptyFields };
};
