function setUserToLocalStorage(user, password) {
  window.localStorage.setItem('userEmail', JSON.stringify(user.email));
  window.localStorage.setItem('userUsername', JSON.stringify(user.username));
  window.localStorage.setItem('userToken', JSON.stringify(user.token));
  window.localStorage.setItem('userPassword', JSON.stringify(password));
}

export default setUserToLocalStorage;
