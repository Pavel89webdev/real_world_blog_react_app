const validationEmail = (email, setErrorMessage) => {
  if (email.includes('@', 0)) {
    setErrorMessage('');
    return true;
  }
  setErrorMessage('email should contain "@"');
  return false;
};

const validationPassword = (password, setErrorMessage, isRequired) => {
  if (
    (password.length > 7 && password.length < 41) ||
    (!isRequired && password.length === 0)
  ) {
    setErrorMessage('');
    return true;
  }
  setErrorMessage('password must be from 8 to 40 letters');
  return false;
};

const validationUsername = (username, setErrorMessage) => {
  if (username.length > 2 && username.length < 21) {
    setErrorMessage('');
    return true;
  }
  setErrorMessage('username should be from 3 to 20 letters');
  return false;
};

const validationImageUrl = (imageUrl, setErrorMessage) => {
  if (imageUrl.length > 5) {
    setErrorMessage('');
    return true;
  }
  setErrorMessage('it is too short URL');
  return false;
};

const confirmPassword = (firstPassword, secondPassword, setErrorMessage) => {
  if (firstPassword === secondPassword) {
    setErrorMessage('');
    return true;
  }
  setErrorMessage('passwords are not match');
  return false;
};

const validationTitle = (title, setErrorMessage) => {
  if (title.length < 4) {
    setErrorMessage('title must be longer than 3 letters');
    return false;
  }
  setErrorMessage('');
  return true;
};

const validationDescription = (description, setErrorMessage) => {
  if (description.length < 4) {
    setErrorMessage('description must be longer that 3 letters');
    return false;
  }
  setErrorMessage('');
  return true;
};

const validationBody = (body, setErrorMessage) => {
  if (body.length < 4) {
    setErrorMessage('article must be longer that 3 letters');
    return false;
  }
  setErrorMessage('');
  return true;
};

export {
  validationEmail,
  validationPassword,
  validationUsername,
  validationImageUrl,
  confirmPassword,
  validationTitle,
  validationDescription,
  validationBody,
};
