const USERNAME_KEY = 'username';
const TOKEN_KEY = 'token';

function setUsernameToLocaleStorage(username) {
  window.localStorage.setItem(USERNAME_KEY, username);
}

function setTokenToLocaleStorage(token) {
  window.localStorage.setItem(TOKEN_KEY, token);
}

function getUsernameFromLocaleSorage() {
  const username = window.localStorage.getItem(USERNAME_KEY);
  return username || '';
}

function getTokenFromLocaleStorage() {
  const token = window.localStorage.getItem(TOKEN_KEY);
  return token || '';
}

function deleteAllfromLocaleStorage() {
  window.localStorage.removeItem(USERNAME_KEY);
  window.localStorage.removeItem(TOKEN_KEY);
}

export {
  setUsernameToLocaleStorage,
  setTokenToLocaleStorage,
  getUsernameFromLocaleSorage,
  getTokenFromLocaleStorage,
  deleteAllfromLocaleStorage,
};
